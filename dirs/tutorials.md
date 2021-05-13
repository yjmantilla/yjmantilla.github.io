# Tutorials

<ul>
   {% for item in site.data.tutorial_list.tutorials %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
      {% if item.frame %}
      <img src="{{item.frame}}">
      {% endif %}
   {% endfor %}
</ul>

{% include home.md %}