---
title: Understanding Javascript Promises - a short story
date: "2019-03-24T22:12:03.284Z"
description: Understanding Javascript promises can be a little tricky. Let's make a short story taken out of life to show how Promises work.
tags: javascript
---

You and your girl-/boyrfriend (in my case: girlfriend) go to the cinema. When about to pass the ticket control, this is what happens:

1. Two persons are before us in the queue, so they show the tickets enter the cinema
2. When I want to enter the cineme, my girlfriend still is not here with the tickets. So I promise the controller that there will be tickets in a few seconds.
3. As the cinema queue should move on (and thus stay asynchonous, just like javascript), the person behind me can enter the cinema
4. My girlfriend comes and has the tickets, yes! But she tells me that she wants popcorn. I promise, to get here some.
5. When I come back with popcorn (she's already holding the tickets), she tells me she also wants salt on it. I promise, to get here some.
6. When I come back with salty popcorn, we realize we have everything we want. We can go in and watch the movie!

```javascript
console.log("Person 1 enters cinema with the ticket")
console.log("Person 2 enters cinema with the ticket")

const promiseMyGirlfriendHasTheTicketsAndSheWillComeSoon = new Promise(
  (res, rej) => {
    setTimeout(() => {
      res(["tickets"])
    }, 2000)
  }
)

const butGirlfriendWantsPopcorn = promiseMyGirlfriendHasTheTicketsAndSheWillComeSoon.then(
  (tickets) => {
    console.log("Girlfriend: I have the tickets, can you get me some popcorn?")
    return new Promise((res, rej) => {
      setTimeout(() => res([...tickets, "popcorn"]), 3000)
    })
  }
)

const butGirlfriendWantsSaltOnPopcorn = butGirlfriendWantsPopcorn.then(
  (ticketsWithPopcorn) => {
    console.log("Me: I've the popcorn. Can we go in?")
    console.log(
      "Girlfriend: Hmm, but I'd also like to have some salt on it :)..."
    )
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([...ticketsWithPopcorn, "salt"])
      }, 3000)
    })
  }
)

butGirlfriendWantsSaltOnPopcorn.then((ticketsWithPopcornAndSalt) => {
  console.log("Me: Ok, I also have the butter.")
  console.log(
    "Girlfriend: So we've got everyting: \n",
    ticketsWithPopcornAndSalt,
    "\n"
  )
  console.log("Me: 🎉 Let's go in!")
})

console.log("Person 4 enters cinema with the ticket")
```

This way of learning about Promises is taken from this awesome [Youtube tutorial by techsith](https://www.youtube.com/watch?v=IGoAdn-e5II&t=1032s).
