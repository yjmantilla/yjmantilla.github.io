# Cringeworthy Poems

<ul>
   {% for item in site.data.poem_list.poems %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

{% include home.md %}