---
title : Essays
---

<ul>
   {% for item in site.data.essays-list%}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

