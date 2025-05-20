---
title: html shortcuts
---

Html shortcuts are a way to create a link that automatically redirects to another page. This is useful as they are OS agnostic and can be used in any application that supports html.

## Method 1

```html
<html>
    <head>    <meta http-equiv="refresh" content="0; url=https://drive.google.com/file/d/1DBxdYuWOrBxcHbKUoenyRB_PmI1DhNZd/view?usp=sharing" />
    </head>
    <body>
    </body>
    </html>
    
```

## Method 2

```html
<html><body><script type='text/javascript'>window.location.href='https://en.wikipedia.org/wiki/Curta';</script><a href='https://en.wikipedia.org/wiki/Curta'>https://en.wikipedia.org/wiki/Curta</a></body></html>
```
