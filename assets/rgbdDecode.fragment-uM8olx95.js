import{S as o}from"./Screen-CLmgWIb6.js";import"./helperFunctions-D_8cF4BP.js";import"./index-C75Z-fU3.js";const e="rgbdDecodePixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=vec4(fromRGBD(texture2D(textureSampler,vUV)),1.0);}`;o.ShadersStore[e]=r;const i={name:e,shader:r};export{i as rgbdDecodePixelShader};
