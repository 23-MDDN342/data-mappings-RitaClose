[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HpplOQZx)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14993370&assignment_repo_type=AssignmentRepo)
## 2024 MDDN342 Assignment 3: Data Mappings

REPLACE ALL TEXT IN THIS FILE

This README should be used to document your design.

15/05
I am not a fan so far. Object Oriented coding is difficult and I don't entirely understand it. So far I have imported my characters face into the new code framework but the variables aren't working right so far so I need to tinker a bit to make them better. Also I need to re-orient all of the measurements so that they follow the faces from the AI instead of keeping the same all the time.

https://23-mddn342.github.io/data-mappings-RitaClose/ 

16/05
Today I got the tilt and the jaw drop to work, I am going to do the eyes and fix the neck before I move on to training the system then adding in some of the conditional variables and attributes.

21/05/2024

Below are the variables I have so far, they may change, especially the eyes because I think it's actually quite difficult to determine eye colour from the training photos and everyone's eyes just look brown. I chose to do the colour of the face based on hair colour, I was thinking about doing it based on the colour of their shirt but quite a few of the photos you can't see what colour it is. I have added the neck back in because the head just looks like it's floating weirdly if it's not there. The training I've done so far is only about 20 people so that's next on the list I think.

sideTilt = Horizontal tilt of face
jawDrop = How much the mouth is open
eyeTilt = Degree of eyebrow raise

base(face)Colour = Hair Colour
eyeColour = eyeColour

Hair Length for Horns 
Scale Type for Masculine/Feminine

Draw Eyes with Specific Points
- age for a variable? eye colour?

- change shape on neck

---
Things to work on:
-

- Eye Shape
- Disapearing Neck?
- Training
- New Images
- Training Quiz
- Add Background Wallpaper
- Beheaded Function
- 

28/05

I'm currently debating how difficult it would be to just add the necks in as a separate .js file. The issue isn't not having the global Width/Height variables as I thought, but rather that the 0,0 position isn't in the corner of the canvas, it's in the center where the head is placed. Just need to find where that happens in the system code, then plonk the neck in underneath where the head is being put. Easy as pie.
I will probably abandon this idea and go back to fixing my more important issues. 