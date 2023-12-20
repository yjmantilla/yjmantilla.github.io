---
title: Fixed Order For Automatic Yaml Lists
---

In my approach I make the content yaml list automatically with python. The problem is that any order I had is lost to alphabetical order.

The fix is to prefix the files with the order you want to show them.

Example:

```markdown
important-file --> 1-important-file
irrelevant-file --> 2-irrelevant-file
```

Now, with poems it may be more advantageous to have them in alphabetical order; they look better that way.

You may even just want to highlight some files rather than giving an order to everyone. For that just prefix with a number the files that you want to leave highlighted and leave the other ones as they were.
