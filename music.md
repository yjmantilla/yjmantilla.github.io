<h2>Music Visualizations</h2>
<ul>
   {% for item in site.data.songsList.songs %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

<h2>Soundcloud</h2>
<ul>
   {% for item in site.data.songsList.soundcloud %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
