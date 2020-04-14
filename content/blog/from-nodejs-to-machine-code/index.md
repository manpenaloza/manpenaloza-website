---
title: From NodeJS-based Javascript to machine code ⚭ C++ code compilation for fans of the NodeJS programming language
date: "2020-03-13"
---

![](./hero.jpg)

Not a single minute in my whole life I've spent actively learning C++. Yet I post an article about C++ code compilation? Doesn't sound like it would make a lot of sense, but let me tell you this: I love and use NodeJS regularly! Once you dig deeper behind the scenes questioning "How does NodeJS actually work?", you'll find the fact that NodeJS heavily depends on C++. Why? C++ offers functionality to NodeJS and finally is responsible to create the machine binary based on the Javascript we write so computers understand and process our code as we intend it to do. The upcoming explanation starts from the moment of the transpiled C++ code resulting from the Javascript we write in the NodeJS world.

# From preprocessing to machine code

## 1. NodeJS to C++ translation

To make NodeJS-based Javascript useable, it requires a "simple" step upfront: massively intelligent parts of the NodeJS runtime environments make sure all code gets translated correctly to the C++ code. Doing so, NodeJS primarily does two things:

- Code transpilation (translation) from NodeJS-based Javascript to C++
- Connecting library adapters to ensure all C++ libraries used for NodeJS work properly

## 2. Preprocessing

Our transpiled C++ code gets preprocessed. In this first stage of C++ code compilation, the compiler will go through our code and evaluate it. It will consider code like `#include`, `#define` or `#if` statements. Taken the mentioned example of preprocessing an `#include` operation in C++, the compiler will simply take the contents of the included file and paste it at the place of the `#include` statement. To see the result of preprocessed C++ code, Visual Studio offers a cool feature to output and see what the C++ compiler preprocesses (files with the .i ending). Taking a closer look at the **preprocessed `.i`** files, you’ll see the included code resulting from C++’ `#include` functionality.

The very same happens for the C++ `#define` functionality. So if the preprocessed C++ code assigns a value to a defined variable, the compiler will simply insert and paste the value or pointer instead.

## 3. Abstract Syntax Tree (AST)

Based on the preprocessed code, the compiler will create a **more useable version of the preprocessed code** in the form of an **abstract syntax tree (AST)**. An AST is a structured way of representing our code including tons of meta info, i.e. function callee initiators or data types. To get a better picture of what an AST is, check out astexplorer.net and check the result of your inserted example code either in the form of a `tree` (own AST format) or in the form of a simple well-known object.

## 4. C++ Translation Units

Our C++ code evolves and we come closer to finally get machine code the computer can understand and execute. As a next step, the compiler creates **object files with the file ending .obj** for all **translation units** (the compiled/preprocessed .cpp files). If one .cpp file includes other .cpp files, this will end up in one single translation unit. If multiple .cpp files get compiled separately without including each other, this results in multiple translation units and thus multiple .obj files. And here’s the moment we've been waiting for: **an object file is already machine code computers can execute** 🎉.

To get a better idea of what the machine code does on our computer, use the **"Assembly only listing"** option Visual Studio provides. This will generate compilation output files with a .asm file ending. Observing those files you’ll get a human-readable result of what the machine code does on your CPU. Those files include low-level **Assembly** instructions like `imul`, `mov`, or `push`.

## 5. Performance maximum (optional)

Mostly our handwritten NodeJS code (as a result also the compiled C++) isn’t 100% speed-/efficiency-optimized. Thus the C++ compiler offers the possibility to **go for 100% performance maximum** when compiling the machine code. These optimizations can be things like the elimination of unneeded variable declarations when the ‘direct way’ of code execution is shorter and less resource-consuming. Also, a pre-calculated value caused by statically used numbers (i.e. usage of `5 * 2`, which is a static 10) can be the result of such a performance optimization compiler activity.
