---
title: "Gatsby Themes, Gatsby Starters 🤔 - what's the difference and what to use"
date: "2020-04-046T12:50:03.284Z"
---

# Gatsby Themes, Gatsby Starters 🤔 - what's the difference and what to use

When I started to build a website using GatsbyJS for the first time, I stumbled upon the terms `Gatsby Themes` and `Gatsby Starters`. In case you've ever built a website using Wordpress or other website building systems, the terms `themes` or `starters` might sound familiar to you, and mostly it was quite clear what `themes` or `starters` did. They provided boilerplate, functionality- or system-related, to bootstrap your project, named either `themes` (most common if you think about Wordpress) or `starters`. In GatsbyJS however, these terms BOTH appear in the GatsbyJS ecosystems and, they have a different meaning. Upfront, both can do everything doable in a GatsbyJS project, meaning both could provide:

- initial design and styles
- initial plugins functionality
- initial pages generator and website sections logic

But there are differences, essential differences. Those primarily deal with the future of your GatsbyJS project.

## Gatsby Starters - get started very quickly (and then be on your own)

Coming from a Wordpress or similar website building system, `Gatsby Starters` most likely is the GatsbyJS feature that most likely fulfills your imagination of what a Wordpress theme does. Using the GatsbyJS CLI to init a starter project, they provide a project starting point, including styles and functionality, to get started with GatsbyJS development VERY quickly. But that's it. Mentioning this means pointing out the fact that keeping your `Gatsby starter` dependencies and `Gatsby starter` updates solely depends on you as a developer. In case you're familiar with the `create-react-app` React application bootstrapping helper, compare `Gatsby Starters` with an eject action of a `create-react-app` project.

To summarize, think of _Gatsby Starters_ like:

- you fork a git repository and you and your code changes make the repository grow and evolve
- you create a `create-react-app` application, eject it, and elaborate application core updates and further developments on your own

## Gatsby Themes - get started more comfortable (and then benefit from theme updates)

Think of it as a `Gatsby Starter`, but with the long-term benefit of updates regarding everything the theme provides. Compared to `Gatsby Starters`, this is possible because a `Gatsby Theme` is attached to your project as Gatsby plugin being registered in the `gatsby-config.js` file! So a `Gatsby Theme` can do anything to your project a `Gatsby Starter` project and provide, but - as `Gatsby Themes` are node modules - they provide the benefit of keeping itself update in case new versions of the theme are published and updated in your project.

We all know, that modifying functionality a node module (what a `Gatsby Theme` is) provides, can be tricky in terms of losing modifications. So a rule of thumb - like for all node modules, don't touch and modify the theme itself within node_modules. Those adjustments will be lost once you update the `Gatsby Theme` within your node_modules. For luck, GatsbyJS provides a way on how to extend and modify the theme. That way requires your code structure to follow conventions. The conventions lead to the effect that your own modifications "hook-in" during build time and override the theme. Either in terms of site-building functionality or style-related. That just depends on what the theme does to your GatsbyJS project and what you want the theme to (not) do to your GatsbyJS project. An example:

---

A `Gatsby Theme` comes with the following file, implementing a blue background to your site header:

```javascript
src / components / header.js
```

If you want the background to be red, modify your own GatsbyJS project with the following nested directory setup:

```javascript
src / %themeName% / components / header.js
```

--

Note that what I've marked in between the %-symbols has to be replaced with the name of the `Gatsby Theme` you use. From now on, whatever you do in your own `header.js` fill will overwrite what the `header.js` of the `Gatsby Theme` file does, which is cool 🚀! Making sure you adjust changes to the theme this way, also makes sure you're on the safe side if it's about to update the theme (plugin). Once you update your theme via npm or yarn, your updated theme will make sure you use the latest modifications of the functionality it provides. Still, your own modifications in your GatsbyJS project will consist 🎉.

## In retrospect, both are great GatsbyJS starting options but be aware of the essential differences

If you consider GatsbyJS as the way to go for your next project, definitely consider either taking a `Gatsy Starter` or a `Gatsby Theme` as your starting point. But before bootstrapping your project, take into account your long-term development strategy to decide on whether to go with a Starter or a Theme. To not leave you alone with an "it depends" summary, I'd assume that going with a `Gatsby Theme` as a starting point is the better way. Simply said because it ensures your project will benefit from dependency updates the theme handles for you. But especially be aware that going with a `Gatsby Theme` requires you to take into account more thoughts about the file structure of your project compared to just bootstrapping a whole `Gatsby Starter` repository.

Note that what is described in this post is very much a brief overview of the differences between `Gatsby Themes` and `Gatsby Starters`. If you want more in-depth knowledge, make sure you find 10 minutes of your time to read the [Plugins, Themes, & Starters page](https://www.gatsbyjs.org/docs/plugins-themes-and-starters/) of the official Gatsby documentation. It will provide a detailed explanation of the differences and how to use GatsbyJS using either a `Gatsby Theme` or a `Gatsby Starter`.
