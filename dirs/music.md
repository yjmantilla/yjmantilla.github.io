---
title : Music
---

## Youtube

<ul>
   {% for item in site.data.song-list.youtube %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
      <img src="{{item.frame}}">
   {% endfor %}
</ul>

## Interactive

<ul>
   {% for item in site.data.song-list.interactive %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

## Soundcloud

<ul>
   {% for item in site.data.song-list.soundcloud %}
      <li><a href="{{ item.link }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
