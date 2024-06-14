---
title : Bubbles (Random Thoughts)
---

<ul>
   {% for item in site.data.bubbles-list %}
      <li><a href="{{ item._link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
