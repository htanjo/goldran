import{S as r}from"./Screen-CysO23Hc.js";import"./clipPlaneFragment-Bi-4DAJt.js";import"./fogFragmentDeclaration-CrNYkIkX.js";import"./index-CNLDnUb6.js";const e="colorPixelShader",n=`#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
#define VERTEXCOLOR
varying vColor: vec4f;
#else
uniform color: vec4f;
#endif
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
fragmentOutputs.color=input.vColor;
#else
fragmentOutputs.color=uniforms.color;
#endif
#include<fogFragment>(color,fragmentOutputs.color)
#define CUSTOM_FRAGMENT_MAIN_END
}`;r.ShadersStoreWGSL[e]=n;const f={name:e,shader:n};export{f as colorPixelShaderWGSL};
