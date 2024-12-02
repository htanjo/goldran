import{S as o}from"./Screen-CysO23Hc.js";import"./helperFunctions-mT4_1-di.js";import"./index-CNLDnUb6.js";const r="extractHighlightsPixelShader",e=`#include<helperFunctions>
varying vec2 vUV;uniform sampler2D textureSampler;uniform float threshold;uniform float exposure;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=texture2D(textureSampler,vUV);float luma=dot(LuminanceEncodeApprox,gl_FragColor.rgb*exposure);gl_FragColor.rgb=step(threshold,luma)*gl_FragColor.rgb;}`;o.ShadersStore[r]=e;const i={name:r,shader:e};export{i as extractHighlightsPixelShader};
