import{S as t}from"./Screen-e1tCU1_Y.js";import"./helperFunctions-Bk95y7AR.js";import"./index-DE6TM6xM.js";const e="rgbdDecodePixelShader",r=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=vec4f(fromRGBD(textureSample(textureSampler,textureSamplerSampler,input.vUV)),1.0);}`;t.ShadersStoreWGSL[e]=r;const p={name:e,shader:r};export{p as rgbdDecodePixelShaderWGSL};
