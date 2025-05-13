import{S as o}from"./Screen-997-bBDD.js";import"./helperFunctions-BA5GUxba.js";import"./index-BjMtJNwb.js";const e="rgbdEncodePixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=toRGBD(texture2D(textureSampler,vUV).rgb);}`;o.ShadersStore[e]=r;const i={name:e,shader:r};export{i as rgbdEncodePixelShader};
