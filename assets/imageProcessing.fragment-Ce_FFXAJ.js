import{S as i}from"./Screen-CYylH-ma.js";import"./imageProcessingFunctions-CIsVAoch.js";import"./helperFunctions-DjcFYz93.js";import"./index-D_x5-G8J.js";const e="imageProcessingPixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#include<imageProcessingDeclaration>
#include<helperFunctions>
#include<imageProcessingFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{vec4 result=texture2D(textureSampler,vUV);
#ifdef IMAGEPROCESSING
#ifndef FROMLINEARSPACE
result.rgb=toLinearSpace(result.rgb);
#endif
result=applyImageProcessing(result);
#else
#ifdef FROMLINEARSPACE
result=applyImageProcessing(result);
#endif
#endif
gl_FragColor=result;}`;i.ShadersStore[e]=r;const a={name:e,shader:r};export{a as imageProcessingPixelShader};
