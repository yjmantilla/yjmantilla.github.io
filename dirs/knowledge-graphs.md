---
title : Knowledge Graph

_graphs :
    - _link: /graphs/knowledge-graph-subdirs.html
      title: Graph with Categories
    - _link: /graphs/knowledge-graph.html
      title: Graph without Categories
---

For Brave browser the graphs dont work correctly, [fix here](.././tutorials/force-graph-in-brave-browser-bug).

<ul>
   {% for item in page._graphs %}
      <li><a href="{{ item._link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
