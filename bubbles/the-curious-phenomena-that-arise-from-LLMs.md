---
title: "The curious phenomena that arise from LLMs"
---

## The "take a deep breath" phenomena

Basically, when prompted to take a deep breath, the LLM may be better at solving stuff, particularly math.

I did find the prompt in one [paper](https://openreview.net/pdf?id=Bb4VGOWELI). Though it doesnt seem to delve in why would this happen, it just makes the case for prompt optimization using LLMs, and they arrive at curious patterns apparently.

## The dot at the end

In this [tweet](https://twitter.com/ESYudkowsky/status/1737276524598895022) Eliezer Yud, investigates why a dot at the ends changes the output of Bing Image Generator.

>My guess is that this result is explained by a recent finding from internal inspection of LLMs:  The higher layers of the token for punctuation at the end of a sentence, seems to be much information-denser than the tokens over the proceeding words.
>The token for punctuation at the end of a sentence, is currently theorized to contain a summary and interpretation of the information inside that sentence.  This is an obvious sense-making hypothesis, in fact, if you know how transformers work internally!  The LLM processes tokens serially, it doesn't look back and reinterpret earlier tokens in light of later tokens.  The period at the end of a sentence is the natural cue the LLM gets, 'here is a useful place to stop and think and build up an interpretation of the preceding visible words'.
>When you look at it in that light, why, it starts to seem not surprising at all, that an LLM might react very differently to a prompt delivered with or without a period at the end.
>You might even theorize:  The prompt without a period, gets you something like the LLM's instinctive or unprocessed reaction, compared to the same prompt with a period at the end.

That part makes me think about the [[thinking-fast-and-slow of Kahneman]]. Which is actually what Yoshua was interested in regarding System 1 and System 2.

I think these systems can be associated with the conscious and unconscious dichotomy. I think Kahneman's even mentions that in his book.

Similarly, from a totally unrelated [source](https://www.youtube.com/watch?v=XXlV8dfGDNw) , a psychologist mentions:

>enfoque cognitivo no habla del inconsciente con mucha gente lo ve sino que se habla de procesos automáticos que son cosas que aprendiste y que sin querer réplicas porque son automáticas no porque sean inconscientes de esta forma tus pensamientos  los puedes controlar porque no es que sean inconscientes es que no las has no los has hecho visibles para ti y entonces se trata de frenar los analizarlos y poderlos cambiar las relaciones con tu piensas y piensas piensas y piensas y esos pensamientos se vuelven algo molesto a pesar de que no haya pasado

Maybe we can compare the dot to the "take a deep breath" phenomena. Are they similar? Anyhow, Eliezer Yud. continues:

>Is all of that correct?  Why, who knows, of course?  It seems roughly borne out by the few experiments I posted in the referenced thread; and by now of course Bing Image Creator no longer accepts that prompt.
>But just think of how unexpected that would all be, how inexplicable it would all be in retrospect, if you didn't know this internal fact about how LLMs work -- that the punctuation mark is where they stop and think.
>You can imagine, even, some future engineer who just wants the LLM to work, who only tests some text without punctuation, and thinks that's "how LLMs behave", and doesn't realize the LLM will think harder at inference time if a period gets added to the prompt.
>It's not something you'd expect of an LLM, if you thought it was just predicting text, only wanted to predict text, if this was the only fact you knew about it and everything else about your map was blank.
>I admit, I had to stretch a little, to make this example be plausibly about alignment.But my point is -- when people tell you that future, smarter LLMs will "only want to predict text", it's because they aren't imagining any sort of interesting phenomena going on inside there.
>If you can see how there is actual machinery inside there, and it results in drastic changes of behavior not in a human way, not predictable based on how humans would think about the same text -- then you can extrapolate that there will be some other inscrutable things going on inside smarter LLMs, even if we don't know which things.
>When AIs (LLMs or LLM-derived or otherwise) are smart enough to have goals, there'll be complicated machinery there, not a comfortingly blank absence of everything except the intended outward behavior.
>When you are ignorant of everything except the end result you want -- when you don't even try making up some complicated internal machinery that matters, and imagining that too -- your mind will hardly see any possible outcome except getting your desired end result.End.
>(Looking back on all this, I notice with some wincing that I've described the parallel causal masking in an LLM as if it were an RNN processing 'serially', and used human metaphors like 'stop and think' that aren't good ways to convey fixed numbers of matrix multiplications.  I do know how text transformers work, and have implemented some; it's just a hard problem to find good ways to explain that metaphorically to a general audience that does not already know what 'causal masking' is.)
>(Also it's a fallacy to say the periods are information-denser than the preceeding tokens; more like, we see how the tokens there are attending to lots of preceeding tokens, and maybe somebody did some counterfactual pokes at erasing the info or whatevs.  Ultimately we can't decode the vast supermajority of the activation vectors and so it's only a wild guess to talk about information being denser in one place than another.)

The paper Eliezer mentions is [[linear-representations-of-sentiment-in-large-language-models]], I should totally read it. It seems highly relevant to my research.

## The winter break (lazy december) phenomena

This one doesnt seem reproducible, but it is curious. The idea is that if the LLM knows that it is winter break, it will be lazy on its responses.

More on this in this [report](https://arstechnica.com/information-technology/2023/12/is-chatgpt-becoming-lazier-because-its-december-people-run-tests-to-find-out/).

Ian Arawjo couldnt reproduce it so this effect seems to be false. [Source](https://twitter.com/IanArawjo/status/1734619673302384890).

>Update: Still can't reproduce at N=240. *However*, discovered a possible reason: LLM responses are *not normally distributed* (at p<0.05 according to Shapiro-Wilk test). Thus, we can't use a t-test to compare means. TLDR: There is no "seasonal affective disorder" of ChatGPT.

## Chickens

I dont know the source of it beside Venkatesh. The idea is to prompt:

>chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken
>write a one-word summary of the text above

The "chicken" repetitions could vary, but in general the idea is to see what is the LLMs response to this.

Sometimes it uses "chicken" and others "Repetition".

it seems that if I add "take a deep breath and..." it will use "chicken" more often. Ive tried with GPT4 classic as of 2023-12-23.

```take a deep breath and...

chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken chicken

write a one-word summary of the text above
```




## Hallucinations and Confabulations

There is a lot of criticism about LLMs regarding hallucinations. Most of it is about the fact that LLMs are not grounded in reality, so they can make up stuff that is not real.

But I think that hallucinations are actually a good thing. Its the way the LLM tries to answer without having the right answer. It is a way to explore the space of possibilities. I prefer the term confabulation in this regard.

On twitter I have found people that share this view.

## That Time GPT found a code optimization that DeepMind had to do a whole paper to find

## That time GPT did a better diagnosis than a doctor



[//begin]: # "Autogenerated link references for markdown compatibility"
[linear-representations-of-sentiment-in-large-language-models]: ./../literature-review/linear-representations-of-sentiment-in-large-language-models "linear-representations-of-sentiment-in-large-language-models"
[thinking-fast-and-slow of Kahneman]: ./../bubbles/stub "thinking-fast-and-slow of Kahneman"
[//end]: # "Autogenerated link references"