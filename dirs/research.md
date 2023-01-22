---
title : Research
---
# Research

<ul>
   {% for item in site.data.research-list %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
      {% if item.frame %}
         <img src="{{item.frame}}">
      {% endif %}
   {% endfor %}
</ul>

