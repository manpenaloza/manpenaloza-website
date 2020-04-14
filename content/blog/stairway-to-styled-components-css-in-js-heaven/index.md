---
title: src/.../styled.js - stairway to Styled-Component's CSS-in-JS heaven
date: "2019-03-24"
description: Take a deep dive into the practical entry file to the Styled-Components library. The src/../styled.js file works hard to provide you an API that's tons of fun to work with.
tags: styled-components, react, css-in-js, css
cover_image: https://thepracticaldev.s3.amazonaws.com/i/klqejot52rsa81o17hyc.jpg
---

Using a fabulous open source library like [Styled-Components](https://github.com/styled-components/styled-components) often comes with the nice effect of appreciating what you can do with it more and more and more. If you are like me, at some point you get curious about what happens behind the (library-)scenes. I recently checked the Styled-Components Github repository to know better what's going on when using the library. As you can imagine the library does A LOT of cool things, so in the first attempt I limited my investigations to the library's *practical* entry point.

Remember, creating a styled component with the Styled-Components library is as simple as a that...

```javascript
const Button = styled.a`
    font-size: 14px;
`;
```
...or as that
```javascript
const BorderedButton = styled(Button)`
  border: 2px solid white;
`;
```
Please pay special attention to the differences of how the `styled` function is used in the examples above.
1. we call `a` as a method of the `styled` object passing it css as an argument
2. we call the `styled` function passing it the previously created styled component as an argument and add css as a next argument

So how does the library provide that exposed possibilities for us? Let's take a look.

##A CSS-in-JS holy grail named *styled*

Theoretically and taking into account Styled-Component's `package.json` information, the technical runtime entry point to the library is the [src/index.js](https://github.com/styled-components/styled-components/blob/7dd09fd595611a5805b76eab2fbae6f90877340f/src/index.js) file. But that said, the practical entry point enabling us to do all the cool things is the [styled.js file](https://github.com/styled-components/styled-components/blob/613480a612fe942d1b1298581c94122de880d65e/src/constructors/styled.js) being part of the `/src/constructors` directory. Next see what this file looks like (status 01/2019, branch master):

![Styled-Components styled.js file](https://thepracticaldev.s3.amazonaws.com/i/8hrfkganpw1qmb491ekh.png "Styled-Components styled.js file")

In a nutshell this file does the following:
- some internal imports (lines 2-4)
- one `const styled` declaration referencing a function (line 8)
- one forEach loop (lines 11-13)
- finally the export of our holy grail `styled` 🎉 (line 15)

##The styled function and its function object methods

Confused of that headline? Remember, in Javascript functions are objects! As a result developers can make use of this by i.e. adding methods to that function object. Styled-Components and the real entry point returned by `styled.js` makes heavy use of this. Line 8 shows a `const styled` declaration referencing a function, but more on that later. For now just keep in mind that a function referenced by the `styled` const was created. Now take a special look at the lines *11 to 13*.

![](https://thepracticaldev.s3.amazonaws.com/i/0qdlexyccjzdqnoeycsj.png)

**We see a forEach loop iterating an [array of defined domElements.](https://github.com/styled-components/styled-components/blob/master/src/utils/domElements.js) Each iteration attaches a method with the name of the iterated dom element to the `styled` function object.** And voilá! There it is, the first hard-working component factory attaching dom element methods to the `styled` function object like a boss. The body of each attached method is nothing else than the result of a `styled` function call returning a properly built component constructor for each dom node. Having reached this point at runtime we can already call such an attached method like this in our own codebase:

```javascript
const Button = styled.a`
    ...this will be the method argument in the form of css to the styled.a call...
`;
const Container = styled.div`
    ...this will be the method argument in the form of css to the styled.div call...
`;
```

So far we know (some kind of) what's going on when we use `styled.a` or `styled.div` in our codebases using Styled-Components. That said we've gone "half the way" to demystify what styled.js exports for us. Remember when I wrote *"Line 8 shows a `const styled` declaration referencing a function, but more on that later."*? It is that function we need to talk about more right now to demystify the other half. Here we go.

##The *styled* function: how it's constructed and distributed

*Constructed* and *distributed*? Yes!
As you can see in line 8, `styled` itself is declared as a function. It is either called directly by us developers using the **distributed** default export of the `styled` function or by calling the function object method which requires internal **construction** as described above. So in concrete this means for us:

![](https://thepracticaldev.s3.amazonaws.com/i/ix5dnqsh624jive341ac.png)

This...
```javascript
const Container = styled('div')` ...css... `;
```
and this
```javascript
const Container = styled.div` ...css... `
```
returnes exactly the same. But remember: we can conveniently use the second option in our codebase, as Styled-Components takes care of building the proper component constructor executing first option internally to add the function object method (here: `.div`).

The `styled` function takes a `tag` as a parameter and returns the result of calling the function `constructWithOptions` (line 8) which receives two arguments.
1. **a `StyledComponent` function** - 
    Have you noticed I never mentioned `React` in this post so far? Well, here we go. Let's not forget Styled-Components is part of the `React` ecosystem. As a result this `StyledComponent` argument is used to actually create a React component giving access to React *EventHandlers* and all the other cool things React does for us.
2. **the `tag` we've passed to the `styled` function** - 
   The argument is of type `Target` which is either a dom node string or an already styled component. Check [this line](https://github.com/styled-components/styled-components/blob/master/src/types.js#L16) to find the origin of how the `Target` type is defined using Flow. The `tag` argument is simply passed through to `constructWithOptions` without any modifications.

Receiving these two arguments, the `constructWithOptions()` function execution returns another function that let's us create a styled component already considering the `tag` we want to use in our codebase. Using the returned function in the most basic form, the only thing to we need to pass it is pure *css* within a tagged template literal argument. Check out [this post of Max Stoiber](https://mxstbr.blog/2016/11/styled-components-magic-explained/) in case you want to go into detail about how this part of Javascript works.

So to close the cycle of `styled.js`... Now as we know what the styled function returns and how it is distributed or used for internal construction, we also know better what the different method bodies of the `styled` function object methods do. `styled.a` works as the `styled(domElement)` execution in line 12 of styled.js **distributes** a "tag-predefined" styled component constructor to it! 🎉

![](https://thepracticaldev.s3.amazonaws.com/i/ej1oi2gi6kydqoye62y8.png)


##Thx for reading!
As you can see, `styled` provides a lot of things. On the one hand a function, on the other hand it acts as an object providing predefined methods for each dom node to build styled components. In my opinion this approach the library provides us to style our components is pure gold.

I hope this post helps you to better understand what styled.js does and how it exposes stuff we can use. Please note all information is based on the Styled-Component's master branch by Jan 2019. In case there'll be changes I don't notice, feel free to contact me in order to update this post.