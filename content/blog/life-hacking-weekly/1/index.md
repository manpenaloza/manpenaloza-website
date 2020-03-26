---
title: 'Life Hacking Weekly #1'
date: "2020-03-26T12:50:03.284Z"
---

Upfront: This post is part of a `Life Hacking Weekly` series I started and explained in this [initial post](../index.md). The main idea is to ensure learning progress dealing with (independent) things taken out of life and profession.

## TECH: `git rebase`, a powerful tool that barely causes problems ;)

Recently I came across the situation to merge the last two git commits of a website I work on. As I wasn't aware of how to solve this properly, a Google search forwarded me to this [Stackoverflow page](https://stackoverflow.com/questions/2563632/how-can-i-merge-two-commits-into-one-if-i-already-started-rebase). In summary, the given answers that seemed most relevant to me suggested two ways to solve this:

1. Use `git reset` and `git commit` with specific flags
Use the following two commands to combine  two commits into one commit:
```bash
git reset --soft "HEAD^"
git commit --amend
```
At first, `git reset` is used combined with the `--soft` flag. This causes a reset of ONLY the `HEAD` git tracks. On the opposite, if using `git reset` with the `--hard` flag (well known, if you want to discard all changes since the last git commit), git resets the `HEAD,` but also the `index and the working tree`!

Important **note** on this way of solving it: You can merge as many commits as you want, as long as they are the last `X` commits, and not somewhere in the middle. Just run 
```bash
git reset --soft HEAD~10
```
 where 10 is the number of commits, you want to merge.

2. Use `git rebase` interactively
As I wanted to merge the last two commits into one commit, I had to execute this rebase action.
```bash
git rebase --interactive HEAD~2
```
** `git rebase` is the git program executed

** `--interactive` or `-i` is the program flag to execute in interactive mode

** `HEAD~2` tells the rebase process, to consider the last two commits based on the HEAD (a pointer referencing, in example, the last commit of a branch)

This will bring up an editor providing the possibility to *interact*. Within the editor, you'll find the two commit messages with the word `pick` prepended. Instead of the word `pick` (which is something like a rebase action), you can insert different options to continue the rebase process after the interactive view is saved and closed.

```git
pick = use commit as it is
reword = use commit, but edit the commit message
edit = use commit, but stop for amending
squash = use commit, but meld into previous commit
fixup = like "squash", but discard this commit's log message
```

As I wanted my previous commit to merge with the most current commit, I replaced the `pick` with a `fixup`, saved, and closed the file. Once done, the command line will log something like "Rebase done successfully." 🎉

## TECH: building an "enterprise architecture" architecture using `create-react-app`
TBA