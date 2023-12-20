---
title : Poems
---

These are kind of cringe but... I'm keeping them here for now.

<ul>
   {% for item in site.data.poems-list %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

