import{S as a}from"./Screen-C3s8IBjy.js";import"./index-C_y_5XCx.js";const e="passPixelShader",r=`varying vec2 vUV;uniform sampler2D textureSampler;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) 
{gl_FragColor=texture2D(textureSampler,vUV);}`;a.ShadersStore[e]=r;const s={name:e,shader:r};export{s as passPixelShader};