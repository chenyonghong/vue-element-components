# vue-element-components

#### 介绍
基于Vue对Element-UI常用组件进行二次封装

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  ##### 下拉选择框BaseSelect:
    | 参数 | 类型 | 默认值 | 说明 |
    |--|--|--|--|
    | el-select-attrs | object | { <br/>&ensp;clearable: true,<br/>&ensp;multiple: false,<br/>&ensp;collapseTags: true<br/>} | elementUI el-select的配置参数，例如：multiple、value-key、placeholder等 |
    | itemProp | object | { value: "id", label: "name" } | 下拉选项主键、显示文本配置，例：{ value: "id", label: "name" } |
    | remoteFunc | function | - | 调用远端服务器的接口函数，需返回Promise |
    | remoteParams | - | - | 调用接口参数 |
    | remoteFormat | function | - | 远程数据格式化函数 |
    | autoRequest | boolean | true | 是否在初始化时自动请求数据 |
    | remoteParamsNullable | boolean | true | 接口参数是否可空 |
    | firstItem | object | - | 默认首项数据，例： { id: 0, name: "请选择" } |
    | updateDefaultValue | boolean | - | 选中值为对象时，是否自动更新默认值数据, 仅当配置了value-key时生效 |

    | 事件 | 说明 | 回调参数 |
    |--|--|--|
    | change | 选中项改变时触发 | 选中值 |
2.  ##### 树形控件BaseTree:
    | 参数 | 类型 | 默认值 | 说明 |
    |--|--|--|--|
    | el-tree-attrs | object | { <br/>&ensp;nodeKey: "id",<br/>&ensp;parentKey: "pid",<br/>&ensp;showCheckbox: true,<br/>&ensp;showCheckbox: true,<br/>&ensp;checkOnClickNode: true,<br/>&ensp;checkStrictly: true,<br/>&ensp;expandOnClickNode: false,<br/>&ensp;draggable: false,<br/>&ensp;defaultCheckedKeys: [],<br/>&ensp;defaultExpandedKeys: [],<br/>&ensp;props: {},<br/>&ensp;filterNodeMethod: ...,<br/>&ensp;load: ...<br/>
    &ensp;remoteFunc: ...,<br/>&ensp;remoteFormat: ...<br/>&ensp;renderBefore: ...,<br/>&ensp;renderAfter: ...<br/>&ensp;.<br/> &ensp;.<br/>&ensp;.<br/>} | elementUI el-tree的配置参数，预置了一些默认值，可自行修改 |
    | config | object | { <br/>&ensp;filter: true,<br/>&ensp;allExpand: true,<br/>&ensp;showCheckAll: false,<br/>&ensp;showCheckedNum: true,<br/>&ensp;subNodeNumber: {show:false,onlySon:false},<br/>&ensp;makeTreeFunc: ...,<br/>&ensp;filterWithChildNodes: true,<br/> } | 额外添加的自定义配置参数:<br/><br/>&ensp;filter: 是否显示搜索框（仅当使用默认搜索框生效，使用自定义slot时无效),<br/>&ensp;allExpand: 是否显示“全部展开/收起”功能,<br/>&ensp;showCheckAll: 是否显示全选框,<br/>&ensp;showCheckedNum: 是否显示选择节点数量（多选模式生效）,<br/>&ensp;subNodeNumber: 是否显示子节点数量（懒加载无效）,<br/>&ensp;remoteFunc: 同上,<br/>&ensp;remoteFormat: 同上,<br/>&ensp;makeTreeFunc: 造树函数,<br/>&ensp;filterWithChildNodes: 过滤节点时，是否显示匹配节点的子节点（懒加载无效）,<br/> |

    | 事件 | 说明 | 回调参数 |
    |--|--|--|
    | change | 选中项改变时触发 | 选中值 |
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
