---
title : Literature Review
---

<ul>
   {% for item in site.data.literature-review-list%}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
