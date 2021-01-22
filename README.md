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

1.  ##### 下拉选择框VeSelect:
    | 参数         | 类型                | 默认值                                  | 说明               |
    | ------------ | ------------------- | --------------------------------------- | ------------------ |
    | el           | object              | 见defaultSettings文件                   | el-select参数      |
    | config       | object              | 见defaultSettings文件                   | 拓展的配置参数     |
    | remoteFunc   | function           ｜         - | 调用远端服务器的接口函数，需返回Promise |
    | remoteParams | -                   | -                                       | 调用接口参数       |
    | remoteFormat | function            | -                                       | 远程数据格式化函数 |

    | 事件   | 说明             | 回调参数 |
    | ------ | ---------------- | -------- |
    | change | 选中项改变时触发 | 选中值   |

    ###### Scoped Slot:
    | name | 说明                             | 参数            |
    | ---- | -------------------------------- | --------------- |
    | -    | Option 组件列表（同element官方） | scope：选项数据 |
2.  ##### 树形控件VeTree:
    | 参数   | 类型   | 默认值                | 说明                        |
    | ------ | ------ | --------------------- | --------------------------- |
    | el     | object | 见defaultSettings文件 | elementUI el-tree的配置参数 |
    | config | object | 见defaultSettings文件 | 拓展的配置参数              |

    | 事件   | 说明               | 回调参数     |
    | ------ | ------------------ | ------------ |
    | select | 选中节点改变时触发 | 选中节点数据 |

    | 属性       | 说明                 |
    | ---------- | -------------------- |
    | eltree_ref | element-tree实例引用 |

    | 方法         | 说明                                             | 参数                                                        |
    | ------------ | ------------------------------------------------ | ----------------------------------------------------------- |
    | addNode      | 往指定节点添加子节点，相当于element-tree的append | (nodeData, parentNode) 1.添加的节点数据，2.添加节点的父节点 |
    | updateNode   | 更新指定节点数据                                 | (nodeData) 添加的节点数据（必须带node-key字段）             |
    | deleteNode   | 删除指定节点                                     | (dataId) 删除节点的node-key值                               |
    | search       | 节点搜索                                         | (keyword) 关键词                                            |
    | toggleExpand | 切换全部展开/收起                                | -                                                           |
    
    ###### Scoped Slot:
    | name          | 说明                           | 参数 |
    | ------------- | ------------------------------ | ---- |
    | search        | 自定义搜索框,需手动调用search  | -    |
    | self-tool-bar | 自定义工具栏内容               | -    |
    | node-append   | 节点额外添加内容，如操作菜单等 | -    |

    ###### 其它说明：
    1). 若覆盖element-tree中的懒加载load方法，则搜索方法也需自定义；
3.  ##### 表格VeTable
    | 参数        | 类型   | 默认值                | 说明                                                                                                                                                                                                                                                                                                                                                                        |
    | ----------- | ------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | config      | object | 见defaultSettings文件 | 拓展的表格配置参数                                                                                                                                                                                                                                                                                                                                                          |
    | requestConf | object | 见defaultSettings文件 | 后端接口请求和数据格式化相关配置                                                                                                                                                                                                                                                                                                                                            |
    | columns     | array  |                       | 表格列配置参数，支持el-table-columns中的所有参数，另额外新增：<br/> 1.hidden: 布尔类型，是否隐藏该列（通常用于表格列自定义显示），<br/>2.alwaysShow: 布尔型，是否常驻该列（通常用于表格列自定义显示），<br/>3.template: 字符串类型，自定义渲染html模板，支持事件绑定，需引入文件夹下eventBus并监听，<br/>4.component: 自定义Vue组件，组件内获取表格数据用props属性scope接收 |
    | el          | object | 见defaultSettings文件 | attrs：el-table属性，events：el-table事件                                                                                                                                                                                                                                                                                                                                   |
    

    | 事件                | 说明                           | 参数                           |
    | ------------------- | ------------------------------ | ------------------------------ |
    | refresh(boolean)    | 刷新表格数据                   | 传入布尔型参数表示是否重置页码 |
    | setTableData(array) | 更新表格数据，一般用于本地分页 | 需要显示的表格数据，数组类型   |

    ###### Scoped Slot:
    | name     | 说明               | 参数 |
    | -------- | ------------------ | ---- |
    | handler  | 表格上方操作栏内容 | -    |
    | defuault | 表格列数据         | -    |
    
    ###### 其它说明：
    1. 如何获取el-table属性和调用el-table自带方法？获取你VeTable内的elTable引用即可拿到el-table实例。例：this.$refs['你的Vetable引用名'].$refs.elTable;
    2. 表格列数据设置支持el-table原有的slot方式和配置columns参数方式，后者一般用于动态表格列显示；
    3. 在使用columns配置表格时，如果使用template属性渲染单元格内容并绑定事件，需引入Table文件夹内的eventBus并绑定相应事件；
    4. 表格列配置数据既可保存在浏览器本地也可以发送到远端服务器，并支持两种方案的初始化列数据显示，修改TableColumnFilter.vue获取和保存数据相关代码即可

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
