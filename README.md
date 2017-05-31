# JustSwatchMe
---
## [URL](http://www.justSwatch.me)

## What It Is
JustSwatch.me is a color tools suite that allows you to create, upload, and share a color swatch. There is a generated swatch that pulls the complementary and analogous colors, an active user swatch, where you can select and drop in colors, then if you open a user swatch, you will have a third swatch that you can pull colors from.
You can pick colors from either a color wheel or a photo you upload to the dom. No photos are stored. There is also a button that pulls an average color out of a picture.

## Team members
* <a href="http://jamesmarion.net">James Marion</a>

## Languages and Technologies used
* Node.js
* Express
* React
* PostgreSQL
* JavaScript
* jQuery (to be removed, used only for ajax calls)
* HTML
* CSS
* Amazon Web Services (AWS)



## Site Walkthrough
<p align='center'>
    <img src='http://justswatch.me/readmepics/fullpage.png'></img>
</p>

### How to use
Users can create an account if they would like to save their swatches, but most functionality is available without an account. Otherwise a user can start picking colors. By default, a color wheel is pulled up. The user may click anywhere on the wheel to select that color. If you would like to tweak that color, there are HSL and RGB sliders.
Similarly, you can you can click the 'choose file' button to upload your photo to select colors from.
<p align='center'>
    <img src='http://justswatch.me/readmepics/picture.png'></img>
</p>

When you have a color you like, clicking on it will select that color. By selecting on a spot on the active user swatch, you can copy that color over to your personal swatch. You can also click the 'Get Average Color' button to pull the average color of the photo.

If you like your swatch and you are logged in, an upload button will appear under the user swatch. Clicking this will upload the swatch for you and anyone else to see.

By clicking on the hamburger menu, you can see your swatch along with everyone elses. If you see a swatch you like, just click on the 'set swatch' button to retrieve it.

<p align='center'>
    <img src='http://justswatch.me/readmepics/sidebar.png'></img>
</p>



## Challenges

### Challenge 1 - Planning a project with a short timeline
While I had an idea for my project, I really only had 2 weeks from start to finish for this project. I have only done a couple of small project in react previously, so I was not completely confident with my skills. I tried not to worry about it and did end up getting most of my goals. There were a few stretch goals that I am disappointed did not make the cut, but I feel I did end up with a complete product.


### Challenge 2 - Working with Canvas
Creating a reactive canvas is tough to begin with. Allowing using to upload photos and scale them to a set area without breaking your layout or the image is tougher! All it really took was some simple math, but it did pan out just fine. I basically just had to find the aspect ratio of the photo, limit the width to a set amount, then multiply the ratio by that set amount and set that to the y value, giving me a perfectly scaled image.

The one issue with this is that if you have a very tall picture, it could really break the layout of the site, but that is a very unusual case. I may force a vertical limit and add a scrollbar when needed in the future.

### Challenge 3 - React, endless loops, and updating things that update each other
Moving from a jquery mindset to a react mindset took me a little while. I store all color data in HSL format then convert it when I need RGB. The color is pulled from the canvas as RGB, and I output in RGB and HSL. This became very painful with the color sliders. Every time there is an update anywhere, the data is pulled and converted back and forth for both sliders. It took me a while to get that all organized and working.
