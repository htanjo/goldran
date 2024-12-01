import{S as e}from"./Screen-EMYeAv4S.js";const o="sceneUboDeclaration",n=`layout(std140,column_major) uniform;uniform Scene {mat4 viewProjection;
#ifdef MULTIVIEW
mat4 viewProjectionR;
#endif 
mat4 view;mat4 projection;vec4 vEyePosition;};
`;e.IncludesShadersStore[o]=n;const t="meshUboDeclaration",a=`#ifdef WEBGL2
uniform mat4 world;uniform float visibility;
#else
layout(std140,column_major) uniform;uniform Mesh
{mat4 world;float visibility;};
#endif
#define WORLD_UBO
`;e.IncludesShadersStore[t]=a;const i="mainUVVaryingDeclaration",r=`#ifdef MAINUV{X}
varying vec2 vMainUV{X};
#endif
`;e.IncludesShadersStore[i]=r;const s="logDepthDeclaration",m=`#ifdef LOGARITHMICDEPTH
uniform float logarithmicDepthConstant;varying float vFragmentDepth;
#endif
`;e.IncludesShadersStore[s]=m;
