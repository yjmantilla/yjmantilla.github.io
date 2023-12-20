---
title: Naming Markdown Docs
---

This jekyll sites uses 3 possible naming configurations:

## Through a yaml front-matter

```yaml
  --- #first line of file
  title : the title 
  ---
```

## Through the first header

```markdown
# The Title
```

## Through the file name

```markdown
the-title.md
```

The collector (gen-static-data.py) will try to get the above in the same order as presented here; being the worst case the filename.

For files inside the knowledge graph though the filename will always be chosen. This is to be able to generate the urls easily and avoid duplicate names.

Idealmente deberían tener nombre único y siguiendo el [kebab case](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Why-you-should-make-kebab-case-a-URL-naming-convention-best-practice)
