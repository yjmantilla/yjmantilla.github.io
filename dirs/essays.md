---
title : Essays
---

<ul>
   {% for item in site.data.essays-list%}
      <li><a href="{{ item._link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

