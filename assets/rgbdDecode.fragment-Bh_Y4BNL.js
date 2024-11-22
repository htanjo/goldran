import{S as o}from"./Screen-ByIAW_fE.js";import"./helperFunctions-Dr7h6LWL.js";import"./index-CDvpiCTI.js";const e="rgbdDecodePixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=vec4(fromRGBD(texture2D(textureSampler,vUV)),1.0);}`;o.ShadersStore[e]=r;const i={name:e,shader:r};export{i as rgbdDecodePixelShader};
