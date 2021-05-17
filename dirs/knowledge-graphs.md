---
title : Knowledge Graph

graphs :
    - link: /graphs/knowledge-graph-subdirs.html
      title: Graph with Categories
    - link: /graphs/knowledge-graph.html
      title: Graph without Categories
---

<ul>
   {% for item in page.graphs %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
