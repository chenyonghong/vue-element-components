(function(t){function e(e){for(var r,o,d=e[0],v=e[1],i=e[2],_=0,u=[];_<d.length;_++)o=d[_],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&u.push(a[o][0]),a[o]=0;for(r in v)Object.prototype.hasOwnProperty.call(v,r)&&(t[r]=v[r]);s&&s(e);while(u.length)u.shift()();return l.push.apply(l,i||[]),n()}function n(){for(var t,e=0;e<l.length;e++){for(var n=l[e],r=!0,o=1;o<n.length;o++){var d=n[o];0!==a[d]&&(r=!1)}r&&(l.splice(e--,1),t=v(v.s=n[0]))}return t}var r={},o={app:0},a={app:0},l=[];function d(t){return v.p+"js/"+({about:"about"}[t]||t)+"."+{about:"829f053a"}[t]+".js"}function v(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,v),n.l=!0,n.exports}v.e=function(t){var e=[],n={about:1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=new Promise((function(e,n){for(var r="css/"+({about:"about"}[t]||t)+"."+{about:"f0ef294f"}[t]+".css",a=v.p+r,l=document.getElementsByTagName("link"),d=0;d<l.length;d++){var i=l[d],_=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(_===r||_===a))return e()}var u=document.getElementsByTagName("style");for(d=0;d<u.length;d++){i=u[d],_=i.getAttribute("data-href");if(_===r||_===a)return e()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=e,s.onerror=function(e){var r=e&&e.target&&e.target.src||a,l=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");l.code="CSS_CHUNK_LOAD_FAILED",l.request=r,delete o[t],s.parentNode.removeChild(s),n(l)},s.href=a;var c=document.getElementsByTagName("head")[0];c.appendChild(s)})).then((function(){o[t]=0})));var r=a[t];if(0!==r)if(r)e.push(r[2]);else{var l=new Promise((function(e,n){r=a[t]=[e,n]}));e.push(r[2]=l);var i,_=document.createElement("script");_.charset="utf-8",_.timeout=120,v.nc&&_.setAttribute("nonce",v.nc),_.src=d(t);var u=new Error;i=function(e){_.onerror=_.onload=null,clearTimeout(s);var n=a[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+r+": "+o+")",u.name="ChunkLoadError",u.type=r,u.request=o,n[1](u)}a[t]=void 0}};var s=setTimeout((function(){i({type:"timeout",target:_})}),12e4);_.onerror=_.onload=i,document.head.appendChild(_)}return Promise.all(e)},v.m=t,v.c=r,v.d=function(t,e,n){v.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},v.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},v.t=function(t,e){if(1&e&&(t=v(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(v.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)v.d(n,r,function(e){return t[e]}.bind(null,r));return n},v.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return v.d(e,"a",e),e},v.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},v.p="/",v.oe=function(t){throw console.error(t),t};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],_=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var s=_;l.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("a026"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"side-bar"},[t._m(0),n("div",{staticClass:"menu-list"},[n("router-link",{attrs:{to:"/"}},[t._v("Home")]),n("router-link",{attrs:{to:"/table"}},[t._v("表格")]),n("router-link",{attrs:{to:"/form"}},[t._v("表单")]),n("router-link",{attrs:{to:"/select"}},[t._v("下拉选择框")]),n("router-link",{attrs:{to:"/tree"}},[t._v("树形控件")]),n("router-link",{attrs:{to:"/dialog"}},[t._v("Dialog弹窗")])],1)]),n("div",{staticClass:"app-main"},[n("div",{staticClass:"nav-bar"},[n("el-dropdown",[n("span",{staticClass:"el-dropdown-link"},[n("i",{staticClass:"el-icon-user"}),t._v(" Admin "),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"a"}},[t._v("退出")])],1)],1)],1),n("div",{staticClass:"main-content"},[n("router-view")],1)])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"logo-container"},[n("p",[t._v("vue-element-components")])])}],l=(n("879f"),n("2877")),d={},v=Object(l["a"])(d,o,a,!1,null,"9f19fda2",null),i=v.exports,_=(n("d3b7"),n("8c4f")),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("my-markdown")],1)},s=[],c=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},p=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("h1",[t._v("vue-element-components")]),n("p",[t._v("演示地址："),n("a",{attrs:{href:"http://cyhv527.gitee.io/vue-element-components/#/table"}},[t._v("vue-element-components")])]),n("h4",[t._v("介绍")]),n("p",[t._v("本项目基于Vue，对Element-UI常用组件进行二次封装，提供后台管理系统中常用组件的开箱即用。部分组件在相应文件夹下提供了配置文件，稍微改动配置或部分代码即可实现常见业务需求。本项目只提供组件的封装使用，不提供后台管理系统模板，请自行搭建或搭配其它后台管理系统模板（如: "),n("a",{attrs:{href:"https://panjiachen.gitee.io/vue-element-admin-site/zh/"}},[t._v("vue-element-admin")]),t._v(")使用。")]),n("h4",[t._v("软件架构")]),n("ol",[n("li",[t._v("Vue.js")]),n("li",[t._v("element-ui")]),n("li",[t._v("axios（理论上兼容其它基于Promise的网络请求库)")])]),n("h4",[t._v("安装教程")]),n("p",[t._v("NPM:")]),n("ol",[n("li",[n("pre",{pre:!0},[n("code",{pre:!0,attrs:{"v-pre":""}},[t._v("npm install vue-element-components\n")])])]),n("li",[t._v("main.js引入vue-element-components:")])]),n("pre",{pre:!0},[n("code",{pre:!0,attrs:{"v-pre":""}},[t._v(' import VeComponents from "vue-element-components";\n import "element-ui/lib/theme-chalk/index.css";\n import "vue-element-components/lib/vue-element-components.css";\n Vue.use(VeComponents);\n')])]),n("ol",{attrs:{start:"3"}},[n("li",[t._v("引用组件。")])]),n("p",[t._v("克隆项目:")]),n("ol",[n("li",[t._v("下载或克隆本项目到本地；")]),n("li",[t._v("将根目录下packages文件夹内文件及其它依赖文件拷贝到开发项目中；")]),n("li",[t._v("配置组件默认参数，或根据自身需求修改源码；")]),n("li",[t._v("引用组件。")])]),n("h4",[t._v("使用说明")]),n("ol",[n("li",[n("h5",[t._v("下拉选择框VeSelect:")]),n("table",[n("thead",[n("tr",[n("th",[t._v("参数")]),n("th",[t._v("类型")]),n("th",[t._v("默认值")]),n("th",[t._v("说明")])])]),n("tbody",[n("tr",[n("td",[t._v("el")]),n("td",[t._v("object")]),n("td",[t._v("见defaultSettings文件")]),n("td",[t._v("el-select参数")])]),n("tr",[n("td",[t._v("config")]),n("td",[t._v("object")]),n("td",[t._v("见defaultSettings文件")]),n("td",[t._v("拓展的配置参数")])]),n("tr",[n("td",[t._v("remoteFunc")]),n("td",[t._v("function")]),n("td",[t._v("-")]),n("td",[t._v("调用远端服务器的接口函数，需返回Promise")])]),n("tr",[n("td",[t._v("remoteParams")]),n("td",[t._v("-")]),n("td",[t._v("-")]),n("td",[t._v("调用接口参数")])]),n("tr",[n("td",[t._v("remoteFormat")]),n("td",[t._v("function")]),n("td",[t._v("-")]),n("td",[t._v("远程数据格式化函数")])])])]),n("table",[n("thead",[n("tr",[n("th",[t._v("事件")]),n("th",[t._v("说明")]),n("th",[t._v("回调参数")])])]),n("tbody",[n("tr",[n("td",[t._v("change")]),n("td",[t._v("选中项改变时触发")]),n("td",[t._v("选中值")])])])]),n("h6",[t._v("Scoped Slot:")]),n("table",[n("thead",[n("tr",[n("th",[t._v("name")]),n("th",[t._v("说明")]),n("th",[t._v("参数")])])]),n("tbody",[n("tr",[n("td",[t._v("-")]),n("td",[t._v("Option 组件列表（同element官方）")]),n("td",[t._v("scope：选项数据")])])])])]),n("li",[n("h5",[t._v("树形控件VeTree:")]),n("table",[n("thead",[n("tr",[n("th",[t._v("参数")]),n("th",[t._v("类型")]),n("th",[t._v("默认值")]),n("th",[t._v("说明")])])]),n("tbody",[n("tr",[n("td",[t._v("el")]),n("td",[t._v("object")]),n("td",[t._v("见defaultSettings文件")]),n("td",[t._v("elementUI el-tree的配置参数")])]),n("tr",[n("td",[t._v("config")]),n("td",[t._v("object")]),n("td",[t._v("见defaultSettings文件")]),n("td",[t._v("拓展的配置参数")])])])]),n("table",[n("thead",[n("tr",[n("th",[t._v("事件")]),n("th",[t._v("说明")]),n("th",[t._v("回调参数")])])]),n("tbody",[n("tr",[n("td",[t._v("select")]),n("td",[t._v("选中节点改变时触发")]),n("td",[t._v("选中节点数据")])])])]),n("table",[n("thead",[n("tr",[n("th",[t._v("属性")]),n("th",[t._v("说明")])])]),n("tbody",[n("tr",[n("td",[t._v("ref_eltree")]),n("td",[t._v("element-tree实例引用")])])])]),n("table",[n("thead",[n("tr",[n("th",[t._v("方法")]),n("th",[t._v("说明")]),n("th",[t._v("参数")])])]),n("tbody",[n("tr",[n("td",[t._v("addNode")]),n("td",[t._v("往指定节点添加子节点，相当于element-tree的append")]),n("td",[t._v("(nodeData, parentNode) 1.添加的节点数据，2.添加节点的父节点")])]),n("tr",[n("td",[t._v("updateNode")]),n("td",[t._v("更新指定节点数据")]),n("td",[t._v("(nodeData) 添加的节点数据（必须带node-key字段）")])]),n("tr",[n("td",[t._v("deleteNode")]),n("td",[t._v("删除指定节点")]),n("td",[t._v("(dataId) 删除节点的node-key值")])]),n("tr",[n("td",[t._v("search")]),n("td",[t._v("节点搜索")]),n("td",[t._v("(keyword) 关键词")])]),n("tr",[n("td",[t._v("toggleExpand")]),n("td",[t._v("切换全部展开/收起")]),n("td",[t._v("-")])])])]),n("h6",[t._v("Scoped Slot:")]),n("table",[n("thead",[n("tr",[n("th",[t._v("name")]),n("th",[t._v("说明")]),n("th",[t._v("参数")])])]),n("tbody",[n("tr",[n("td",[t._v("search")]),n("td",[t._v("自定义搜索框,需手动调用search")]),n("td",[t._v("-")])]),n("tr",[n("td",[t._v("self-tool-bar")]),n("td",[t._v("自定义工具栏内容")]),n("td",[t._v("-")])]),n("tr",[n("td",[t._v("node-append")]),n("td",[t._v("节点额外添加内容，如操作菜单等")]),n("td",[t._v("-")])])])]),n("h6",[t._v("其它说明：")]),n("p",[t._v("1). 若覆盖element-tree中的懒加载load方法，则搜索方法也需自定义；")])]),n("li",[n("h5",[t._v("表格VeTable")]),n("table",[n("thead",[n("tr",[n("th",[t._v("参数")]),n("th",[t._v("类型")]),n("th",[t._v("默认值")]),n("th",[t._v("说明")])])]),n("tbody",[n("tr",[n("td",[t._v("config")]),n("td",[t._v("object")]),n("td",[t._v("见defaultSettings文件")]),n("td",[t._v("拓展的表格配置参数")])]),n("tr",[n("td",[t._v("requestConf")]),n("td",[t._v("object")]),n("td",[t._v("见defaultSettings文件")]),n("td",[t._v("后端接口请求和数据格式化相关配置")])]),n("tr",[n("td",[t._v("columns")]),n("td",[t._v("array")]),n("td"),n("td",[t._v("表格列配置参数，支持el-table-columns中的所有参数，另额外新增："),n("br"),t._v(" 1.hidden: 布尔类型，是否隐藏该列（通常用于表格列自定义显示），"),n("br"),t._v("2.alwaysShow: 布尔型，是否常驻该列（通常用于表格列自定义显示），"),n("br"),t._v("3.template: 字符串类型，自定义渲染html模板，支持事件绑定，需引入文件夹下eventBus并监听，"),n("br"),t._v("4.component: 自定义Vue组件，组件内获取表格数据用props属性scope接收")])]),n("tr",[n("td",[t._v("el")]),n("td",[t._v("object")]),n("td",[t._v("见defaultSettings文件")]),n("td",[t._v("attrs：el-table属性，events：el-table事件")])])])]),n("table",[n("thead",[n("tr",[n("th",[t._v("事件")]),n("th",[t._v("说明")]),n("th",[t._v("参数")])])]),n("tbody",[n("tr",[n("td",[t._v("refresh(boolean)")]),n("td",[t._v("刷新表格数据")]),n("td",[t._v("传入布尔型参数表示是否重置页码")])]),n("tr",[n("td",[t._v("setTableData(array)")]),n("td",[t._v("更新表格数据，一般用于本地分页")]),n("td",[t._v("需要显示的表格数据，数组类型")])])])]),n("h6",[t._v("Scoped Slot:")]),n("table",[n("thead",[n("tr",[n("th",[t._v("name")]),n("th",[t._v("说明")]),n("th",[t._v("参数")])])]),n("tbody",[n("tr",[n("td",[t._v("handler")]),n("td",[t._v("表格上方操作栏内容")]),n("td",[t._v("-")])]),n("tr",[n("td",[t._v("defuault")]),n("td",[t._v("表格列数据")]),n("td",[t._v("-")])])])]),n("h6",[t._v("其它说明：")]),n("ol",[n("li",[t._v("如何获取el-table属性和调用el-table自带方法？获取你VeTable内的elTable引用即可拿到el-table实例。例:this.$refs['你的Vetable引用名'].ref_eltable;")]),n("li",[t._v("表格列数据设置支持el-table原有的slot方式和配置columns参数方式，后者一般用于动态表格列显示；")]),n("li",[t._v("在使用columns配置表格时，如果使用template属性渲染单元格内容并绑定事件，需引入Table文件夹内的eventBus并绑定相应事件；")]),n("li",[t._v("表格列配置数据既可保存在浏览器本地也可以发送到远端服务器，并支持两种方案的初始化列数据显示，修改TableColumnFilter.vue获取和保存数据相关代码即可")])])]),n("li",[n("h5",[t._v("表单VeForm")]),n("p",[t._v("文档未更新，详见代码使用示例")])]),n("li",[n("h5",[t._v("弹窗VeDialog")]),n("p",[t._v("文档未更新，详见代码使用示例")])])]),n("h4",[t._v("参与贡献")]),n("ol",[n("li",[t._v("Fork 本仓库")]),n("li",[t._v("新建 Feat_xxx 分支")]),n("li",[t._v("提交代码")]),n("li",[t._v("新建 Pull Request")])])])}],h={},m=Object(l["a"])(h,c,p,!1,null,null,null),f=m.exports,b={components:{myMarkdown:f}},g=b,y=Object(l["a"])(g,u,s,!1,null,null,null),w=y.exports;r["default"].use(_["a"]);var S=[{path:"/",name:"Home",component:w},{path:"/select",name:"BaseSelect",component:function(){return n.e("about").then(n.bind(null,"6f9e"))}},{path:"/tree",name:"BaseTree",component:function(){return n.e("about").then(n.bind(null,"69dd"))}},{path:"/table",name:"VeTable",component:function(){return n.e("about").then(n.bind(null,"90fe"))}},{path:"/table2",name:"VeTable2",component:function(){return n.e("about").then(n.bind(null,"e085"))}},{path:"/form",name:"VeForm",component:function(){return n.e("about").then(n.bind(null,"371d"))}},{path:"/dialog",name:"VeDialog",component:function(){return n.e("about").then(n.bind(null,"1900"))}}],j=new _["a"]({routes:S}),k=j,C=n("2f62");r["default"].use(C["a"]);var T=new C["a"].Store({state:{},mutations:{},actions:{},modules:{}}),V=(n("5717"),n("5c96")),x=n.n(V);n("0fae");r["default"].use(x.a),r["default"].config.productionTip=!1,new r["default"]({router:k,store:T,render:function(t){return t(i)}}).$mount("#app")},5717:function(t,e,n){},"837f":function(t,e,n){},"879f":function(t,e,n){"use strict";n("837f")}});
//# sourceMappingURL=app.5effa413.js.map