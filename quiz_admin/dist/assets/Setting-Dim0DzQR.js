import{a as x,A as p,b as k,r,j as e,M as T,G as N,B as _,J as y,T as m,d as S,t as v}from"./main-CFWUZTJd.js";import{c as C,a as l,F as w,b as E,d as h,E as g}from"./index.esm-DdOCMflI.js";const B=async()=>await(await x({url:p+"/api/v2/setting",method:"get",headers:{Authorization:"Bearer "+k.get("access_token")}})).data,A=async n=>await(await x({url:p+"/api/v2/bank/setting",method:"put",headers:{Authorization:"Bearer "+k.get("access_token")},data:{...n}})).data,q=C({accountName:l().required("Tên tài khoản ngân hàng không được để trống"),bankName:l().required("Tên ngân hàng không được để trống"),accountNumber:l().required("Số tài khoản không được để trống").matches(/^[0-9]+$/,"Số tài khoản phải là số")}),M=()=>{const[n,o]=r.useState();r.useEffect(()=>{(async()=>{try{const t=await B();o(t.data)}catch(t){console.log(t)}})()},[]),console.log(n);const[b,j]=r.useState({accountName:n==null?void 0:n.account_name,bankName:n==null?void 0:n.bank_name,accountNumber:n==null?void 0:n.account_number});r.useEffect(()=>{j({accountName:n==null?void 0:n.account_name,bankName:n==null?void 0:n.bank_name,accountNumber:n==null?void 0:n.account_number})},[n]);const f=async t=>{try{const a=await A({...t});(a==null?void 0:a.ok)===!0&&v("Thông báo ","Cập nhật thông tin thành công","success")}catch{console.log("Thông báo","Cập nhật thất bại","error")}};return e.jsx(T,{title:"Cài đặt",children:e.jsx(N,{container:!0,justifyContent:"center",children:e.jsx(N,{item:!0,xs:12,md:6,children:e.jsx(w,{initialValues:b,validationSchema:q,onSubmit:f,children:({values:t,handleChange:a,handleBlur:s,handleSubmit:d,setFieldValue:c,errors:u,touched:i})=>(r.useEffect(()=>{c("accountName",n==null?void 0:n.account_name),c("accountNumber",n==null?void 0:n.account_number),c("bankName",n==null?void 0:n.bank_name)},[n,c]),e.jsx(E,{onSubmit:d,children:e.jsxs(_,{sx:{display:"flex",flexDirection:"column",gap:2},children:[e.jsx(y,{variant:"h4",align:"center",children:"Cài Đặt Tài Khoản Ngân Hàng"}),e.jsx(h,{name:"accountName",as:m,placeholder:"Tên Chủ Tài Khoản Ngân Hàng",variant:"outlined",fullWidth:!0,onChange:a,onBlur:s,value:t.accountName,helperText:e.jsx(g,{name:"accountName"}),error:i.accountName&&!!u.accountName}),e.jsx(h,{name:"bankName",as:m,placeholder:"Tên Ngân Hàng",variant:"outlined",fullWidth:!0,onChange:a,onBlur:s,value:t.bankName,helperText:e.jsx(g,{name:"bankName"}),error:i.bankName&&!!u.bankName}),e.jsx(h,{name:"accountNumber",as:m,placeholder:"Số Tài Khoản",variant:"outlined",fullWidth:!0,onChange:a,onBlur:s,value:t.accountNumber,helperText:e.jsx(g,{name:"accountNumber"}),error:i.accountNumber&&!!u.accountNumber}),e.jsx(S,{type:"submit",variant:"contained",color:"primary",children:"Cập Nhật"})]})}))})})})})};export{M as default};