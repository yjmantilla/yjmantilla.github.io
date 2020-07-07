# Music Visualizations

<ul>
   {% for item in site.data.song_list.songs %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

# Soundcloud

<ul>
   {% for item in site.data.song_list.soundcloud %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
