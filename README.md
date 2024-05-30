[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HpplOQZx)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14993370&assignment_repo_type=AssignmentRepo)
## 2024 MDDN342 Assignment 3: Data Mappings

# Murphy the Hydra
### Recognising facial features & retargeting them onto a mythical creature.

#### Process

I got the idea for this 'photobooth' concept from a previous project - creating a Hydra head made with a series of changeable parameters - and adapted it for use in conjunction with AI for both set images and video.

From the beginning, I knew that I wanted not only replace the subjects face, but to block out their entire body to make the transformation and the Hydra mask more immersive. I found it quite difficult initially to choose which elements of the face would remain static, and which to move based on the image of a face provided. 
In the end, I decided that the jaw would be a key component, much like it is in lots of snapchat filters. As well as this, the nostrils will move according to the distance between the top of the nose and the lips, the eyes will tilt depending on how raised/depressed the eyebrows are, and their position will move depending on where they are situated on the face. Additionally, the Hydra will breathe smoke if the jaw is open wide enough.

I retargeted the following parameters:

##### Length of Horns = Length of Hair
e.g. Short Hair on subject = Short Horns
If the hair is too short or non-existent then the Hydra will have no horns.

##### Curl of Horns = Curliness of Hair
e.g. Curly Hair = Curly Horns
As the subjects hair gets curlier, so too will the 'curl-factor' of the horns. If the hair is straight or only slightly wavy then the Hydra will have triangular shaped horns instead.

##### Colour of Hydra = Hair Colour
e.g. Black Hair = Blue Hydra
The Colour of the Hydra ranges the full spectrum of colour starting at red and going around to pink. The colours map as follows:
Red Hair = Red Hydra
Blond Hair = Yellow/Light Green Hydra
Light Brown Hair = Green Hydra
Brown Hair = Cyan Hydra
Dark Brown Hair = Dark Blue Hydra
Black Hair = Purple/Pink Hydra

##### Scale Shape = Masculine / Feminine
This parameter is only either on or off:
Masculine Subject: Round Scales
Feminine Subject: Pointy Scales

##### Eye Colour = Age
e.g. Red Eyes = Young Subject

This colour range goes from red to green. These parameters are a little less accurate than the others so don't be offended about the results.
Red Eyes = Young Subject
Orange Eyes = 20's - 30's
Yellow Eyes = 40's - 50's
Green Eyes = 60 +

For this parameter I went for a transfer that was less literal. In compensation I also changed other features based on the results of the same variable: As the subject gets older their teeth will go from white to a more yellow/brown shade and once the subject ages over 50 their teeth will be more rounded and less pointy, from there as they get older they will be more worn down/smaller.


THings that worked,
failed experiments
training issues or things that went well.
reflection
Neck issue









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



Photos:

pexels-jimmy-elizarraras
pexels-yankrukov
pexels-shkrabaanthony-7081111
pexels-rdne-8474962
pexels-kindelmedia-7148409
pexels-fransa-387080-2336840
pexels-meijiiiiii-1340914
pexels-kindelmedia-7149170
pexels-imustbedead-15427283
pexels-arthur-goulart-762043-1684847

The conclusion I've come to with the neck situation is that it's not working as it's copied straight from my Project 2 file where the rest of the face positions are. Which doesn't make any sense. It's not that I couldn't spend ages tweaking around with the neck positions to make them work because the shapes are still there - but I feel like I should leave it as is on principle. Because as far as I can see, it should be working.

29/05 (12:41am)
Ha. I have added a fifth slider and can now rest easy no longer on the minimum, I have changed the curliness of the horns to reflect the curl of the hair. Very original. I also connected the teeth to the eyeColour (AKA the age) so now the teeth round and yellow as the person gets older. Perhaps I'm being a bit too literal with these variables. But no going back now. 