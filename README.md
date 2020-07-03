# Probably Wrong Hub

![Spectrum Banner](/images/spectrum_banner.png)<br/>

![Bird](/images/bird.png)<br/>

<h2>{{ site.data.simsList.simsList_title }}</h2>
<ul>
   {% for item in site.data.simsList.sims %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

<h2>{{ site.data.poemsList.poemsList_title }}</h2>
<ul>
   {% for item in site.data.poemsList.poems %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

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
