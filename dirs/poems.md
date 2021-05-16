---
title : Poems
---
# Cringeworthy Poems

<ul>
   {% for item in site.data.poems_list %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

