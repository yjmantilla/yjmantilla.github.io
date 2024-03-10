---
title: Reverse Engineering of Human Brain for the field of Artificial Intelligence - Parikshit Gupta
authors: ["Parikshit Gupta"]
year: 2020
publisher: "International Journal of Engineering Research & Technology (IJERT)"
keywords: ["Reverse Engineering of Human Brain", "Artificial Neural Networks(ANN)", "Convolutional Neural Networks(CNN)"]
research_type: "Review"
relevance: "Unknown"
sourceurl: "https://www.ijert.org/reverse-engineering-of-human-brain-for-the-field-of-artificial-intelligence"
doi: "10.17577/IJERTV9IS050169"
status: "read-done"
---

This document holds my observations for the paper:

```yaml
Reverse Engineering of Human Brain for the field of Artificial Intelligence

Author: Parikshit Gupta

URL: https://www.ijert.org/reverse-engineering-of-human-brain-for-the-field-of-artificial-intelligence
```

## The author

Parikshit Gupta is a software developer from Mumbai with machine learning knowledge. So far (December 2021) he has only published the discussed paper.

You can find him on twitter as [Anonymous07P](https://twitter.com/anonymous07p).

## TLDR

This article mainly discusses how the results of "reverse engineering" the brain have permeated towards AI, and in particular Artificial Neural Networks (ANNs) and Convolutional Neural Networks (CNNs); along with some comparisons regarding the differences betweens these networks and Biological Neural Networks.

## Introduction

- Defines "Reverse Engineering" (the citation is a bit dated as it is from the 90s).
- Some context of reverse engineering in software. It is not clear why such context is important for a paper in the AI field, I guess it follows from his background in software development.
- [[biomimicry]] to defend the case of reverse engineering the brain to advance AI.
- Some intro to the scale and structure of the brain as a network of neurons.
- Author mentions that "by reverse engineering neuroscientists have
been able to understand the brain to a pretty good extent". I think this is debatable as from what I know we are only a surface understanding.
- Follows the idea of "doing-before-knowing" at some point. Basically that one can build something without understanding how it works (ie building planes before understanding how birds fly). I have heard this argument to from the professor Alvaro Gaviria ("El Mazo", UdeA) too... although he phrased it as "se puede porque se pudo" (it can be done because we could) and he contextualized it as a fundamental difference between the engineering and science approach. Similar perspectives [can be found randomly on the internet](https://www.reddit.com/r/MachineLearning/comments/cs9j5i/comment/exe18d1/). I think this topic ([[building-before-knowing]]) would make a good discussion on epistemology.
- Ends the intro by shortly defining ANNs and CNNs.

## Reverse engineering of the human brain

This part is divided in two sections. Overall it is really basic and may be skipped for someone already familiar with neurobiology.

### Working of the human brain

- Some discussion on the [[connectome]], its importance, usefullness, and possible making.
- Argues for a modular structure of the brain (as it having specialized parts for particular tasks). This is debatable ( [[modularism-vs-holism-in-neuroscience]] ).
- There is a prevalent view of the [[brain-as-a-computer]] :

>For learning and performing task we need data be it the case of human brain or any machine-based algorithm. Human brain gets these data through five senses: Taste, Touch, Locate, Notice, and Hearing. These sources provide frequently numerous data at one time. The brain collects all these data and stores the important parts into our memory. Depending on the data received it reacts in various circumstances by controlling various functionalities of our body like heart and breathing rates.

Despite the simplification of [humans having only 5 senses](https://www.sciencefocus.com/the-human-body/how-many-senses-do-we-have/), the idea is understood... basically senses=sensors that collect data. I think it would have been nice to acknowledge the [[brain-as-a-computer]] paradigm it takes for granted.

- Views the neuron as the smallest processing unit.

- The author gives a high-level abstraction of the human brain reminiscent of an input/ouput model but using receptor and effector terminology and with feedback loops.

![](/images/reverse-engineering-of-human-brain-for-the-field-of-artificial-intelligence-parikshit-gupta/2021-12-27-01-22-49.png)

>image from the aforementioned article, CC BY 4.0

### Working of the Biological Neural Network

This part basically is a collections of fundamentals of neurobiology: neurons,soma,dendrites,axons,action potential, etc.

Although not explicitly mentioned, it refers to the hebbian learning principle when explaining how neurons learn.

It ends with the idea of layers of neurons.

## Advances In Computer Science As A Result Of Reverse Engineering The Human Brain

In my view, this is the most important part of the article. First, it remakes the case for [[biomimicry]] and then presents three sections, regarding the influence of brain's reverse engineering on AI, ANNs and CNNs.

### Artificial Intelligence(AI)

This is the weakest section of the three as the subject matter is too broad. Overall is just a recapitulation of [[biomimicry]], [[brain-as-a-computer]]  and a model of an agent immersed in an environment with whom he interacts.

### Artificial Neural Networks(ANNs)

- It clarifies that the artificial neuron is loosely based on the animal neuron.
- Has an interesting interpretation of the weights from one of the cited papers:

>The processing ability of the network is stored in the interunit connection strengths, or weights, obtained by a process of adaptation to, or learning from, a set of training patterns.

- Then the author explains some basics of ANNs, their types, the fundamental training algorithm,etc.

- Ends with the real discussion of the paper:
    - ANNs can be thought of as disentangled models of the BNNs.
    
    - For researchers interested in the brain ANNs should try to capture the "data handling highlights" of BNNs.
    - For engineers this constraint is not that important.
    - The parallel processing nature of ANNs, is interesting for engineers.

### Convolutional Neural Networks(CNNs)

I think this last section is the most interesting of the whole paper.

- Defines (in suggestion of a cited source) the CNNs as "a specialized ANN for processing data that has a known grid-like topology".

- Then, some similarities are drawn between CNNs and the [[primary-visual-cortex]] (PVC) and the [[inferotemporal-cortex]] (ITC). See the paper for more clarification as I couldnt summarize it as I dont yet understand it fully. What i took is that the CNN:

    - Has 2D maps as features, similar to the PVC (source?)
    - Its neuron units imitate the spatially localized receptive field of the PVC. I guess at least in some of the artificial layers.
    - Apparently those neurons also are a linear function of the image projected to them (not exactly sure why though?), and supposedly this is similar to the PVC.
    - Cross channel pooling (idk what that is) allow for invariance against linear shifts. Somehow this imitates the PVC too.
    - The Fully Connected Ouput Layer (FCOL) imitates the ITC.
    - Apparently the info goes through many layers reminescent of the PVC and then ends with the FCOL as the ITC.
    - The ITC seems to collect information from ALL of the neurons just before it. Thus inspiring the FCOL.

- After the similarities, goes on with the differences:
    - The main one, is that CNN is mostly about spatial features. The temporal dimension is not accounted for, which the brain do incorporate. He argues combining CNNs and RNNs into a network supporting spatiotemporal features would be fruitful.
    - The brain also incoporates and connects information from other senses, not only visual info.
    - The other similarities exist on the spatial side, even though is the one being imitated:
        - Human eye is low res (except for the fovea). Not accounted for in CNNs
        - No context/scenario awareness for the CNNs, which the brain does.
        - No feedback loops, which are really common in BNNs.

- Finally, the author restates that CNNs are mainly for grid-like data and that they are scalable; making them great for image-based problems. There is a lot of inspiration from the brain, but still lots of differences and possible ways to incorporate more ideas from the brain.

- I feel that this section is missing a lot of relevant literature that could have traced the provenance of these primordial claims; as they constitute the real substance of the paper.

## The conclusion of the author

The conclusion is somewhat shallow when compared to the last section. Basically, a lot done, very useful and lots of things to explore in the neuro-ai area.

## The references

I think the paper could have explored more references, in example:

- Neuroscience-Inspired Artificial Intelligence, Demis Hassabis et al, 2017.












[//begin]: # "Autogenerated link references for markdown compatibility"
[biomimicry]: ./../bubbles/biomimicry "biomimicry"
[building-before-knowing]: ./../bubbles/stub "building-before-knowing"
[connectome]: ./../bubbles/stub "connectome"
[modularism-vs-holism-in-neuroscience]: ./../bubbles/modularism-vs-holism-in-neuroscience "modularism-vs-holism-in-neuroscience"
[brain-as-a-computer]: ./../bubbles/brain-as-a-computer "brain-as-a-computer"
[brain-as-a-computer]: ./../bubbles/brain-as-a-computer "brain-as-a-computer"
[biomimicry]: ./../bubbles/biomimicry "biomimicry"
[biomimicry]: ./../bubbles/biomimicry "biomimicry"
[brain-as-a-computer]: ./../bubbles/brain-as-a-computer "brain-as-a-computer"
[primary-visual-cortex]: ./../bubbles/stub "primary-visual-cortex"
[inferotemporal-cortex]: ./../bubbles/stub "inferotemporal-cortex"
[//end]: # "Autogenerated link references"