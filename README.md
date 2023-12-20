![Spectrum Banner](/images/spectrum-banner.png)<br/>

> crear y errar tienen la misma naturaleza.

## Site Map

<ul>
   {% for item in site.data.dirs-list %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>