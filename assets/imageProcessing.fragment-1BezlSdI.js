import{S as t}from"./Screen-Dnizgy8K.js";import"./imageProcessingFunctions-C1zYKN2s.js";import"./helperFunctions-Btoaa3f4.js";import"./index-gFWUETRy.js";const e="imageProcessingPixelShader",r=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#include<imageProcessingDeclaration>
#include<helperFunctions>
#include<imageProcessingFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var result: vec4f=textureSample(textureSampler,textureSamplerSampler,input.vUV);
#ifdef IMAGEPROCESSING
#ifndef FROMLINEARSPACE
result=vec4f(toLinearSpaceVec3(result.rgb),result.a);
#endif
result=applyImageProcessing(result);
#else
#ifdef FROMLINEARSPACE
result=applyImageProcessing(result);
#endif
#endif
fragmentOutputs.color=result;}`;t.ShadersStoreWGSL[e]=r;const l={name:e,shader:r};export{l as imageProcessingPixelShaderWGSL};
