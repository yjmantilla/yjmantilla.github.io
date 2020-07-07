# Tutorials

<ul>
   {% for item in site.data.tutorial_list.tutorials %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
