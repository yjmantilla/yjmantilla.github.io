# Research

<ul>
   {% for item in site.data.research_list.research %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
      <img src="{{item.frame}}">
   {% endfor %}
</ul>

{% include home.md %}