import{S as t}from"./Screen-CLmgWIb6.js";import"./helperFunctions-1oMyJ8gl.js";import"./index-C75Z-fU3.js";const e="rgbdEncodePixelShader",r=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#include<helperFunctions>
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=toRGBD(textureSample(textureSampler,textureSamplerSampler,input.vUV).rgb);}`;t.ShadersStoreWGSL[e]=r;const p={name:e,shader:r};export{p as rgbdEncodePixelShaderWGSL};