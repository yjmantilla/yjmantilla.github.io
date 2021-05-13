# Probably Wrong Hub

![Spectrum Banner](/images/spectrum_banner.png)<br/>

> crear y errar tienen la misma naturaleza.

## Site Map

<ul>
   {% for item in site.data.dir_list.dirs %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>