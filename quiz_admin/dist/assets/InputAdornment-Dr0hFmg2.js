import{U as P,V as C,w as I,_ as c,r as b,y as A,z as j,a8 as L,j as a,aF as z,E as F,J as R,a9 as m,F as T}from"./main-CFWUZTJd.js";function U(e){return C("MuiInputAdornment",e)}const x=P("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var g;const _=["children","className","component","disablePointerEvents","disableTypography","position","variant"],$=(e,t)=>{const{ownerState:n}=e;return[t.root,t[`position${m(n.position)}`],n.disablePointerEvents===!0&&t.disablePointerEvents,t[n.variant]]},M=e=>{const{classes:t,disablePointerEvents:n,hiddenLabel:o,position:s,size:r,variant:l}=e,d={root:["root",n&&"disablePointerEvents",s&&`position${m(s)}`,l,o&&"hiddenLabel",r&&`size${m(r)}`]};return T(d,U,t)},N=I("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:$})(({theme:e,ownerState:t})=>c({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(e.vars||e).palette.action.active},t.variant==="filled"&&{[`&.${x.positionStart}&:not(.${x.hiddenLabel})`]:{marginTop:16}},t.position==="start"&&{marginRight:8},t.position==="end"&&{marginLeft:8},t.disablePointerEvents===!0&&{pointerEvents:"none"})),S=b.forwardRef(function(t,n){const o=A({props:t,name:"MuiInputAdornment"}),{children:s,className:r,component:l="div",disablePointerEvents:d=!1,disableTypography:f=!1,position:u,variant:v}=o,E=j(o,_),i=L()||{};let p=v;v&&i.variant,i&&!p&&(p=i.variant);const h=c({},o,{hiddenLabel:i.hiddenLabel,size:i.size,disablePointerEvents:d,position:u,variant:p}),y=M(h);return a.jsx(z.Provider,{value:null,children:a.jsx(N,c({as:l,ownerState:h,className:F(y.root,r),ref:n},E,{children:typeof s=="string"&&!f?a.jsx(R,{color:"text.secondary",children:s}):a.jsxs(b.Fragment,{children:[u==="start"?g||(g=a.jsx("span",{className:"notranslate",children:"​"})):null,s]})}))})});export{S as I};
