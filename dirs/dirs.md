---
title : Directories
---

<ul>
   {% for item in site.data.dirs-list%}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
