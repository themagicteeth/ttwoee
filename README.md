# Tale of Two Wastelands: Over-Encumbered Edition

## About

TTWOEE is a modding guide for Tale of Two Wastelands.

## TTW 2.9.4b

Originally the guide was written for TTW version 2.9.4b.
Many of the mods used are no longer compatible. The guide
is now being rewritten for the new version (3+).

The old code for can be found in the `ttw-2_9_4b` directory,
and requires no build steps.

## TTW 3+

The new version has been rewritten using the JavaScript library
Pug. This is so it can be built into pure HTML and CSS without
a large amount of JavaScript dependencies for the client.

The new guides source code is found in the `ttw-3` directory. The `dist`
folder contains the pre-compiled website, and the `src` directory contains
the source code.

## Work on TTWOEE

You will need `Git` and `yarn` Node package manager installed.

Clone the repository: `git clone https://github.com/themagicteeth/ttwoee.git`

From the `ttw-3` directory, install the dependencies: `yarn install`

To see any changes made, run `yarn build`. This will compile the Pug templates
and minify the CSS, and is viewable in any browser.

## Project structure

`index.pug` is the base layout, and where all of the sections are sourced to generate the complete page. Unless a new section is being added this should not need to be changed.

`style.css` is where any new CSS styles are added.

The `includes` folder is where the Pug templates for all of the sections are. Mods are broken up into a few mmixins, to provide flexibilty in adding their data.

Mods follow the following structure, note that the `ini` and, `important` templates can be used as shown below to use colored headers for instruction blocks:

```pug
//-
    Mods name
        - All mods must have a comment with their name and updated date
    Updated 2019-03-22
//-
+mod
    +author Author name
    +version Mod version number
    +installation Basic installation instructions
        pre.raised
            | More
            | Detailed
            | Instructions

        div.raised
            +important This is an important instruction
                pre.mb0
                    | Blah blah IMPORTANT
    +notes Notes about the mod
```

Copy blocks follow this structure, sections must have a unique id:

```pug
 div#example
        h3.section-header Example
        div.copy-bg
            p
                | The copy text

```

## Notes

The version 3 of the guide is still under heavy development, and is not finished.

The layout of the project structure will change as the project gets more mature.
