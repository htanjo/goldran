import{S as e}from"./Screen-EMYeAv4S.js";const r="morphTargetsVertexGlobalDeclaration",t=`#ifdef MORPHTARGETS
uniform float morphTargetInfluences[NUM_MORPH_INFLUENCERS];
#ifdef MORPHTARGETS_TEXTURE 
uniform float morphTargetTextureIndices[NUM_MORPH_INFLUENCERS];uniform vec3 morphTargetTextureInfo;uniform highp sampler2DArray morphTargets;vec3 readVector3FromRawSampler(int targetIndex,float vertexIndex)
{ 
float y=floor(vertexIndex/morphTargetTextureInfo.y);float x=vertexIndex-y*morphTargetTextureInfo.y;vec3 textureUV=vec3((x+0.5)/morphTargetTextureInfo.y,(y+0.5)/morphTargetTextureInfo.z,morphTargetTextureIndices[targetIndex]);return texture(morphTargets,textureUV).xyz;}
#endif
#endif
`;e.IncludesShadersStore[r]=t;const d={name:r,shader:t},c=Object.freeze(Object.defineProperty({__proto__:null,morphTargetsVertexGlobalDeclaration:d},Symbol.toStringTag,{value:"Module"})),o="morphTargetsVertexDeclaration",a=`#ifdef MORPHTARGETS
#ifndef MORPHTARGETS_TEXTURE
attribute vec3 position{X};
#ifdef MORPHTARGETS_NORMAL
attribute vec3 normal{X};
#endif
#ifdef MORPHTARGETS_TANGENT
attribute vec3 tangent{X};
#endif
#ifdef MORPHTARGETS_UV
attribute vec2 uv_{X};
#endif
#elif {X}==0
uniform int morphTargetCount;
#endif
#endif
`;e.IncludesShadersStore[o]=a;const l={name:o,shader:a},u=Object.freeze(Object.defineProperty({__proto__:null,morphTargetsVertexDeclaration:l},Symbol.toStringTag,{value:"Module"})),n="morphTargetsVertexGlobal",f=`#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
float vertexID;
#endif
#endif
`;e.IncludesShadersStore[n]=f;const s={name:n,shader:f},g=Object.freeze(Object.defineProperty({__proto__:null,morphTargetsVertexGlobal:s},Symbol.toStringTag,{value:"Module"})),T="morphTargetsVertex",i=`#ifdef MORPHTARGETS
#ifdef MORPHTARGETS_TEXTURE
#if {X}==0
for (int i=0; i<NUM_MORPH_INFLUENCERS; i++) {if (i>=morphTargetCount) break;vertexID=float(gl_VertexID)*morphTargetTextureInfo.x;positionUpdated+=(readVector3FromRawSampler(i,vertexID)-position)*morphTargetInfluences[i];vertexID+=1.0;
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(readVector3FromRawSampler(i,vertexID) -normal)*morphTargetInfluences[i];vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(readVector3FromRawSampler(i,vertexID).xy-uv)*morphTargetInfluences[i];vertexID+=1.0;
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(readVector3FromRawSampler(i,vertexID) -tangent.xyz)*morphTargetInfluences[i];
#endif
}
#endif
#else
positionUpdated+=(position{X}-position)*morphTargetInfluences[{X}];
#ifdef MORPHTARGETS_NORMAL
normalUpdated+=(normal{X}-normal)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_TANGENT
tangentUpdated.xyz+=(tangent{X}-tangent.xyz)*morphTargetInfluences[{X}];
#endif
#ifdef MORPHTARGETS_UV
uvUpdated+=(uv_{X}-uv)*morphTargetInfluences[{X}];
#endif
#endif
#endif
`;e.IncludesShadersStore[T]=i;const m={name:T,shader:i},R=Object.freeze(Object.defineProperty({__proto__:null,morphTargetsVertex:m},Symbol.toStringTag,{value:"Module"}));export{l as a,s as b,d as c,c as d,u as e,g as f,R as g,m};
