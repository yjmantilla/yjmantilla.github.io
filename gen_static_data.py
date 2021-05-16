from os import listdir
from os.path import isfile, join
import re
import json
import yaml
import yaml


#%% CHUNKS
mypath = 'chunks'
extension = '.md' # gotta filter by extension since assets may be in the folder (images ie)
def collect_graph(mypath,output_path='files',extension='.md'):
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and extension in f]

    sources = []
    targets = []
    labels = []
    for i in range(len(onlyfiles)):
        this_file = onlyfiles[i]
        print(this_file)
        title = ''
        go_to = []
        with open (join(mypath,this_file), "r") as myfile:
            data=myfile.readlines()
            #print(data)
            #title = data[0].replace('# ','').replace('\n','')
            id = this_file.replace('.md','')
            for line in data:
                go_to = go_to + re.findall('\[\[(.*?)\]\]',line)
        sources.append(id)
        targets.append(go_to)
        print('id',id)
        print(go_to)

    # Get nodes:
    nodes = set(sources + [item for sublist in targets for item in sublist])
    nodes = [{'id':x} for x in nodes]
    links = [[{'source':source,'target':x} for x in target] for (source,target) in zip(sources,targets)]
    links = [item for sublist in links for item in sublist]
    graph = {'nodes':nodes,'links':links}

    with open(output_path+"\graph.json", "w") as out_file:
        json.dump(graph, out_file)

def get_dicts(onlyfiles,urls,mypath):
    dicts = []
    for (this_file,this_url) in zip(onlyfiles,urls):
        print(this_file)
        with open(join(mypath,this_file),encoding='utf-8') as f:
            data=f.readlines()
            if '---' in data[0]:
                with open(join(mypath,this_file),encoding='utf-8') as f2:
                    front_matter = next(yaml.load_all(f2, Loader=yaml.FullLoader))
                #print(front_matter)
                if 'url' not in front_matter:
                    front_matter['url'] = this_url
            elif '#' in data[0]: # first line with title
                title = data[0].replace('# ','').replace('\n','')
                front_matter = {'title':title,'url':this_url}
            else:
                title = this_file.replace('.md','')
                front_matter = {'title':title,'url':this_url}
            dicts.append(front_matter)
    return dicts

def collect_stuff(mypath,extension='.md'):
    # gotta filter by extension since assets may be in the folder (images ie)
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and extension in f]
    urls = ['/'+mypath+'/'+ x.replace('.md','.html') for x in onlyfiles]

    dicts = get_dicts(onlyfiles,urls,mypath)
    explicit_start=True
    default_flow_style=False

    with open('_data/'+mypath+'_list.yml', 'w',encoding='utf-8') as yaml_file:
        yaml.dump(dicts, yaml_file, default_flow_style=default_flow_style,explicit_start=explicit_start,allow_unicode=True,encoding='utf-8')

#%% Collector
collect_graph('chunks')
collect_stuff('dirs')
collect_stuff('poems')
collect_stuff('tutorials')
collect_stuff('sims')
collect_stuff('essays')
collect_stuff('research')