# Golden Swordsman DRAN

> 3D Web project powered by Babylon.js

I created a [3D Web content](https://htanjo.github.io/goldran/) that is fan art of 90's Japanese anime ["The Brave of Gold Goldran"](https://en.wikipedia.org/wiki/The_Brave_of_Gold_Goldran). When you scroll the page, it transforms from a vehicle to a robot.

**Transform! Golden Swordsman DRAN!**  
**<https://htanjo.github.io/goldran/>**

It also has "Autoplay" and "Fullscreen" button at the bottom for more enjoyable experience.

## Technical Details

This content powered by 3D data with keyframes exported in [glTF](https://docs.blender.org/manual/en/dev/addons/import_export/scene_gltf2.html) format, and rendering it in HTML using WebGL.
I could not have created this content without various open source projects.
I especially appreciate below.

### [Babylon.js](https://www.babylonjs.com/)

JavaScript framework that renders beautiful 3D contents in Web pages.
The extensive features, documentation, demos, and forums are a big help.
I used Babylon.js for lighting, rendering, and playing animations.

### [Blender](https://www.blender.org/)

Integrated 3D graphics software provided free and open source.
Modeling, materials, and animation making was done in Blender.
3D data is exported in glTF format and imported with Babylon.js.

### [React](https://react.dev/)

One of the most popular Web UI frameworks.
The 2D UI is implemented with React and its plugins, such as [react-spring](https://www.react-spring.dev/).

### [virtual-scroll](https://github.com/ayamflow/virtual-scroll)

"Scrolling" is the most important topic for this project.
On mobile devices, when the page is actually scrolled, GPU resources are taken up by scrolling and the 3D frame rate would be drastically unstable.
So, this project does not actually scroll the content.
Instead of that, it uses touch moves and mouse wheel events to simulate scrolling.
This library was quite helpful to achieve it.

### [Vite](https://vite.dev/)

The build tool for the Web.
It works blazing fast and accelerated the project development.

## License

### Source code

Available under the [MIT License](./LICENSE).

### 3D model

Available under [CC Attribution-NonCommercial](https://creativecommons.org/licenses/by-nc/4.0/).  
I created the model from scratch, however, this work is fan art and the copyright of the original character belongs to [Sunrise](https://www.sunrise-inc.co.jp/).
