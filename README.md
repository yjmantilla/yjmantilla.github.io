## Probably Wrong

<h2>{{ site.data.poemsList.poemsList_title }}</h2>
<ul>
   {% for item in site.data.poemsList.poems %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

<h2>{{ site.data.songsList.songsList_title }}</h2>
<ul>
   {% for item in site.data.songsList.songs %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

<h2>{{ site.data.simsList.simsList_title }}</h2>
<ul>
   {% for item in site.data.simsList.sims %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
