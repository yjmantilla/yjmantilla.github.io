# Probably Wrong Hub

![Spectrum Banner](/images/spectrum_banner.png)<br/>

## Site Map

<ul>
   {% for item in site.data.dir_list.content %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>