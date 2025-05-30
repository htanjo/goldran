# Golden Brave Goldran

> 3D Web project powered by Babylon.js

**Golden Combination! Goldran!**  
**<https://htanjo.github.io/goldran/>**

[![Animation](./animation.gif)](https://htanjo.github.io/goldran/)

I created a [3D Web animation](https://htanjo.github.io/goldran/) that is fan art of 90's Japanese anime ["The Brave of Gold Goldran" (黄金勇者ゴルドラン)](https://en.wikipedia.org/wiki/The_Brave_of_Gold_Goldran). As you scroll through the page, the vehicle transforms into a robot, and then combines with a dragon to become a giant brave.

## Features

- Scroll-linked 3D animation
- Viewpoint adjustment by mouse or device movement
- Autoplay mode
- Fullscreen mode (PC)
- VR mode (VR devices including smartphones)

You can move the viewpoint position unlike normal videos.
The page also has "Autoplay", "Fullscreen", and/or "VR" button at the bottom for more immersive experience.

## Technical Details

This content powered by 3D data with keyframes exported in [glTF](https://docs.blender.org/manual/en/dev/addons/import_export/scene_gltf2.html) format, and rendering it in HTML using WebGL.
I could not have created this content without various open source projects.
I especially appreciate below.

### [Babylon.js](https://www.babylonjs.com/)

JavaScript framework that renders beautiful 3D contents in Web pages.
It has powerful features like PBR (Physically Based Rendering) as a 3D engine. Also, extensive documentations, online demos, and forums are a big help.
I used Babylon.js for lighting, rendering, post processing, and playing animations.

### [Blender](https://www.blender.org/)

Integrated 3D graphics software provided for free and open source.
I used Blender for modeling, materials and animations making.
3D data is exported in glTF file (.glb) and imported into HTML with Babylon.js.
To reproduce realistic materials, I have installed [Fluent Materializer](https://blendermarket.com/products/fluent-materializer) and [Simplebake](https://blendermarket.com/products/simplebake---simple-pbr-and-other-baking-in-blender-2) addon.

### [glTF Transform](https://gltf-transform.dev/)

Optimization tool for glTF files.
To support mobile devices, it was necessary to reduce memory and file size.
Especially on iOS, the browser crashes when the load becomes higher.
So I have prepared two different glTF files, one for PC with 2K textures and one for mobile with 1K textures.
Both are compressed with WebP.
To automate this workflow, I have installed glTF Transform.

### [React](https://react.dev/)

One of the most popular Web UI frameworks.
The 2D UI is mainly implemented with React and its plugins, such as [react-spring](https://www.react-spring.dev/), [react-tooltip](https://react-tooltip.com/), and [react-i18next](https://react.i18next.com/).
To integrate Babylon.js into React application, I used [babylonjs-hook](https://github.com/brianzinn/babylonjs-hook) library.

### [virtual-scroll](https://github.com/ayamflow/virtual-scroll)

"Scrolling" is the most important topic for this project.
On mobile devices, when the page is actually scrolled, GPU resources are taken up by scrolling and the 3D frame rate would be drastically unstable.
So, this project does not actually scroll the content.
Instead of that, it uses touch moves and mouse wheel events to simulate scrolling.
This library was quite helpful to achieve it.

### [Vite](https://vite.dev/)

The build tool for the Web.
It's very easy to start and works blazing fast.
Vite has definitely accelerated the development speed.
I have built this project based on React + TypeScript template.

## License

### Source code

Available under the [MIT License](./LICENSE).

### 3D model

Available under [CC Attribution-NonCommercial](https://creativecommons.org/licenses/by-nc/4.0/).  
I created the model from scratch, however, this work is fan art and the copyright of the original character belongs to [Sunrise](https://www.sunrise-inc.co.jp/).
