# Contextual Content Editor - Exploration

This repo was originally created to explore and prove out an alternate approach to the traditional What-You-See-Is-What-You-Get (WYSIWYG) HTML editor. 

The classic WYSIWYG approach to editing HTML is its singular focus on how the content will be displayed. Unfortunately this approach fails to acknowledge the hierarchical nature and rich contextual data supported by HTML.

The aim of this exploration (in code) was to prove out an alternate type of HTML editor where the hierarchy and contextual data (like element attributes) remained visible to the content creator. Similar HTML editors already exist and are often categorized as What-You-See-Is-What-You-**Mean**.

## How far did you get?

The code in this repo currently does the following:
  1. Converts a common `<TEXTAREA>` into an custom HTML editor interface.
  2. The custom editor allows block elements to be created via the "Enter" key.
  3. The custom editor introduces several keybindings to convert the block element from a `<P>` to another block element type.

Some unfinished/broken features also include:
  1. Adding inline elements (like `<EM>` and `<STRONG>`).
  2. Copying and pasting rich text without introducing unwanted formatting.

## Why did you stop development?

This code study and similar projects out there have provided some insight into how one might approach and HTML editor framework. However, I ultimately determined that my particular concept needed to be rethought some before diving back into the code.

## What's next?

My interest in developing an HTML editor that prioritizes the structure and context of the content (over its display) continues. The next phase will be to document and collect feedback on some concepts and interface ideas.

I am very interested in what others may be working on in this space and would love to collaborate.
