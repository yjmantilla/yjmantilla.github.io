---
title : Google Summer of Code 2021
_link: /research/gsoc
---

<ul>
   {% for item in site.data.gsoc-list%}
      <li><a href="{{ item._link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
