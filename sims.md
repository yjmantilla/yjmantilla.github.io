<h2>Simulations</h2>
<ul>
   {% for item in site.data.sim_list.sims %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
