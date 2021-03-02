(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{109:function(e,t,n){e.exports=n(142)},114:function(e,t,n){},115:function(e,t,n){},142:function(e,t,n){"use strict";n.r(t),n.d(t,"history",(function(){return Me}));var a=n(0),r=n.n(a),c=n(9),i=n.n(c);n(114),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o,l=n(33),u=(n(115),n(185)),s=n(186),d=n(187),f=n(178),m=n(146),E=n(145),O=n(189),T=n(190),S=n(188),b=n(7),I=n(61),p=n(83),j=n.n(p).a.create(Object(b.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"89e8e364-2267-45f8-866b-f315992878e1"}})),g=function(e,t){return j.put("todo-lists/".concat(e),{title:t})},h=function(e){return j.delete("todo-lists/".concat(e))},_=function(e){return j.post("todo-lists",{title:e})},A=function(){return j.get("todo-lists")},v=function(e){return j.post("auth/login",e)},D=function(){return j.delete("auth/login")},L=function(){return j.get("auth/me")},y=function(e,t){e.messages.length?t(P(e.messages[0])):t(P("Some error occurred")),t(G("failed"))},C=function(e,t){t(P(e.message)),t(G("failed"))};!function(e){e.SET_IS_LOGGED_IN="AUTH/SET-IS-LOGGED-IN"}(o||(o={}));var k,N={isLoggedIn:!1},w=function(e){return{type:o.SET_IS_LOGGED_IN,value:e}};!function(e){e.SET_STATUS="APP/SET-STATUS",e.SET_ERROR="APP/SET-ERROR",e.SET_IS_INITIALIZED="APP/SET_IS_INITIALIZED"}(k||(k={}));var R,K={status:"idle",error:null,isInitialized:!1},G=function(e){return{type:k.SET_STATUS,status:e}},P=function(e){return{type:k.SET_ERROR,error:e}},U=function(){return function(e){L().then((function(t){var n;0===t.data.resultCode?e(w(!0)):y(t.data,e),e((n=!0,{type:k.SET_IS_INITIALIZED,isInitialized:n}))})).catch((function(t){C(t,e)}))}};!function(e){e.REMOVE_TODOLIST="TODOLISTS/REMOVE-TODOLIST",e.ADD_TODOLIST="TODOLISTS/ADD-TODOLIST",e.CHANGE_TODOLIST_TITLE="TODOLISTS/CHANGE-TODOLIST-TITLE",e.CHANGE_TODOLIST_FILTER="TODOLISTS/CHANGE-TODOLIST-FILTER",e.SET_TODOLISTS="TODOLISTS/REDSET_TODOLISTS",e.CHANGE_TODOLIST_ENTITY_STATUS="APP/CHANGE-TODOLIST-ENTITY-STATUS"}(R||(R={}));var H,M,F=[],V=function(e,t){return{type:R.CHANGE_TODOLIST_FILTER,id:e,filter:t}},x=function(){return function(e){e(G("loading")),A().then((function(t){var n;e((n=t.data,{type:R.SET_TODOLISTS,todolists:n})),e(G("succeeded"))}))}},Y=function(e){return function(t){t(G("loading")),t(function(e,t){return{type:R.CHANGE_TODOLIST_ENTITY_STATUS,id:e,entityStatus:t}}(e,"loading")),h(e).then((function(n){0===n.data.resultCode?(t(function(e){return{type:R.REMOVE_TODOLIST,id:e}}(e)),t(G("succeeded"))):y(n.data,t)})).catch((function(e){C(e,t)}))}},Z=function(e){return function(t){t(G("loading")),_(e).then((function(e){var n;0===e.data.resultCode?t((n=e.data.data.item,{type:R.ADD_TODOLIST,todolist:n})):y(e.data,t)})).catch((function(e){C(e,t)}))}},z=function(e,t){return function(n){n(G("loading")),g(e,t).then((function(a){0===a.data.resultCode?(n(function(e,t){return{type:R.CHANGE_TODOLIST_TITLE,id:e,title:t}}(e,t)),n(G("succeeded"))):y(a.data,n)})).catch((function(e){C(e,n)}))}},q=n(13),B=n(182),J=n(193),W=n(144),X=n(44),$=n(191),Q=n(179),ee=r.a.memo((function(e){var t=Object(a.useState)(""),n=Object(X.a)(t,2),c=n[0],i=n[1],o=Object(a.useState)(null),l=Object(X.a)(o,2),u=l[0],s=l[1],d=function(){""!==c.trim()?(e.addItem(c),i("")):s("Field is required")};return r.a.createElement("div",null,r.a.createElement($.a,{variant:"outlined",size:"small",label:"Title",value:c,onChange:function(e){i(e.currentTarget.value)},onKeyPress:function(e){null!==u&&s(null),e.ctrlKey&&"Enter"===e.key&&d()},helperText:u,error:!!u,disabled:e.disabled}),r.a.createElement(f.a,{onClick:d,color:"primary",disabled:e.disabled},r.a.createElement(Q.a,null)))})),te=r.a.memo((function(e){var t=Object(a.useState)(!1),n=Object(X.a)(t,2),c=n[0],i=n[1],o=Object(a.useState)(e.title),l=Object(X.a)(o,2),u=l[0],s=l[1];return c?r.a.createElement($.a,{value:u,onChange:function(e){return s(e.currentTarget.value)},onBlur:function(){i(!1),e.onChange(u)},autoFocus:!0}):r.a.createElement("span",{onDoubleClick:function(){e.disabled||i(!0)}}," ",e.title," ")})),ne=n(181),ae=n(180),re=n(95),ce=n(29);!function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(H||(H={})),function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(M||(M={}));var ie,oe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return j.get("todo-lists/".concat(e,"/tasks?count=").concat(t,"&page=").concat(n))},le=function(e,t){return j.post("todo-lists/".concat(e,"/tasks"),{title:t})},ue=function(e,t){return j.delete("todo-lists/".concat(e,"/tasks/").concat(t))},se=function(e,t,n){return j.put("todo-lists/".concat(e,"/tasks/").concat(t),n)};!function(e){e.REMOVE_TASK="TASKS/REMOVE-TASK",e.ADD_TASK="TASKS/ADD-TASK",e.UPDATE_TASK="TASKS/CHANGE-STATUS-TASK",e.SET_TASKS="TASKS/SET-TASKS",e.CHANGE_TASK_ENTITY_STATUS="APP/CHANGE-TASK-ENTITY-STATUS"}(ie||(ie={}));var de={},fe=function(e,t,n){return{type:ie.CHANGE_TASK_ENTITY_STATUS,id:e,status:t,todolistId:n}},me=function(e){return function(t){t(G("loading")),oe(e).then((function(n){t(function(e,t){return{type:ie.SET_TASKS,tasks:e,todolistId:t}}(n.data.items,e)),t(G("succeeded"))})).catch((function(e){C(e,t)}))}},Ee=function(e,t){return function(n){n(G("loading")),le(e,t).then((function(e){var t;0===e.data.resultCode?(n((t=e.data.data.item,{type:ie.ADD_TASK,task:t})),n(G("succeeded"))):y(e.data,n)})).catch((function(e){C(e,n)}))}},Oe=function(e,t){return function(n){n(G("loading")),n(fe(t,"loading",e)),ue(e,t).then((function(a){var r,c;0===a.data.resultCode?(n((r=e,c=t,{type:ie.REMOVE_TASK,taskID:c,todoListID:r})),n(G("succeeded"))):y(a.data,n)})).catch((function(e){C(e,n)}))}},Te=function(e,t,n){return function(a,r){var c=r().tasks[e].find((function(e){return e.id===t}));c&&(a(G("loading")),a(fe(t,"loading",e)),se(e,t,Object(b.a)({title:c.title,status:c.status,startDate:c.startDate,priority:c.priority,description:c.description,deadline:c.deadline},n)).then((function(r){0===r.data.resultCode?(a(function(e,t,n){return{type:ie.UPDATE_TASK,domainModel:t,taskID:e,todoListID:n}}(t,n,e)),a(G("succeeded")),a(fe(t,"idle",e))):y(r.data,a)})).catch((function(e){C(e,a)})))}},Se=n(195),be=r.a.memo((function(e){var t=e.task,n=e.todolistId,c=e.disabled,i=Object(q.b)(),o=Object(a.useCallback)((function(e){i(Te(n,t.id,{title:e}))}),[]);return r.a.createElement("li",{key:t.id,className:t.status===M.Completed?"is-done":""},r.a.createElement(Se.a,{checked:t.status===M.Completed,color:"primary",onChange:function(e){i(Te(n,t.id,{status:e.currentTarget.checked?M.Completed:M.New}))},disabled:c||"loading"===t.entityStatus}),r.a.createElement(te,{title:t.title,onChange:o,disabled:c||"loading"===t.entityStatus}),r.a.createElement(f.a,{onClick:function(){i(Oe(n,t.id))},disabled:c||"loading"===t.entityStatus},r.a.createElement(ae.a,null)))})),Ie=r.a.memo((function(e){var t=e.demo,n=void 0!==t&&t,c=Object(l.a)(e,["demo"]);Object(a.useEffect)((function(){n||i(me(c.id))}),[]);var i=Object(q.b)(),o=Object(q.c)((function(e){return e.todolists.filter((function(e){return e.id===c.id}))[0]})),u=Object(q.c)((function(e){return e.tasks[c.id]})),s=pe(u,o.filter),d=Object(a.useCallback)((function(e){i(Ee(o.id,e))}),[]),m=Object(a.useCallback)((function(){return i(V(o.id,"all"))}),[]),O=Object(a.useCallback)((function(){return i(V(o.id,"active"))}),[]),T=Object(a.useCallback)((function(){return i(V(o.id,"completed"))}),[]),S=Object(a.useCallback)((function(e){return i(z(o.id,e))}),[]);return r.a.createElement("div",null,r.a.createElement("h3",null,r.a.createElement(te,{title:o.title,onChange:S,disabled:"loading"===o.entityStatus}),r.a.createElement(f.a,{onClick:function(){i(Y(o.id))},disabled:"loading"===o.entityStatus},r.a.createElement(ae.a,null))),r.a.createElement(ee,{addItem:d,disabled:"loading"===o.entityStatus}),r.a.createElement("ul",{style:{listStyleType:"none",paddingLeft:"0"}},s.map((function(e){return r.a.createElement(be,{key:e.id,task:e,todolistId:o.id,disabled:"loading"===o.entityStatus})}))),r.a.createElement("div",null,r.a.createElement(ne.a,null,r.a.createElement(E.a,{variant:"all"===o.filter?"contained":"text",color:"default",onClick:m,className:"all"===o.filter?"active-filter":""},"All"),r.a.createElement(E.a,{variant:"active"===o.filter?"contained":"text",color:"primary",onClick:O,className:"active"===o.filter?"active-filter":""},"Active"),r.a.createElement(E.a,{variant:"completed"===o.filter?"contained":"text",color:"secondary",onClick:T,className:"completed"===o.filter?"active-filter":""},"Completed"))))})),pe=function(e,t){return"completed"===t?e.filter((function(e){return e.status=M.Completed})):"active"===t?e.filter((function(e){return e.status=M.New})):e},je=n(94),ge=function(e){var t=e.demo,n=void 0!==t&&t;Object(l.a)(e,["demo"]);Object(a.useEffect)((function(){!n&&i&&c(x())}),[]);var c=Object(q.b)(),i=Object(q.c)((function(e){return e.auth.isLoggedIn})),o=Object(q.c)((function(e){return e.todolists})),u=Object(a.useCallback)((function(e){c(Z(e))}),[]);return i?r.a.createElement(r.a.Fragment,null,r.a.createElement(B.a,{container:!0},r.a.createElement(J.a,{p:2,pl:0},r.a.createElement(ee,{addItem:u}))),r.a.createElement(B.a,{container:!0,spacing:3},o.map((function(e){return r.a.createElement(B.a,{item:!0,key:e.id},r.a.createElement(W.a,null,r.a.createElement(J.a,{p:2},r.a.createElement(Ie,{key:e.id,id:e.id,demo:n}))))})))):r.a.createElement(je.a,{to:"/login"})},he=n(197),_e=n(194);function Ae(e){return r.a.createElement(_e.a,Object.assign({elevation:6,variant:"filled"},e))}function ve(){var e=Object(q.b)(),t=Object(q.c)((function(e){return e.app.error})),n=function(t,n){"clickaway"!==n&&e(P(null))},a=null!==t;return r.a.createElement(he.a,{open:a,autoHideDuration:6e3,onClose:n},r.a.createElement(Ae,{onClose:n,severity:"error"},t))}var De=n(198),Le=n(177),ye=n(183),Ce=n(184),ke=n(93),Ne=function(){var e=Object(q.b)(),t=Object(q.c)((function(e){return e.auth.isLoggedIn})),n=Object(ke.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password?e.password.length<=3&&(t.password="Must be more characters than 3"):t.password="Required",t},onSubmit:function(t){var a;e((a=Object(b.a)({},t),function(e){e(G("loading")),v(a).then((function(t){0===t.data.resultCode?(e(w(!0)),e(G("succeeded"))):y(t.data,e)})).catch((function(t){C(t,e)}))})),n.resetForm()}});return t?r.a.createElement(je.a,{to:"/"}):r.a.createElement(B.a,{container:!0,justify:"center"},r.a.createElement(B.a,{item:!0,xs:4},r.a.createElement("form",{onSubmit:n.handleSubmit},r.a.createElement(De.a,null,r.a.createElement(Le.a,null,r.a.createElement("p",null,"To log in get registered",r.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),r.a.createElement("p",null,"or use common test account credentials:"),r.a.createElement("p",null,"Email: free@samuraijs.com"),r.a.createElement("p",null,"Password: free")),r.a.createElement(ye.a,null,r.a.createElement($.a,Object.assign({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.touched.email&&n.errors.email?r.a.createElement("div",{style:{color:"red"}},n.errors.email):null,r.a.createElement($.a,Object.assign({type:"password",label:"Password",margin:"normal"},n.getFieldProps("password"))),n.touched.password&&n.errors.password?r.a.createElement("div",{style:{color:"red"}},n.errors.password):null,r.a.createElement(Ce.a,{label:"Remember me",control:r.a.createElement(Se.a,n.getFieldProps("rememberMe"))}),r.a.createElement(E.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))},we=function(e){var t=e.demo,n=void 0!==t&&t,c=(Object(l.a)(e,["demo"]),Object(q.b)()),i=Object(q.c)((function(e){return e.app.status})),o=Object(q.c)((function(e){return e.app.isInitialized})),b=Object(q.c)((function(e){return e.auth.isLoggedIn}));Object(a.useEffect)((function(){c(U())}),[]);var I=Object(a.useCallback)((function(){Me.push("/login")}),[]),p=Object(a.useCallback)((function(){c((function(e){e(G("loading")),D().then((function(t){0===t.data.resultCode?(e(w(!1)),e(G("succeeded"))):y(t.data,e)})).catch((function(t){C(t,e)}))}))}),[]);return o?r.a.createElement("div",{className:"App"},r.a.createElement(ve,null),r.a.createElement(s.a,{position:"static"},r.a.createElement(d.a,null,r.a.createElement(f.a,{edge:"start",color:"inherit","aria-label":"menu"},r.a.createElement(S.a,null)),r.a.createElement(m.a,{variant:"h6"},"News"),!b&&r.a.createElement(E.a,{color:"inherit",onClick:I},"Login"),b&&r.a.createElement(E.a,{color:"inherit",onClick:p},"Log out")),"loading"===i&&r.a.createElement(O.a,null)),r.a.createElement(T.a,{fixed:!0},r.a.createElement(je.d,null,r.a.createElement(je.b,{path:"/",exact:!0,render:function(){return r.a.createElement(ge,{demo:n})}}),r.a.createElement(je.b,{path:"/login",render:function(){return r.a.createElement(Ne,null)}}),r.a.createElement(je.b,{path:"/404",render:function(){return r.a.createElement("h1",null,"404: PAGE NOT FOUND")}}),r.a.createElement(je.b,{path:"*",render:function(){return r.a.createElement(je.a,{to:"/404"})}})))):r.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},r.a.createElement(u.a,null))},Re=n(41),Ke=n(91),Ge=Object(Re.c)({todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case R.REMOVE_TODOLIST:return e.filter((function(e){return e.id!==t.id}));case R.ADD_TODOLIST:return[Object(b.a)(Object(b.a)({},t.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(I.a)(e));case R.CHANGE_TODOLIST_TITLE:return e.map((function(e){return e.id===t.id?Object(b.a)(Object(b.a)({},e),{},{title:t.title}):e}));case R.CHANGE_TODOLIST_FILTER:return e.map((function(e){return e.id===t.id?Object(b.a)(Object(b.a)({},e),{},{filter:t.filter}):e}));case R.SET_TODOLISTS:return t.todolists.map((function(e){return Object(b.a)(Object(b.a)({},e),{},{filter:"all",entityStatus:"idle"})}));case R.CHANGE_TODOLIST_ENTITY_STATUS:return e.map((function(e){return e.id===t.id?Object(b.a)(Object(b.a)({},e),{},{entityStatus:t.entityStatus}):e}));default:return e}},tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ie.SET_TASKS:return Object(b.a)(Object(b.a)({},e),{},Object(ce.a)({},t.todolistId,t.tasks.map((function(e){return Object(b.a)(Object(b.a)({},e),{},{entityStatus:"idle"})}))));case ie.REMOVE_TASK:return Object(b.a)(Object(b.a)({},e),{},Object(ce.a)({},t.todoListID,e[t.todoListID].filter((function(e){return e.id!==t.taskID}))));case ie.ADD_TASK:return Object(b.a)(Object(b.a)({},e),{},Object(ce.a)({},t.task.todoListId,[Object(b.a)(Object(b.a)({},t.task),{},{entityStatus:"idle"})].concat(Object(I.a)(e[t.task.todoListId]))));case ie.UPDATE_TASK:return Object(b.a)(Object(b.a)({},e),{},Object(ce.a)({},t.todoListID,e[t.todoListID].map((function(e){return e.id===t.taskID?Object(b.a)(Object(b.a)({},e),t.domainModel):e}))));case ie.CHANGE_TASK_ENTITY_STATUS:return Object(b.a)(Object(b.a)({},e),{},Object(ce.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.id?Object(b.a)(Object(b.a)({},e),{},{entityStatus:t.status}):e}))));case R.ADD_TODOLIST:return Object(b.a)(Object(b.a)({},e),{},Object(ce.a)({},t.todolist.id,[]));case R.REMOVE_TODOLIST:var n=t.id,a=(e[n],Object(l.a)(e,[n].map(re.a)));return Object(b.a)({},a);case R.SET_TODOLISTS:var r=Object(b.a)({},e);return t.todolists.forEach((function(e){r[e.id]=[]})),r;default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case k.SET_STATUS:return Object(b.a)(Object(b.a)({},e),{},{status:t.status});case k.SET_ERROR:return Object(b.a)(Object(b.a)({},e),{},{error:t.error});case k.SET_IS_INITIALIZED:return Object(b.a)(Object(b.a)({},e),{},{isInitialized:t.isInitialized});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case o.SET_IS_LOGGED_IN:return Object(b.a)(Object(b.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),Pe=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose,Ue=Object(Re.d)(Ge,Pe(Object(Re.a)(Ke.a)));window.store=Ue;var He=n(92),Me=n.n(He)()();i.a.render(r.a.createElement(q.a,{store:Ue},r.a.createElement(je.c,{history:Me},r.a.createElement(we,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[109,1,2]]]);
//# sourceMappingURL=main.d7d5ac53.chunk.js.map