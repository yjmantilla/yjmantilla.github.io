# Previewing Jekyll Github Pages

So you wanna preview github pages locally so that you don't over stress the build limit of github or because of speed.

Here is how I did it (on windows). Note that I already had setup my github page in question. I just didn't have a way to locally preview it.

### 1 Read [this url](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)

From here the obvious conclusion is that one needs to install jekyll (duh!). Now, I didn't do it the "bundler" way because I just happened to skip that part when I read it. I jumped directly to the instruction on the oficial jekyll page.

### 2 Install jekyll as said on [this url](https://jekyllrb.com/docs/installation/windows/)

This is basically installing the Ruby+Devkit version from RubyInstaller using default options for installation.
You also need to run the ```ridk install command```, for me that was automatic. It prompts you to choose a mode, I choose mode 1 which I think said something like "basic installation". I don't remember.

### 3 Test jekyll was installed
On windows a new shortcut should say "Start command prompt with Ruby". I clicked on that one and I ran ```jekyll -v```. It worked.
Now, I have [git for windows](https://gitforwindows.org/) installed. I checked jekyll also worked there.

### 4 Go to your page source code and try to "serve" your page, fix some errors
That is, open a command window (i opened git bash) on that folder and run ```bundle exec jekyll serve```.

It will give some errors:

- The first is that "the jekyll-theme-hacker theme could not be found" or something of the sort.

I searched that and I found the [github repo of the theme](https://github.com/pages-themes/hacker) and there it said that I should try adding ```gem "github-pages", group: :jekyll_plugins``` to the gem file.

So now, one gotta figure how to do a gem file... A quick search will lead you to [this url](https://stackoverflow.com/questions/30358612/how-to-create-a-gemfile). A gem file is just a plain text file on the root of your page's  source code. It is named "Gemfile" with no extension.

So I just did that, created the file and edited it with notepad++ to add the suggested lines.


- The other is that it doesn't recognize the theme of the github-page

This is understandable since they are from github. It happens if you try to serve the page just after fixing the previous error.
So, now we gotta figure out how to install a github-page theme. Some more search will lead you to 

So you basically have to run ```gem install github-pages``` (I did this on the git bash prompt).


### 5 Finally serve your page
The command ```bundle exec jekyll serve``` should now run. It should be hosted at http://127.0.0.1:4000 .
Notice that changes you do in real time will be updated automatically.  

{% include home.md %}