(this.webpackJsonpphonebookproject=this.webpackJsonpphonebookproject||[]).push([[0],{16:function(e,n,t){e.exports=t(39)},21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(15),u=t.n(c),o=t(2),l=function(e){var n=e.text;return r.a.createElement("h1",null,n)},i=function(e){var n=e.name,t=e.number,a=e.children;return r.a.createElement("p",null,n," ",t," ",a)},m=function(e){var n=e.text,t=e.handleClick,a=e.id;return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:t},n," ",a))},s=function(e){var n=e.handleChange,t=e.name,a=e.value;return r.a.createElement("div",null,t,r.a.createElement("input",{onChange:n,name:t,value:a}))},f=function(e){var n=e.search,t=e.setSearch;return r.a.createElement(r.a.Fragment,null,r.a.createElement(l,{text:"Find contact"}),r.a.createElement(s,{name:"name",handleChange:function(e){t(e.target.value)},value:n}))},d=t(4),h=t(5),p=function(e){var n=e.persons,t=e.handleUpdate,c=e.handleCreate,u=Object(a.useState)({name:"",number:""}),i=Object(o.a)(u,2),f=i[0],p=i[1],E=function(e){var n=e.target,t=n.value,a=n.name;p(Object(h.a)(Object(h.a)({},f),{},Object(d.a)({},a,t)))};return r.a.createElement(r.a.Fragment,null,r.a.createElement(l,{text:"New contact"}),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=n.find((function(e){return e.name.toUpperCase()===f.name.toUpperCase()})),r={name:f.name,number:f.number};a?window.confirm("Contact already exists. Replace the existing data with current input?")&&t(r):c(r),p({name:"",number:""})}},r.a.createElement(s,{name:"name",handleChange:E,value:f.name}),r.a.createElement(s,{name:"number",handleChange:E,value:f.number}),r.a.createElement(m,{type:"submit",text:"add"})))},E=function(e){var n=e.persons,t=e.handleDelete,a=n.map((function(e,n){return r.a.createElement(i,{name:e.name,number:e.number,key:e.name},r.a.createElement(m,{text:"Delete",handleClick:function(){return t(e.name)}}))}));return r.a.createElement(r.a.Fragment,null,r.a.createElement(l,{text:"Contacts"}),a)},g=function(e){var n=e.message,t="msg";return!0===n.isErr&&(t="error"),null===n.message?null:r.a.createElement("div",{className:t},n.message)},v=(t(21),t(3)),b=t.n(v),C="http://localhost:3001/api/persons",j=function(){return b.a.get(C).then((function(e){return e.data}))},O=function(e){return b.a.post(C,e).then((function(e){return e.data}))},x=function(e,n){return b.a.put("".concat(C,"/").concat(e),n).then((function(e){return e.data}))},k=function(e){return b.a.delete("".concat(C,"/").concat(e)).then((function(e){return e.data}))},w=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),l=Object(o.a)(u,2),i=l[0],m=l[1],s=Object(a.useState)({isErr:!1,message:null}),d=Object(o.a)(s,2),h=d[0],v=d[1];Object(a.useEffect)((function(){j().then((function(e){c(e)}))}),[]);var b=i.length>0?t.filter((function(e){return!e.name.toUpperCase().indexOf(i.toUpperCase())})):t;return r.a.createElement("div",null,r.a.createElement(f,{search:i,setSearch:m}),r.a.createElement(p,{persons:t,handleCreate:function(e){O(e).then((function(n){c(t.concat(e)),v({isErr:!1,message:"".concat(e.name," added to contact list.")}),setTimeout((function(){v({isErr:void 0,message:null})}),5e3)}))},handleUpdate:function(e){var n=t.filter((function(n){return n.name===e.name}))[0];x(n,e).then((function(){c(t.map((function(n){return n.id!==e.id?n:e}))),v({isErr:!1,message:"".concat(e.name," data updated.")})})).catch((function(n){v({isErr:!0,message:"".concat(e.name," already deleted")}),c(t.filter((function(n){return n.id!==e.id}))),setTimeout((function(){v({isErr:void 0,message:null})}),5e3)}))}}),r.a.createElement(E,{persons:b,search:i,handleDelete:function(e){var n=t.filter((function(n){return n.name!==e})),a=t.filter((function(n){return n.name===e}))[0];console.log(a),window.confirm("Delete ".concat(a.name,"?"))&&k(a.id).then((function(){c(n),v({isErr:!1,message:"".concat(e," deleted from contact list.")}),setTimeout((function(){v({isErr:void 0,message:null})}),5e3)})).catch((function(e){v({isErr:!0,message:"Contact is already deleted"}),c(n)}))}}),r.a.createElement(g,{message:h,setMessage:v}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.6e7fbacc.chunk.js.map