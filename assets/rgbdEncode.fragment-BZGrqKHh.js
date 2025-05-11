import{S as o}from"./Screen-CYylH-ma.js";import"./helperFunctions-DjcFYz93.js";import"./index-D_x5-G8J.js";const e="rgbdEncodePixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=toRGBD(texture2D(textureSampler,vUV).rgb);}`;o.ShadersStore[e]=r;const i={name:e,shader:r};export{i as rgbdEncodePixelShader};
