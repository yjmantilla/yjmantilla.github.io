import plotly.graph_objects as go
import numpy as np
from plotly.subplots import make_subplots
import plotly.io as pio

def boxcar(t,T=1):
    def foo(t):
        if -1*T/2 <= t and t <= T/2:
            return 1
        else:
            return 0
    return np.vectorize(foo)(t)

def sinc(w,T):
    return T*np.sinc(w*T/(2*np.pi))

# Create figure
fig = make_subplots(rows=2, cols=1)#go.Figure()
#fig2 = go.Figure()
x = np.arange(-10, 10, 0.5)
Ts = np.arange(0, 10, 0.5)
w = np.arange(-10, 10, 0.5)

# Add traces, one for each slider step
for step in Ts:
    y = boxcar(x,step)
    Y = sinc(w,step)
    fig.add_trace(
        go.Scatter(
            visible=False,
            line=dict(color="#000000", width=3),
            name="T = " + str(np.round(step,3)),
            x=x,
            y=y),row=1, col=1)
    fig.add_trace(
        go.Scatter(
            visible=False,
            line=dict(color="#000000", width=3),
            name="w = " + str(np.round(2*np.pi/step,3)),
            x=x,
            y=Y),row=2, col=1)

# Make 10th trace visible
vis_step = 10
fig.data[2*vis_step].visible = True
fig.data[2*vis_step+1].visible = True
#fig2.data[10].visible = True

# Create and add slider
steps = []
for i in range(0,2*Ts.shape[0],2):
    step = dict(
        method="update",
        args=[{"visible": [False] * len(fig.data)},
              {"title": "Spectrum of Boxcar",
              "name":str(Ts[i//2])}],  # layout attribute
        label=str(Ts[i//2])
        )
    step["args"][0]["visible"][i] = True  # Toggle i'th trace to "visible"
    step["args"][0]["visible"][i+1] = True  # Toggle i'th trace to "visible"
    steps.append(step)

sliders = [dict(
    active=10,
    currentvalue={"prefix": "T: "},
    pad={"t": 50},
    steps=steps
)]

fig.update_layout(
    sliders=sliders
)


#fig.show()

pio.write_html(fig, file='sims/boxcar.html', auto_open=True)

#fig2.show()