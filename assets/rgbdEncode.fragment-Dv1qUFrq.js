import{S as o}from"./Screen-SWxmy8sd.js";import"./helperFunctions-B0J3V9_P.js";import"./index-sqFGdUbe.js";const e="rgbdEncodePixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=toRGBD(texture2D(textureSampler,vUV).rgb);}`;o.ShadersStore[e]=r;const i={name:e,shader:r};export{i as rgbdEncodePixelShader};
