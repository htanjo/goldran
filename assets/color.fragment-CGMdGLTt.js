import{S as r}from"./Screen-CYylH-ma.js";import"./clipPlaneFragment-Bxp1fLfY.js";import"./fogFragmentDeclaration-Cw07HAiD.js";import"./index-D_x5-G8J.js";const e="colorPixelShader",o=`#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
#define VERTEXCOLOR
varying vec4 vColor;
#else
uniform vec4 color;
#endif
#include<clipPlaneFragmentDeclaration>
#include<fogFragmentDeclaration>
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
gl_FragColor=vColor;
#else
gl_FragColor=color;
#endif
#include<fogFragment>(color,gl_FragColor)
#define CUSTOM_FRAGMENT_MAIN_END
}`;r.ShadersStore[e]=o;const a={name:e,shader:o};export{a as colorPixelShader};
