from typing import Text
import dash
import dash_core_components as dcc
import dash_html_components as html
import plotly.express as px
import pandas as pd
import numpy as np
from scipy.fft import fft, fftfreq
from scipy import signal
from dash.dependencies import Output, Input
from scipy.signal import hilbert
fs = 2048
N_REPS = 100
ENVELOPE_TYPE = 'moving_average' # 'moving_average','hilbert'
external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

app.layout = html.Div([
    html.H1(children='Spectrum based on spike frequency'),
    html.H3(children='Spike train of 1 second'),
    html.Div(id='spike_slider_text'),
    dcc.Slider(
        id='slider',
        min=1,
        max=200,
        step=1,
        value=100,
        marks={ str(i):{'label':str(i)} for i in np.linspace(1,200,10).astype(int)},
    ),
    dcc.Graph(
    id='spike_train',
    #style={'width': '100vh', 'height': '100vh'}
    ),
    html.H3(children='Consecutive spike trains'),
    html.Div(id='rep_sep_slider_text',style ={'justify': 'center'}),
    dcc.Slider(
        id='slider-rep-sep',
        min=1,
        max=fs, #<fs
        step=10,
        value=256,
        marks={ str(i):{'label':str(i)} for i in np.linspace(1,fs,10).astype(int)},
    ),
    dcc.Graph(
    id='spike_train2',
    #style={'width': '100vh', 'height': '100vh'}
    ),
    html.H3(children='Envelope to produce the EPSP'),
    html.H4(children='What really happens depends on this. If low/high spike freq is given what should the envelope be?'),
    html.Div(children='If no envelope when there is a low spike frequency then there is just DC or no projected EPSP???'),
    html.Div(id='MoAv_slider_text'),
    dcc.Slider(
        id='slider-l',
        min=2,
        max=int(fs/2), #<fs
        #step=1,
        value=256,
        marks={ str(i):{'label':str(i)} for i in np.linspace(2,int(fs/2),10).astype(int)},
    ),
    dcc.Graph(
        id="epsp",
        #style={'width': '100vh', 'height': '100vh'}
    ),
    html.H3(children='Fourier Transform of the repeated EPSP'),
    dcc.Graph(
        id="epsp_fft",
        #style={'width': '100vh', 'height': '100vh'}
    ),

])



def charge(t,A=1,tau=1e-3):
    return A*(1-np.exp(-1*t/tau))

def discharge(t,A=1,tau=10e-3):
    return A*np.exp(-1*t/tau)

def fire(t,A=1,tau=[1e-5,1e-4]):
    charging = charge(t,A,tau[0])
    charged_idx = np.where(np.isclose(charging,A))[0][0]
    discharging = discharge(t[charged_idx+1:],A,tau[1])
    #discharged_idx = np.where(np.isclose(discharging,0))[0][0] + charged_idx
    return np.hstack([charging[:charged_idx+1],discharging])

def spike_train(t,N):
  chunks = np.array_split(t, N)
  spikes = [fire(x-chunks[i][0]) for i,x in enumerate(chunks)]
  return np.hstack(spikes)

def get_moving_average_filter(L):
    coefs=np.ones(L)/float(L)
    num=np.zeros(L)
    num[0]=1.0/L
    num[-1]=-1.0/L
    den=np.zeros(L)
    den[0]=1
    den[1]=-1
    #print('coefs',coefs)
    #print('num',num)
    #print('den',den)
    return coefs,num,den

def get_fire_duration(firing):
    try:
        charged_idx = np.where(np.isclose(firing,np.max(firing)))[0][0]
        discharged_idx = np.where(np.isclose(firing[charged_idx:],np.min(firing[charged_idx:])))[0][0]
        return charged_idx+discharged_idx
    except:
        return len(firing)-1


def divide_chunks(l, n): 
      
    # looping till length l 
    for i in range(0, len(l), n):  
        yield l[i:i + n]

def spike_train2(t,N=1,sep=10):
    single_shot = fire(t)
    end_idx = get_fire_duration(single_shot)
    chunk_size = end_idx+sep
    chunks = list(divide_chunks(t, chunk_size))
    spikes = [fire(x-chunks[i][0]) if i < N else np.zeros_like(chunks[i]) for i,x in enumerate(chunks)]
    spikes = np.hstack(spikes)
    if spikes.size != t.size:
        spikes = np.hstack([spikes,np.zeros(len(t)-len(spikes))])
    return spikes

def find_support(x):
    left = np.where(np.logical_not(np.isclose(x,0)))[0][0]
    right = np.where(np.logical_not(np.isclose(x,0)))[0][-1]
    return x[left:right]
@app.callback(
    [Output('spike_slider_text', 'children'),
    Output('MoAv_slider_text', 'children'),
    Output('rep_sep_slider_text', 'children'),
    Output('spike_train', 'figure'),
    Output('epsp', 'figure'),
    Output('epsp_fft', 'figure'),
    Output('spike_train2', 'figure')],
    [Input('slider', 'value'),
    Input('slider-l','value'),
    Input('slider-rep-sep','value')
    ])
def update_output(num_spikes,l,rep_sep):
    
    start = 0

    x = np.arange(start,1,1/fs)
    y = spike_train(x,num_spikes)
    fig1 = px.line(None, x=x, y=y)

    single_shot_len = y.shape[0]+np.zeros(rep_sep).shape[0]
    stop = N_REPS*single_shot_len*1/fs
    x = np.arange(start,stop,1/fs)
    y = [y,np.zeros(rep_sep)]*N_REPS
    y = np.hstack(y)
    if len(x) <= len(y):
        y = y[:len(x)]
    else:
        y = np.hstack([y,np.zeros(len(x)-len(y))])
    figN = px.line(None,x=x,y=y,range_x=(0,single_shot_len/fs))

    coefs,num,den = get_moving_average_filter(l)
    
    if ENVELOPE_TYPE == 'moving_average':
        epsp = np.convolve(y, coefs, mode='same')
        epsp = np.convolve(epsp, coefs, mode='same')
    else: #'hilbert'
        epsp = np.imag(hilbert(y))
    epsp = epsp/np.max(np.abs(epsp))
    support = epsp-np.mean(epsp)#find_support(epsp)
    x2 = np.arange(0,len(support)*1/fs,1/fs)
    fig2 = px.line(None, x=x2, y=support,range_x=(0,single_shot_len/fs))
    

    #print(len(find_support(epsp)))
    yf = np.abs(np.fft.fftshift(fft(support)))*2/len(support)
    xf = np.fft.fftshift(fftfreq(len(support), 1 / fs))
    #xf, yf = signal.welch(support, fs,nperseg=2048)
    zero_idx = np.where(xf==0)[0][0]

    last_idx = np.where((np.abs(xf-50))==np.min(np.abs(xf-50)))[0][0]#-1#np.where((f-50)==np.min(f-50))[0][0]
    #fig3 = px.line(None,labels={"x":"freq","y":"power"},x=xf[:last_idx],y=yf[:last_idx])
    fig3 = px.line(None,labels={"x":"freq","y":"power"},x=xf[zero_idx:last_idx],y=yf[zero_idx:last_idx])
    return '# of spikes in 1 second: {}'.format(num_spikes),'# of points of moving average : {}'.format(l),'# of points of separation between repetitions of the spike train: {}'.format(rep_sep),fig1,fig2,fig3,figN

if __name__ == '__main__':
    app.run_server(debug=True)