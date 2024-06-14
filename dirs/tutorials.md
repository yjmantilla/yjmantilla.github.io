---
title : Tutorials
---

<ul>
   {% for item in site.data.tutorials-list %}
      <li><a href="{{ item._link }}">{{ item.title }}</a></li>
      {% if item._frame %}
      <img src="{{item._frame}}">
      {% endif %}
   {% endfor %}
</ul>

