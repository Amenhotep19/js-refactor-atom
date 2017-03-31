JS-Refactor
===========

JS Refactor is a Visual Studio Code extension for adding a few useful refactorings to help speed development and
reduce the time a Javascript developer has to spend performing repeated actions. It may only take a few extra
seconds to do these things by hand, but those seconds add up quite quickly.

JS Refactor has two key components: automated refactorings and code snippets.

## Installation

Open VS Code, press F1 and enter `ext install jsrefactor`

For early release access prior to deployment to the Visual Studio Marketplace, this extension can be downloaded
and side-loaded into your editor.

## Updates

## Automated Refactorings

**Basic usage:** Press F1 and type `JS Refactorings` to select from a list of all refactorings

**Alternative options:** You can also press F1 then simply type the name of the refactoring and press enter
if you know the name of the refactoring you need. Finally, there are hotkey combinations for some of the most common
refactorings you might want.

JS Refactor supports the following refactorings (explanations below):

- Convert To Member Function
- Convert To Named Function
- Export Function
- Extract Variable
- Inline Variable
- Negate Expression
- Reformat Code
- Rename Variable
- Shift Parameters Left
- Shift Parameters Right
- Wrap in Arrow Function
- Wrap in Async Function
- Wrap In Condition
- Wrap In Executed Function
- Wrap in Function
- Wrap in Generator
- Wrap in IIFE
- Wrap in Try/Catch

### Keybindings

- Rename - alt+shift+F2
- Reformat Code - ctrl+shift+t

### Usage

Select the code you wish to refactor, right click to open the context menu and select the refactoring from the menu.

### Explanations

**Convert To Member Function** Converts a named function to a member function for an object prototype definition.

**Convert To Named Function** Converts selected anonymous function assignment or member function declaration and converts it into a named function declaration.
Convert to named function only searches the first line of your selection and will only convert one function at a time.

**Export Function** creates new export declaration for selected function or function name

**Extract Variable** Creates new assigned variable declaration and extracts repeated values.

**Shift Parameters Left** Shifts all selected parameters to the left

**Shift Parameters Right** Shifts all selected parameters to the right

**Wrap In Condition** Wraps selected code in an if statement, adding indentation as necessary

**Wrap In Executed Function** is an extra step on top of wrap in function.  Instead of simply wrapping your selected code
in a new function declaration, JS Refactor encloses your code in a named function and immediately executes the
new function on the next line.  This makes the "extract method/function" refactoring trivial to implement since
the only work needed is to move the new function to an appropriate location in the code.

**Wrap in function** takes your selected code, at line-level precision, and wraps all of the lines in a named function.

**Wrap in IIFE** wraps selected code in an immediately invoked function expression (IIFE).

## Snippets

JS Refactor supports several common code snippets:

- Anonymous Function (ranon)
- Arrow Function (arrow)
- Async Function (async)
- Condition Block (cond)
- Console Log (log)
- Export statement -- single variable (export)
- Export statement -- object literal (exportObj)
- Function (rfn)
- Generator (generator)
- Lambda function (lfn)
- Immediately Invoked Function Expression (iife)
- Member Function (mfn)
- Prototypal Object Definition (proto)
- Require statement (require)
- Try/Catch Block (tryCatch)
- Use Strict (rstrict)

### Usage

Type the abbreviation, such as fn, in your code and hit enter. When the snippet is executed, the appropriate code will be
inserted into your document. Any snippets which require extra information like names or arguments will have named
tab-stops where you can fill in the information unique to your program.

### Explanations

**anon** Inserts a tab-stopped anonymous function snippet into your code

**export** Adds a module.exports single var assignment in your module

**exportObj** Adds a module.exports assignment with an object literal

**fn** Inserts a tab-stopped named function snippet into your code

**lfn** Inserts a tab-stopped lambda function snippet into your code

**iife** Inserts a new, tab-stopped IIFE into your code

**mfn** Inserts a new color-delimited member function to your prototype -- Protip be inside a prototype object when using this.

**require** Inserts a new require statement in your module

**strict** Inserts 'use strict' into your code

### Contribution Rules and Guidelines

JS Refactorings is open to pull requests for everything from code to documentation.  As with any project, there are certain
needs which must be addressed.  JS Refactorings is, at its core, still in development. Since it was built on an early version
of Visual Studio Code, so there is a fair amount of code that was originally exploratory in nature. In its current state,
JS Refactorings is fully tested and behaviors are vice-tested into place.  Going forward, code will be cleaned and, itself,
refactored, so a style guide is going to be relatively fluid.

Nevertheless, following are the required elements of a good pull request:

- **Code updates must be covered by a test.**
- **Code must follow existing standards as they are available.**
- **All existing behaviors must continue to function as designed.**
- **All tests must continue to pass. Any pull requests with failing tests cannot be accepted.**
- **Pull request must explain changes which are made, referring to an issue number as available.**
- **Pull requests may not be claimed as intellectual property of a company or other external agency.**
