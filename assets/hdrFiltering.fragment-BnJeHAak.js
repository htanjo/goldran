import{S as n}from"./Screen-BO00V--0.js";import"./helperFunctions-Dix3WJKE.js";import"./hdrFilteringFunctions-D4wqILRN.js";import"./index-lXTnwrzv.js";const r="hdrFilteringPixelShader",e=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform alphaG: f32;var inputTextureSampler: sampler;var inputTexture: texture_cube<f32>;uniform vFilteringInfo: vec2f;uniform hdrScale: f32;varying direction: vec3f;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var color: vec3f=radiance(uniforms.alphaG,inputTexture,inputTextureSampler,input.direction,uniforms.vFilteringInfo);fragmentOutputs.color= vec4f(color*uniforms.hdrScale,1.0);}`;n.ShadersStoreWGSL[r]=e;const a={name:r,shader:e};export{a as hdrFilteringPixelShaderWGSL};
