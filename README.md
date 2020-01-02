## Yorguin José Mantilla Ramos

<h2>{{ site.data.poem_list.poems_list_title }}</h2>
<ul>
   {% for item in site.data.poem_list.poems %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

<h2>{{ site.data.song_list.songs_list_title }}</h2>
<ul>
   {% for item in site.data.song_list.songs %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

<h2>{{ site.data.sim_list.sims_list_title }}</h2>
<ul>
   {% for item in site.data.sim_list.sims %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
