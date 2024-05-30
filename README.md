[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HpplOQZx)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=14993370&assignment_repo_type=AssignmentRepo)
## 2024 MDDN342 Assignment 3: Data Mappings | Victoria University of Wellington

# Murphy the Hydra
### Recognising facial features & retargeting them onto a mythical creature.
Link to Github Pages: https://23-mddn342.github.io/data-mappings-RitaClose/ 

#### Concept
I got the idea for this 'photobooth' concept from a previous project - creating a Hydra head made with a series of changeable parameters - and adapted it for use in conjunction with AI for both set images and video.

#### Pose Based Parameters
From the beginning, I knew that I wanted not only replace the subjects face, but to block out their entire body to make the transformation and the Hydra mask more immersive. I found it quite difficult initially to choose which elements of the face would remain static, and which to move based on the image of a face provided. 

Brought over from my other project, the key feature of my pose-based parameters is the ability to follow the subjects face angle when they turn sideways, the program picks up on the location of the nose and uses that as the pivot point in relation to the center of the face to determine which way the subject is facing and how far they are turned in that direction.
Other than the tilt of the face, the other key component is the jaw opening, much like it is in lots of snapchat filters - the jaw will open (with some exageration) to mimic the subject. As well as this, the nostrils will move according to the distance between the top of the nose and the lips, the eyes will tilt depending on how raised/depressed the eyebrows are, and their position will move depending on where they are situated on the face. Additionally, the Hydra will breathe smoke if the jaw is open wide enough.

#### Feature Based Parameters
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

#### Process
I spent quite a while at the beginning of the process transfering across data from a different project and adapting the system to object oriented code and to fit into the style of the new project. After that I mapped all of the pose-based parameters and made sure that these were reflected to the facial changes in the suject, specifically in the video section. I went through the training process a few times unsure about where I wanted the hair colour to be positioned along the slider and with new elements as I added them - new horns, eye colour for age etc. 

##### Abandoned Avenues
There were quite a few different things I tried during this project that didn't exactly pan out or flat-out failed. For example, when I first imported the face from my previous project the joining neck shapes didn't scale properly and are sort of facing the wrong way - I've tried everything I can think of and they're still not working so I think I'll leave that one a mystery. 

Later in the project I tried using all of the eye positions to make specific points on the Hydra's eyes so that they were more dynamic for each subject. However, because of the way the face turns from side to side, keeping the eyes in the right positions at the right angles proved to be too difficult - epecially as they needed to be transformed and scales to fit the Hydra's face to begin with.
Still with the eyes, I originlly was basing the Hydra's eye colour off the eye colour of the subjects but in the training images the eye colour is ironically not always easy to see so I decided to substitute this for using the age of the subject as the parameter instead.

I was thinking about importing in my 'beheaded' feature into this project but decided that choosing a feature of a subject to trigger this could potentially be a can of worms I didn't want to open - I decided to leave it without for now.

##### Triumphs
Overall I am actually quite happy with how the Hydra turned out - although it doesn't look as clean as in my previous project, it actually responds remarkably well to how the subjects face turns and moves (especially in the video which is super fun to play with).
I was initially having trouble with the training quizzes and matching the right subjects, however, towards the end of the project, I decided to model a different kind of horn using a bezier curve as a fifth parameter. As it turns out mapping the curl of these new horns to curly/straight hair was a genius move and it has made recognising the right subject exponentially easier.

##### Reflection
In conclusion I thought this project was really interesting, and despite still not entirely understanding the (object oriented) code I'm working with, I think things mostly turned out okay. I'm glad I added in the fifth parameter (horn curl), it significantly contributed to how easy it is to identify different people based on the new face. That being said, I wish the interpoloation quiz could work better and I'm not entirely happy with the Hydra's necks or how they jump around in the video setting - but I don't think there's anything I can do about the latter anyway.


---------


#### Journal
##### 15/05
I am not a fan so far. Object Oriented coding is difficult and I don't entirely understand it. So far I have imported my characters face into the new code framework but the variables aren't working right so far so I need to tinker a bit to make them better. Also I need to re-orient all of the measurements so that they follow the faces from the AI instead of keeping the same all the time. 

##### 16/05
Today I got the tilt and the jaw drop to work, I am going to do the eyes and fix the neck before I move on to training the system then adding in some of the conditional variables and attributes.

##### 21/05/2024
Below are the variables I have so far, they may change, especially the eyes because I think it's actually quite difficult to determine eye colour from the training photos and everyone's eyes just look brown. I chose to do the colour of the face based on hair colour, I was thinking about doing it based on the colour of their shirt but quite a few of the photos you can't see what colour it is. I have added the neck back in because the head just looks like it's floating weirdly if it's not there. The training I've done so far is only about 20 people so that's next on the list I think.

sideTilt = Horizontal tilt of face
jawDrop = How much the mouth is open
eyeTilt = Degree of eyebrow raise

base(face)Colour = Hair Colour
eyeColour = eyeColour
Hair Length for Horns 
Scale Type for Masculine/Feminine

Things to work on:
- Eye Shape
- Disapearing Neck?
- Training
- New Images
- Training Quiz
- Add Background Wallpaper
- Beheaded Function

##### 28/05

I'm currently debating how difficult it would be to just add the necks in as a separate .js file. The issue isn't not having the global Width/Height variables as I thought, but rather that the 0,0 position isn't in the corner of the canvas, it's in the center where the head is placed. Just need to find where that happens in the system code, then plonk the neck in underneath where the head is being put. Easy as pie.
I will probably abandon this idea and go back to fixing my more important issues. 

The conclusion I've come to with the neck situation is that it's not working as it's copied straight from my Project 2 file where the rest of the face positions are. Which doesn't make any sense. It's not that I couldn't spend ages tweaking around with the neck positions to make them work because the shapes are still there - but I feel like I should leave it as is on principle. Because as far as I can see, it should be working.

##### 29/05 (12:41am)
Ha. I have added a fifth slider and can now rest easy no longer on the minimum, I have changed the curliness of the horns to reflect the curl of the hair. Very original. I also connected the teeth to the eyeColour (AKA the age) so now the teeth round and yellow as the person gets older. Perhaps I'm being a bit too literal with these variables. But no going back now. 

##### Photos Used in Faces Section:

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