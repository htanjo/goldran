import{S as e}from"./Screen-EMYeAv4S.js";const o="fogVertexDeclaration",r=`#ifdef FOG
varying vec3 vFogDistance;
#endif
`;e.IncludesShadersStore[o]=r;const d="fogVertex",n=`#ifdef FOG
vFogDistance=(view*worldPos).xyz;
#endif
`;e.IncludesShadersStore[d]=n;const i="vertexColorMixing",f=`#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
vColor=vec4(1.0);
#ifdef VERTEXCOLOR
#ifdef VERTEXALPHA
vColor*=color;
#else
vColor.rgb*=color.rgb;
#endif
#endif
#ifdef INSTANCESCOLOR
vColor*=instanceColor;
#endif
#endif
`;e.IncludesShadersStore[i]=f;
