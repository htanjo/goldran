import{S as o}from"./Screen-Cp-_rxHh.js";import"./helperFunctions-C2BJjsK-.js";import"./index-TGftESSi.js";const e="rgbdEncodePixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=toRGBD(texture2D(textureSampler,vUV).rgb);}`;o.ShadersStore[e]=r;const i={name:e,shader:r};export{i as rgbdEncodePixelShader};
