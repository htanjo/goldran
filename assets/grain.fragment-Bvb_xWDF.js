import{S as a}from"./Screen-BO00V--0.js";import"./helperFunctions-DD-T-Knt.js";import"./index-lXTnwrzv.js";const r="grainPixelShader",e=`#include<helperFunctions>
uniform sampler2D textureSampler; 
uniform float intensity;uniform float animatedSeed;varying vec2 vUV;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void)
{gl_FragColor=texture2D(textureSampler,vUV);vec2 seed=vUV*(animatedSeed);float grain=dither(seed,intensity);float lum=getLuminance(gl_FragColor.rgb);float grainAmount=(cos(-PI+(lum*PI*2.))+1.)/2.;gl_FragColor.rgb+=grain*grainAmount;gl_FragColor.rgb=max(gl_FragColor.rgb,0.0);}`;a.ShadersStore[r]=e;const n={name:r,shader:e};export{n as grainPixelShader};
