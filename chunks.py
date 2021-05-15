from os import listdir
from os.path import isfile, join
import re
import json
mypath = 'chunks'
extension = '.md' # gotta filter by extension since assets may be in the folder (images ie)
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f)) and extension in f]

sources = []
targets = []
for i in range(len(onlyfiles)):
    this_file = onlyfiles[i]
    print(this_file)
    title = ''
    go_to = []
    with open (join(mypath,this_file), "r") as myfile:
        data=myfile.readlines()
        #print(data)
        title = data[0].replace('# ','').replace('\n','')
        for line in data:
            go_to = go_to + re.findall('\[\[(.*?)\]\]',line)
    sources.append(title)
    targets.append(go_to)
    print('title',title)
    print(go_to)

# Get nodes:
nodes = set(sources + [item for sublist in targets for item in sublist])
nodes = [{'id':x} for x in nodes]
links = [[{'source':source,'target':x} for x in target] for (source,target) in zip(sources,targets)]
links = [item for sublist in links for item in sublist]
graph = {'nodes':nodes,'links':links}

with open("files\graph.json", "w") as out_file:
    json.dump(graph, out_file)