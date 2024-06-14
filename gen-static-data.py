import os
from os import listdir
from os.path import isfile, join
import re
import json
import yaml
import ntpath
import pathlib

GRAPHS_URL_RULE=('./','./../')
SUBDIRS_URL_RULE=('./','./../')
def has_front_matter(lines):
    """Check if the list of lines contains front matter."""
    if lines and '---' in lines[0].strip():
        for i, line in enumerate(lines[1:], 1):
            if '---' in line.strip():
                return True, lines[:i+1]  # Return front matter lines
        return False, []  # In case the end delimiter isn't found
    return False, []

def format_content_with_front_matter(content, front_matter_lines):
    """Format content by removing front matter and prepending it as a code block."""
    content_lines = content.split('\n')
    content_without_fm = '\n'.join(content_lines[len(front_matter_lines):])  # Remove front matter lines
    front_matter_str = '```yaml\n' + ''.join(front_matter_lines) + '```\n'  # Format as code block
    return front_matter_str + content_without_fm
#%% bubbles
#mypath = 'bubbles'
#extension = '.md' # gotta filter by extension since assets may be in the folder (images ie)
def collect_graph(mypath,output_path='files\graph.json',extension='.md',out_extension='',subdirs=True,ignore_in=['dirs','_site','_includes'],ignore_eq=['bubbles','README','.'],stub_path=None):
    #onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and extension in f]
    onlyfiles = [os.path.join(path, name) for path, subdirs_, files in os.walk(mypath) for name in files if extension in name and not any(substring in path for substring in ignore_in)]
    onlysubdirs= [pathlib.PurePath(p).parent.name for p in onlyfiles]
    # before out_extension ='.html'
    urls = [p.replace('\\','/').replace(extension,out_extension).replace(*GRAPHS_URL_RULE) for p in onlyfiles]# [1:] skip the first dot, to make it /path/to/file.html which is from the root
    filenames = [ntpath.basename(p).replace(extension,'') for p in onlyfiles]
    #assert uniqueness
    assert len(filenames)==len(set(filenames))
    sources = []
    targets = []
    for (this_file,this_fullpath,this_subdir) in zip(filenames,onlyfiles,onlysubdirs):
        print(this_fullpath,this_file)
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


    # if subdirs:
    #     nodes += [{'id':x,'url':'/dirs/'+x+out_extension} for x in list(set(onlysubdirs)) if not any(substring == x for substring in ignore_eq)]


    #Nodes without files, have to be after since order is important in the previous lines
    ghost_nodes = set ([item  for sublist in targets  for item in sublist if item!='']) - set([n['id'] for n in nodes])
    ghost_nodes = list(ghost_nodes)
    ghost_nodes = [x for x in ghost_nodes if not any(substring == x for substring in ignore_eq)]
    if stub_path is None:
        stub_path = [x for x in nodes if x['id']=='stub'][0]['url']
    nodes += [{'id':n,'url':stub_path} for n in ghost_nodes]
    links = [[{'source':source,'target':x} for x in target if not any(substring == x for substring in ignore_eq)] for (source,target) in zip(sources,targets) if not(any(substring == source for substring in ignore_eq) or any(substring == target for substring in ignore_eq))]

    links = [item for sublist in links for item in sublist]
    links += [{'source':'stub','target':n} for n in ghost_nodes]
    graph = {'nodes':nodes,'links':links}
    for link in graph['links']:
        if link['source'] == "":
            link['source'] = "dirs"
        if link['target'] == "":
            link['target'] = "dirs"

    for node in graph['nodes']:
        this_file = node['url']+'.md'
        this_file = this_file.replace(*reversed(GRAPHS_URL_RULE))
        tree=node['url'].split('/')
        if len(tree)>3:
            cat = tree[2]
        else:
            cat = 'root'
        node.update({'category':cat})

        if node['id'] == "":
            node['id'] = 'index'
            #this_file = './index.md' # why is this here?
        try:
            with open(this_file, encoding='utf-8') as f:
                data = f.readlines()
                data2 = ''.join(data)
                if data:
                    front_matter_exists, front_matter_lines = has_front_matter(data)
                    if front_matter_exists:
                        front_matter_str = ''.join(front_matter_lines)
                        front_matter = next(yaml.load_all(front_matter_str, Loader=yaml.FullLoader))
                        node.update(front_matter)
                        if node['id'] != 'stub' and node['url'] == stub_path:
                            node.update({'title': node['id'].lower()})
                        node['title']=node['title'].lower() # make it more easy to search as search is case sensitive
                        node['content'] = format_content_with_front_matter(data2, front_matter_lines)
                    else:
                        print(node, 'has no front matter')
                        node['content'] = data2
        except Exception as e:
            print('Error processing file for node', node, 'at', this_file, ":", e)            #exit()
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
                if '---' in data[0]:# first line with front matter, this is a bit of a hack, not robust
                    with open(join(mypath,this_file),encoding='utf-8') as f2:
                        front_matter = next(yaml.load_all(f2, Loader=yaml.FullLoader))
                    #print(front_matter)
                    if '_link' not in front_matter:
                        front_matter['_link'] = this_url
                elif '#' in data[0]: # first line with title
                    title = data[0].replace('# ','').replace('\n','')
                    front_matter = {'title':title,'_link':this_url}
                else:
                    title = this_file.replace('.md','')
                    front_matter = {'title':title,'_link':this_url}
            else:
                title = this_file.replace('.md','')
                front_matter = {'_title':title,'_link':this_url}

            dicts.append(front_matter)

    return dicts

def collect_stuff(mypath,extension='.md',ignore=[]):
    # gotta filter by extension since assets may be in the folder (images ie)
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and extension in f]
    onlyfiles = [f for f in onlyfiles if not any(substring in f for substring in ignore)]
    urls = ['./../'+mypath+'/'+ x.replace('.md','.html') for x in onlyfiles]
    # this is for when you are in root/dirs/
    dicts = get_dicts(onlyfiles,urls,mypath)
    explicit_start=True
    default_flow_style=False

    with open('_data/'+mypath+'-list.yml', 'w',encoding='utf-8') as yaml_file:
        yaml.dump(dicts, yaml_file, default_flow_style=default_flow_style,explicit_start=explicit_start,allow_unicode=True,encoding='utf-8')

def generate_link_reference_definitions(mypath,graph,extension='.md',only_clean=False,subdirs=True,ignore_in=['dirs','_site','_includes'],ignore_eq=['bubbles','README','.']):
    #onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and extension in f]
    onlyfiles = [os.path.join(path, name) for path, subdirs, files in os.walk(mypath) for name in files if extension in name and not any(substring in path for substring in ignore_in)]
    onlysubdirs= [pathlib.PurePath(p).parent.name for p in onlyfiles]
    urls = [p.replace('\\','/').replace(extension,'.html').replace(*SUBDIRS_URL_RULE) for p in onlyfiles]
    filenames = [ntpath.basename(p).replace(extension,'') for p in onlyfiles]
    #assert uniqueness
    assert len(filenames)==len(set(filenames))
    sources = []
    targets = []
    begin = '\n[//begin]: # "Autogenerated link references for markdown compatibility"\n'     # the two linebreaks are really important for github pages to grab these as references
    end = '\n[//end]: # "Autogenerated link references"'
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
ignore_in = ['_site','_includes','.github','.vscode','docs','packages','README','poems']
ignore_eq = ['.','README','bubbles']
graph_subs=collect_graph('./',out_extension=out_extension,output_path='graphs/graph-subdirs.json',ignore_in=ignore_in,ignore_eq=ignore_eq,subdirs=True)

# collect all attributes and unique values
unique_values = {}
ignored_attributes = ['content','url','id','title']
for node in graph_subs['nodes']:
    for key, value in node.items():
        if '_' == key[0] or key in ignored_attributes:
            continue
        if key not in unique_values:
            unique_values[key] = []
        if isinstance(value, list):
            for v in value:
                if v not in unique_values[key]:
                    unique_values[key]+=[v]
        elif value not in unique_values[key]:
            unique_values[key]+=[value]

# create markdown file with the list of unique values per attribute
with open('attributes.md', 'w',encoding='utf-8') as f:
    # add yaml front matter
    f.write('---\n')
    f.write('title: Attributes\n')
    f.write('---\n')
    f.write('\n')
    for attribute, values in unique_values.items():
        f.write(f'## {attribute}\n')
        f.write(f'\n')
        for value in values:
            f.write(f'- {value}\n')
        f.write('\n')

graph_subs=collect_graph('./',out_extension=out_extension,output_path='graphs/graph-subdirs.json',ignore_in=ignore_in,ignore_eq=ignore_eq,subdirs=True)
graph_nosubs=collect_graph('./',out_extension=out_extension,output_path='graphs/graph.json',ignore_in=ignore_in,ignore_eq=ignore_eq,subdirs=False)
generate_link_reference_definitions('./',graph_nosubs,only_clean=True)
generate_link_reference_definitions('./',graph_nosubs,only_clean=False)

# Devise a method to extract references without a file (in the graphs they are the ones that link to the stub article)
# Would be helpful to have a list of them somewhere.
# Solved--> They are linked to the stub article on the collect graph
# Should crash because generate_link_reference_definitions works with the source, which is the stub, for the ghost nodes.

#collect_stuff('poems')
collect_stuff('tutorials')
collect_stuff('wayward')
collect_stuff('sims')
collect_stuff('essays')
collect_stuff('literature-review')
collect_stuff('research')
collect_stuff('gsoc')
collect_stuff('bubbles')
collect_stuff('dirs',ignore=['poems'])

