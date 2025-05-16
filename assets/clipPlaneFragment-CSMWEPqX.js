import{S as e}from"./Screen-COUJdEow.js";const i="clipPlaneFragmentDeclaration",n=`#ifdef CLIPPLANE
varying fClipDistance: f32;
#endif
#ifdef CLIPPLANE2
varying fClipDistance2: f32;
#endif
#ifdef CLIPPLANE3
varying fClipDistance3: f32;
#endif
#ifdef CLIPPLANE4
varying fClipDistance4: f32;
#endif
#ifdef CLIPPLANE5
varying fClipDistance5: f32;
#endif
#ifdef CLIPPLANE6
varying fClipDistance6: f32;
#endif
`;e.IncludesShadersStoreWGSL[i]=n;const d={name:i,shader:n},r=Object.freeze(Object.defineProperty({__proto__:null,clipPlaneFragmentDeclarationWGSL:d},Symbol.toStringTag,{value:"Module"})),f="clipPlaneFragment",a=`#if defined(CLIPPLANE) || defined(CLIPPLANE2) || defined(CLIPPLANE3) || defined(CLIPPLANE4) || defined(CLIPPLANE5) || defined(CLIPPLANE6)
if (false) {}
#endif
#ifdef CLIPPLANE
else if (fragmentInputs.fClipDistance>0.0)
{discard;}
#endif
#ifdef CLIPPLANE2
else if (fragmentInputs.fClipDistance2>0.0)
{discard;}
#endif
#ifdef CLIPPLANE3
else if (fragmentInputs.fClipDistance3>0.0)
{discard;}
#endif
#ifdef CLIPPLANE4
else if (fragmentInputs.fClipDistance4>0.0)
{discard;}
#endif
#ifdef CLIPPLANE5
else if (fragmentInputs.fClipDistance5>0.0)
{discard;}
#endif
#ifdef CLIPPLANE6
else if (fragmentInputs.fClipDistance6>0.0)
{discard;}
#endif
`;e.IncludesShadersStoreWGSL[f]=a;const t={name:f,shader:a},l=Object.freeze(Object.defineProperty({__proto__:null,clipPlaneFragmentWGSL:t},Symbol.toStringTag,{value:"Module"}));export{t as a,r as b,d as c,l as d};
