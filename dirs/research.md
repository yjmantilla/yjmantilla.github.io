---
title : Research
---

<ul>
   {% for item in site.data.research-list %}
      <li><a href="{{ item._link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

