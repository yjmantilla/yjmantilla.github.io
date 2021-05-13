# Youtube

<ul>
   {% for item in site.data.song_list.youtube %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
      <img src="{{item.frame}}">
   {% endfor %}
</ul>

# Interactive

<ul>
   {% for item in site.data.song_list.interactive %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

# Soundcloud

<ul>
   {% for item in site.data.song_list.soundcloud %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

{% include home.md %}