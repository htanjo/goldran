import{S as r}from"./Screen-Cp-_rxHh.js";import"./index-TGftESSi.js";const e="glowMapMergeVertexShader",t=`attribute position: vec2f;varying vUV: vec2f;
#define CUSTOM_VERTEX_DEFINITIONS
@vertex
fn main(input : VertexInputs)->FragmentInputs {const madd: vec2f= vec2f(0.5,0.5);
#define CUSTOM_VERTEX_MAIN_BEGIN
vertexOutputs.vUV=input.position*madd+madd;vertexOutputs.position= vec4f(input.position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;r.ShadersStoreWGSL[e]=t;const i={name:e,shader:t};export{i as glowMapMergeVertexShaderWGSL};
