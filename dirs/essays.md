# Essays

<ul>
   {% for item in site.data.essay_list.essays %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

