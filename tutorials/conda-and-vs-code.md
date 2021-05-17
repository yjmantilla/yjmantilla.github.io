# Conda and vs code

I used to have some problems when importing numpy in vscode with the conda environment.

Apparently I was starting vscode the wrong way.

The correct way seems to be:

1. Open your conda terminal
2. enter ```code``` and press enter.
3. It should open vscode with the conda environment correclty initialized.


## Here are the comments I posted on facebook regarding this topic:

Abre El terminal de anaconda y escribe "code" y das enter. Deberia de abrirse vscode con los environments de anaconda disponibles.

![](https://scontent-bog1-1.xx.fbcdn.net/v/t1.6435-9/102774210_10219829053589026_3998607676344606585_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=dbeb18&_nc_ohc=scfry69vLakAX9tcBQT&_nc_oc=AQkvlTc6byLymz54KaxiuktcyrrGe2aq_FIu4JiWjPyIMxlr7lqf9PM_nY6dfD10hwNCVxE8NHa2dqv1xu_AfwiE&_nc_ht=scontent-bog1-1.xx&oh=bc10d9806c210d9b4ea1cf951cbbd2f2&oe=60C5B762)

![](https://scontent-bog1-1.xx.fbcdn.net/v/t1.6435-9/101440621_10219829055469073_5217499476893729166_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=dbeb18&_nc_ohc=IGIqALVGSZIAX8MzUQh&_nc_ht=scontent-bog1-1.xx&oh=f5f7a7e2e89b533641f1896aa2bc623e&oe=60C8ABDC)


En teoria ya luego puedes seleccionar el interprete con ctrl shift P y luego escribiendo python. Así mismo si abres un terminal debería aparecerte un terminal de anaconda dónde puedes escribir "activate xxx" para activar el environment xxx de anaconda.


![](https://scontent.feoh4-3.fna.fbcdn.net/v/t1.6435-9/101801140_10219829058269143_7898156791571153439_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=dbeb18&_nc_ohc=c5uGJ_sFJEEAX_san8Q&_nc_ht=scontent.feoh4-3.fna&oh=a8ce8d686d0b4b71680e0f2ebc7f1cda&oe=60C73CE3)

![](https://scontent.feoh4-3.fna.fbcdn.net/v/t1.6435-9/101790978_10219829060869208_8096226944815149256_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=dbeb18&_nc_ohc=S1dvrG0kOtEAX_2KJAt&_nc_ht=scontent.feoh4-3.fna&oh=0fc518cb3b6256b0dd34f0dc22276a0f&oe=60C6765F)

Yo abogo por el método de arrancar vscode desde el terminal de anaconda ya que si se arranca por si solo a veces al tratar de utilizar los módulos de python da un "import dll error" para algunos módulos como numpy. Esto me trajo muchos dolores de cabeza en su día. Cómo referencia dejo este [issue](https://stackoverflow.com/questions/56622152/dll-load-failed-in-visual-studio-code-when-trying-to-open-any-python-library-o)

Tambien se puede por el conda navigator.Yo prefiero simplemente abrir el terminal de anaconda y luego poner code y dar enter. Así hago yo generalmente ya que es más rápido.
