import{S as o}from"./Screen-BO00V--0.js";import"./helperFunctions-DD-T-Knt.js";import"./index-lXTnwrzv.js";const e="rgbdDecodePixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=vec4(fromRGBD(texture2D(textureSampler,vUV)),1.0);}`;o.ShadersStore[e]=r;const i={name:e,shader:r};export{i as rgbdDecodePixelShader};
