import{S as t}from"./Screen-997-bBDD.js";import"./helperFunctions-DKZPWhQi.js";import"./index-BjMtJNwb.js";const e="extractHighlightsPixelShader",r=`#include<helperFunctions>
varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;uniform threshold: f32;uniform exposure: f32;
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=textureSample(textureSampler,textureSamplerSampler,input.vUV);var luma: f32=dot(LuminanceEncodeApprox,fragmentOutputs.color.rgb*uniforms.exposure);fragmentOutputs.color=vec4f(step(uniforms.threshold,luma)*fragmentOutputs.color.rgb,fragmentOutputs.color.a);}`;t.ShadersStoreWGSL[e]=r;const m={name:e,shader:r};export{m as extractHighlightsPixelShaderWGSL};
