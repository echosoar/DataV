### DataV

##### 可视化数据可视化系统搭建平台

***

##### 还要做的事情记录（优先级从上到下）：

  + 页面配置器 - 页面管理（页面库） - 删除
  + 全局 - 数据接口请求存储（比如登录状态等）
  + 页面配置器 - 页面搭建 - 全局属性管理
  + 页面配置器 - 全局 - 操作路径（用来判断是否需要保存）
  + 页面配置器 - 页面管理（页面库） - 页面发布（需要设置对于本地模块的打包发布机制）
  + 数据展示器 -> 可以导入页面配置器发布的json数据包和打包后的js文件进行数据展示
  + 编写更丰富的布局模板、基础组件和数据组件


***

##### 已完成工作（时间从前到后）：

  - 技术选型 - Webpack + React + React-Router + Redux + Electron
  - 启动页面 -启动页面配置器、数据展示器、退出
  - 全局 - 消息跨页面系统传递
  - 页面配置器 - 基础面板/库面板/属性样式面板
  - 页面配置器 - 布局引擎 - 布局模板json设计
  - 页面配置器 - 布局引擎 - 布局嵌套实现
  - 页面配置器 - 布局引擎 - 布局模板样式配置
  - 页面配置器 - 模块引擎 - 通用模块json设计
  - 页面配置器 - 模块引擎 - 模块异步加载方案/实现
  - 总结 - 属性type，目前有size、color、text、array四种类型
  - 总结 - 布局配置信息，模块配置信息
  - 页面配置器 - 设置 - 接口设置
  - 页面配置器 - 库管理 - 布局模板/基础组件/数据组件 添加、查询
  - 页面配置器 - 库管理 - 分页
  - 页面配置器 - 库 - 内容读取方式通过接口实现 - 另外一个项目 - DataV-Server
  - 页面配置器 - 库 - 布局模板/基础组件/数据组件 列表（添加分页和查询）
  - 页面配置器 - 页面搭建 - 预览
  - 页面配置器 - 页面搭建 - 组件属性编辑功能（编辑props）、组件删除
  - 页面配置器 - 库管理 - JSON查看格式化、可修改
  - 页面配置器 - 渲染引擎 - 模块、布局显示逻辑（可设置一个全局变量来控制是否显示）
  - 页面配置器 - 页面管理（页面库） - 保存、编辑、查询等
