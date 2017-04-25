### DataV

##### 可视化数据可视化系统搭建平台

***

##### 还要做的事情记录（优先级从上到下）：

  + 页面配置器 - 库管理 - 分页
  + 页面配置器 - 库 - 布局模板/基础组件/数据组件 列表（添加分页和查询）
  + 页面配置器中库内容读取方式通过接口实现，本地起一个server来跑这个事情，这个server地址可以进行配置
  + 页面配置器中需要有对组件的属性编辑功能（编辑props）
  + 页面配置保存功能
  + 页面配置再编辑已有页面功能（打开页面库）
  + 发布页面功能，需要设置对于本地模块的打包发布机制
  + 编写数据展示器 -> 可以导入页面配置器发布的json数据包和打包后的js文件进行数据展示
  + 编写更丰富的布局模板、基础组件和数据组件
  + 页面配置器 - 库管理 - JSON查看格式化

***

##### 已完成工作（时间从前到后）：

  - 技术选型 - Webpack + React + React-Router + Redux + Electron
  - 启动页面（启动页面配置器，数据展示器和退出）
  - 全局 - 消息跨页面系统传递
  - 页面配置器 - 基础面板/库面板/属性样式面板
  - 页面配置器 - 布局引擎 - 布局模板json设计
  - 页面配置器 - 布局引擎 - 布局嵌套实现
  - 页面配置器 - 布局引擎 - 布局模板样式配置
  - 页面配置器 - 基础模块引擎 - 通用模块json设计
  - 页面配置器 - 基础模块引擎 - 模块异步加载方案/实现
  - 总结属性type，目前有size、color、text、array四种类型
  - 总结布局配置信息，模块配置信息
  - 页面配置器 - 设置 - 接口设置
  - 页面配置器 - 库管理 - 布局模板/基础组件/数据组件 添加、查询
