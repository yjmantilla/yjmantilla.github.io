# Essays

<h2>Essays</h2>
<ul>
   {% for item in site.data.essaysList.essays %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
