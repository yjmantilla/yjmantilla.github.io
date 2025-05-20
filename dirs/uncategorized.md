---
title : Uncategorized Notes
---

<ul>
   {% for item in site.data.uncategorized-list %}
      <li><a href="{{ item._link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
