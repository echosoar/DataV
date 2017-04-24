### 系统接口配置

***

+ 布局列表接口（layoutLibraryList）
    - 发送参数：name（查询名称），page（当前页号），size（每一页数量）
+ 基础组件接口（baseModuleList）
    - 发送参数：name（查询名称），page（当前页号），size（每一页数量）
+ 数据组件接口（dataModuleList）
    - 发送参数：name（查询名称），page（当前页号），size（每一页数量）

以上接口返回数据格式：
```
{
  success: true,
  model: {
      page: 1, //当前页号
      size: 10, // 数量
      tolSize: 100, // 总数量
      data: [
        // 数据
      ]
  },
  msg: '错误提示'
}
```
***
