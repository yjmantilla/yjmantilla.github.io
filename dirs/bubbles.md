---
title : Bubbles
---
# Bubbles (Random Stuff)

<ul>
   {% for item in site.data.bubbles-list %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
