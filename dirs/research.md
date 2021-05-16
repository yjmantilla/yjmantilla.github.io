---
title : Research
---
# Research

<ul>
   {% for item in site.data.research_list %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
      <img src="{{item.frame}}">
   {% endfor %}
</ul>

