import{S as i}from"./Screen-CysO23Hc.js";import"./index-CNLDnUb6.js";const e="proceduralVertexShader",o=`attribute vec2 position;varying vec2 vPosition;varying vec2 vUV;const vec2 madd=vec2(0.5,0.5);
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
vPosition=position;vUV=position*madd+madd;gl_Position=vec4(position,0.0,1.0);
#define CUSTOM_VERTEX_MAIN_END
}`;i.ShadersStore[e]=o;const d={name:e,shader:o};export{d as proceduralVertexShader};
