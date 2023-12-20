---
title : Tutorials
---

<ul>
   {% for item in site.data.tutorials-list %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
      {% if item.frame %}
      <img src="{{item.frame}}">
      {% endif %}
   {% endfor %}
</ul>

