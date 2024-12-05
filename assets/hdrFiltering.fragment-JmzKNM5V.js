import{S as n}from"./Screen-e1tCU1_Y.js";import"./helperFunctions-Bk95y7AR.js";import"./hdrFilteringFunctions-DY6anr26.js";import"./index-DE6TM6xM.js";const r="hdrFilteringPixelShader",e=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform alphaG: f32;var inputTextureSampler: sampler;var inputTexture: texture_cube<f32>;uniform vFilteringInfo: vec2f;uniform hdrScale: f32;varying direction: vec3f;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var color: vec3f=radiance(uniforms.alphaG,inputTexture,inputTextureSampler,input.direction,uniforms.vFilteringInfo);fragmentOutputs.color= vec4f(color*uniforms.hdrScale,1.0);}`;n.ShadersStoreWGSL[r]=e;const a={name:r,shader:e};export{a as hdrFilteringPixelShaderWGSL};
