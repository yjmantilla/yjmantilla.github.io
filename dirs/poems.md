---
title : Poems
---
# Cringeworthy Poems

<ul>
   {% for item in site.data.poems-list %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

