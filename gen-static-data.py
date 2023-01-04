import os
from os import listdir
from os.path import isfile, join
import re
import json
import yaml
import ntpath
import pathlib

#%% bubbles
#mypath = 'bubbles'
#extension = '.md' # gotta filter by extension since assets may be in the folder (images ie)
def collect_graph(mypath,output_path='files\graph.json',extension='.md',out_extension='',subdirs=True,ignore_in=['dirs','_site','_includes'],ignore_eq=['bubbles','README','.']):
    #onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and extension in f]
    onlyfiles = [os.path.join(path, name) for path, subdirs, files in os.walk(mypath) for name in files if extension in name and not any(substring in path for substring in ignore_in)]
    onlysubdirs= [pathlib.PurePath(p).parent.name for p in onlyfiles]
    # before out_extension ='.html'
    urls = ['../'+p.replace('\\','/').replace(extension,out_extension) for p in onlyfiles]#'../'+ why did i use this?? seems that it was for getting to root in one step
    filenames = [ntpath.basename(p).replace(extension,'') for p in onlyfiles]
    #assert uniqueness
    assert len(filenames)==len(set(filenames))
    sources = []
    targets = []
    for (this_file,this_fullpath,this_subdir) in zip(filenames,onlyfiles,onlysubdirs):
        print(this_file)
        title = ''
        go_to = []
        
        with open (this_fullpath, "r",encoding='utf-8') as myfile:
            data=myfile.readlines()
            filedata = myfile.read()
            #print(data)
            #title = data[0].replace('# ','').replace('\n','')
            id = this_file.replace('.md','')
            for line in data:
                go_to = go_to + re.findall('\[\[(.*?)\]\]',line)
        if subdirs:
            go_to.append(this_subdir)
        sources.append(id)
        targets.append(go_to)
        print('id',id)
        print(go_to)
    # Get nodes:
    # assume all nodes have a file
    nodes = [{'id':x,'url':u} for x,u in zip(sources,urls) if not any(substring == x for substring in ignore_eq)]


    if subdirs:
        nodes += [{'id':x,'url':'.//'+x+out_extension} for x in list(set(onlysubdirs)) if not any(substring == x for substring in ignore_eq)]


    #Nodes without files, have to be after since order is important in the previous lines
    ghost_nodes = set ([item for sublist in targets for item in sublist]) - set([n['id'] for n in nodes])
    ghost_nodes = list(ghost_nodes)
    ghost_nodes = [x for x in ghost_nodes if not any(substring == x for substring in ignore_eq)]
    stub_path = [x for x in nodes if x['id']=='stub'][0]['url']
    nodes += [{'id':n,'url':stub_path} for n in ghost_nodes]
    links = [[{'source':source,'target':x} for x in target if not any(substring == x for substring in ignore_eq)] for (source,target) in zip(sources,targets) if not(any(substring == source for substring in ignore_eq) or any(substring == target for substring in ignore_eq))]
    links = [item for sublist in links for item in sublist]
    graph = {'nodes':nodes,'links':links}

    with open(output_path, "w") as out_file:
        json.dump(graph, out_file,indent=4)
    return graph

def get_dicts(onlyfiles,urls,mypath):
    dicts = []
    for (this_file,this_url) in zip(onlyfiles,urls):
        print(this_file)
        with open(join(mypath,this_file),encoding='utf-8') as f:
            data=f.readlines()
            if data != []:
                if '---' in data[0]:
                    with open(join(mypath,this_file),encoding='utf-8') as f2:
                        front_matter = next(yaml.load_all(f2, Loader=yaml.FullLoader))
                    #print(front_matter)
                    if 'link' not in front_matter:
                        front_matter['link'] = this_url
                elif '#' in data[0]: # first line with title
                    title = data[0].replace('# ','').replace('\n','')
                    front_matter = {'title':title,'link':this_url}
                else:
                    title = this_file.replace('.md','')
                    front_matter = {'title':title,'link':this_url}
            else:
                title = this_file.replace('.md','')
                front_matter = {'title':title,'link':this_url}

            dicts.append(front_matter)

    return dicts

def collect_stuff(mypath,extension='.md'):
    # gotta filter by extension since assets may be in the folder (images ie)
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and extension in f]
    urls = ['/'+mypath+'/'+ x.replace('.md','.html') for x in onlyfiles]

    dicts = get_dicts(onlyfiles,urls,mypath)
    explicit_start=True
    default_flow_style=False

    with open('_data/'+mypath+'-list.yml', 'w',encoding='utf-8') as yaml_file:
        yaml.dump(dicts, yaml_file, default_flow_style=default_flow_style,explicit_start=explicit_start,allow_unicode=True,encoding='utf-8')

def generate_link_reference_definitions(mypath,graph,extension='.md',only_clean=False,subdirs=True,ignore_in=['dirs','_site','_includes'],ignore_eq=['bubbles','README','.']):
    #onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and extension in f]
    onlyfiles = [os.path.join(path, name) for path, subdirs, files in os.walk(mypath) for name in files if extension in name and not any(substring in path for substring in ignore_in)]
    onlysubdirs= [pathlib.PurePath(p).parent.name for p in onlyfiles]
    urls = ['../'+p.replace('\\','/').replace(extension,'.html') for p in onlyfiles]
    filenames = [ntpath.basename(p).replace(extension,'') for p in onlyfiles]
    #assert uniqueness
    assert len(filenames)==len(set(filenames))
    sources = []
    targets = []
    begin = '\n\n[//begin]: # "Autogenerated link references for markdown compatibility"\n'
    end = '\n[//end]: # "Autogenerated link references"\n\n'
    for (this_file,this_fullpath,this_subdir) in zip(filenames,onlyfiles,onlysubdirs):
        print(this_file)
        # Get references of this file (all links with this file as the source)
        current_links = [x for x in graph['links'] if x['source']==this_file]
        if current_links:

            with open (this_fullpath, "r",encoding='utf-8') as myfile:
                data=myfile.read()
                if begin in data and end in data:
                    # Assume these tags appear only ONCE
                    a, b = data.find(begin), data.find(end)+len(end)
                    newdata = data[:a] + data[b:]
                else:
                    newdata = data
                refs = []
                for l in current_links:
                    tg=l['target']
                    url = [x for x in graph['nodes'] if x['id']==tg][0]['url']
                    refs.append(f'[{tg}]: {url} "{tg}"')
                newtext =  '\n'.join(refs)
                newtext = begin+newtext+end
                if not only_clean:
                    newdata = newdata+newtext
                # Make references
                #print(data)
                #title = data[0].replace('# ','').replace('\n','')
            with open (this_fullpath, "w",encoding='utf-8') as myfile:
                myfile.write(newdata)
            
            print(f'Links Autogenerated for {this_fullpath}')

#%% Collector
out_extension=''
graph_subs=collect_graph('./',out_extension=out_extension,output_path='files/graph-subdirs.json',ignore_in=['_site','_includes','dirs'],ignore_eq=['.','README','bubbles'],subdirs=True)
graph_nosubs=collect_graph('./',out_extension=out_extension,output_path='files/graph.json',ignore_in=['_site','_includes','dirs'],ignore_eq=['.','README','bubbles'],subdirs=False)
generate_link_reference_definitions('./',graph_nosubs,only_clean=True)
generate_link_reference_definitions('./',graph_nosubs,only_clean=False)
collect_stuff('poems')
collect_stuff('tutorials')
collect_stuff('wayward')
collect_stuff('sims')
collect_stuff('essays')
collect_stuff('research')
collect_stuff('gsoc')
collect_stuff('bubbles')
collect_stuff('dirs')

