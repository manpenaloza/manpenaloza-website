---
title: What are those PeerDependencies in a NodeJS project?
date: "2019-04-13T22:12:03.284Z"
description: PeerDependencies, one of the terms that brought up confusion to my mind when I first got the PeerDependency warning in my terminal. In this blog post I'll write down what I found out about NodeJS PeerDependencies in a way that also might help others to better understand this topic.
cover_image: 
tags: npm, nodejs, javascript
slug: what-are-those-peerdepenedencies-in-a-nodejs-project
---

*PeerDependencies*, one of the terms that brought up confusion at least to me when I got a PeerDependency warning in my terminal like the following:

![alt text](https://thepracticaldev.s3.amazonaws.com/i/3saoi2jo707mx6uzzqrg.jpg "NPM peer dependency warning")

[Recent happenings about a malicious code attack in a node package](https://github.com/dominictarr/event-stream/issues/116) that heavily include the topic of PeerDependencies finally made me that curious about this topic to start some deeper investigation about how PeerDependencies work. In this blog post I'll write down what I found out about NodeJS PeerDependencies in a way that also might help you to better understand this topic.

Searching for `"What are peer dependencies"` using Google - of course - returns some results. Nevertheless none of the main references Google returned made me understand PeerDependencies in way I was satisfied with. After some time I found this [Stackoverflow Page](https://stackoverflow.com/questions/26737819/why-use-peer-dependencies-in-npm-for-plugins/34645112#34645112) including a great PeerDependency explanation of [Stijn De Witt](https://stackoverflow.com/users/286685/stijn-de-witt). His explanation came quite close to a version that made me understand the basics of PeerDependencies and brought up some imaginary "Aha!" moments  (Thank you Stijn!). But somehow and as I am more a visual learning type Stijn's "text-driven" Stackoverflow explanation did not bring up that imaginary last-mile satisfaction for me in terms of understanding PeerDependencies. As a result I draw some code around his explanation (you can see quoted below) and suddenly things became more clear to me.

## What's the problem?

Upfront: in the upcoming example, `JillsModule` will be the tricky part (subsequently the PeerDependency) of the process. That's why I added fictional version appends (@1.0, @2.0) when using it.

> Let's say we are building `OurCoolProject` and are using `JacksModule` and `JillsModule@2.0`. Also let's suppose that `JacksModule` also depends on JillsModule, but on a different version, say `JillsModule@1.0`. As long as those 2 versions don't meet, there is no problem. The fact that `JacksModule` is using `JillsModule` below the surface is just an implementation detail. We are bundling `JillsModule` (as the code uses 2 different versions, but not related to each other (!)) twice, but that's a small price to pay when we get stable software out of the box.

In code this means something like

```javascript
// OurCoolProcject.js

import JacksModule from 'jacksmodule';
import JillsModule(@2.0) from 'jillsmodule(@2.0)';

const OurCoolProcject = () => {
    // do some stuff with JacksModule
    // do some stuff with JillsModule(@2.0). stuff won't break as we have the compatible @2.0 version of JillsModule available in this scope.
}

export default OurCoolProject;
```

```javascript
// jacksmodule.js (an npm module)

import JillsModule(@1.0) from 'jillsmodule(@1.0)';

const JacksModule = () => {
    // do some stuff with JillsModule(@1.0). stuff won't break as we have the compatible @1.0 version of JillsModule available in this scope.
}

export default JacksModule;
```

But next this dependency relationship gets more tricky.

> Now let's suppose that `JacksModule` exposes its dependency on `JillsModule` in some way. It accepts an `object instanceof JillsClass` for example... What happens when we create a `new JillsClass` using version 2.0 of the library and pass it along to `jacksFunction` (that excepts the 1.0 version as we know!)? All hell will break loose! Simple things like `jillsObject instanceof JillsClass` will suddenly return `false`, because `jillsObject` is actually an instance of another `JillsClass`, the 2.0 version.

In code this means something like this:

```javascript
// OurCoolProcject.js

import jacksFunction from 'jacksmodule';
import JillsModule(@2.0) from 'jillsmodule(@2.0)'; // node resolves to OUR dependency of JillsModule which is 2.0!

const OurCoolProcject = () => {    
    const jillsObject = new JillsModule(@2.0).JillsClass;

    // next the beginning of all evil, we'll pass a jillsObject of version 2.0
    // to jacksFunction (that would expect jillsObject of version 1.0 🤦‍♀️)
    jacksFunction(jillsObject); 
}

export default OurCoolProject;
```

```javascript
// jacksmodule.js (an npm module)

import JillsModule(@1.0) from 'jillsmodule(@1.0)';

const jacksFunction = (jillsObject) => {
    // make sure jillsObject is compatible for further usage in this function
    const jillsObjectRocks = jillsObject instanceOf JillsModule(@1.0).JillsClass;
            // └─> 🔥🔥🔥 `jillsObjectRocks` will be a big, fat FALSE
            // as the JillsModule dependencies actively used in this function and
            // passed to this function differ in versions (1.0 vs. 2.0) 🤦‍♀️
    ...
}

export default jacksFunction;
```

Do you notice what's going on here? `jacksFunction` receives an incompatible `jillsObject` as the object was constructed from JillsModule(2.0) and not from JillsModule(1.0) `JacksModule` is be compatible with. So far, *this only shows the problem* that in the worst case, leads to non-working software.

## How PeerDependencies solve this problem

Luckily npm has some built-in intelligence trying to solve this. If JacksModule declares JillsModule(@1.0) as a PeerDependency, npm can warn the user about this when installing dependencies of your project. So JacksModule's `package.json` should include this declaration:

```javascript
{
  "name": "JacksModule",
  ...
  "peerDependencies": {
    "JillsModule": "1.x"
  },
  ...
}
```

So npm's PeerDepenedency intelligence basically triggers a console output notifying us developers with a warning saying this:

*"Hey, this is JacksModule speaking here. Let me tell you: I need this specific package of JillsModule, but I really need the version that is part of my JacksModule project and listed in my package.json file. So please make sure it's installed and make sure it's not some other version of JillsModule you might have installed for your own usage somewhere else in your application."*

So in the end - thinking this further - depending on npm packages that require PeerDependencies can be tricky. In case you need a new version of the package X for separated usage in your application this might lead to problems if another dependency you use in your application has a PeerDependency on another version of package X. If this pops up - and in the worst case also leads to problems with your software - you are on your own to decide which package to use or which code maybe needs refactoring to meet all requirements.

I hope those explanations and code examples made sense for you and closed the last thought gap you've had about PeerDependencies. If you've questions or want to suggest some article optimization, feel free to contact me or leave a comment.
