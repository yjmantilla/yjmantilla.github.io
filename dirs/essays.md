---
title : Essays
---
# Essays

<ul>
   {% for item in site.data.essays_list%}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

