---
title : Tutorials
---
# Tutorials

<ul>
   {% for item in site.data.tutorials_list %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
      {% if item.frame %}
      <img src="{{item.frame}}">
      {% endif %}
   {% endfor %}
</ul>

