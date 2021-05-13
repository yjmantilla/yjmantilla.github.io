# Interactive Content

<ul>
   {% for item in site.data.sim_list.sims %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
      <div style="width:150px;height:auto">
               <img src="{{item.frame}}">
      </div>
   {% endfor %}
</ul>

{% include home.md %}