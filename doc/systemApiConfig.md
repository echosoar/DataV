### 系统接口配置

***

+ 所有布局列表接口（layoutLibraryListAll）
    - 发送参数：page（当前页号），size（每一页数量）
+ 所有基础组件接口（baseModuleListAll）
    - 发送参数：page（当前页号），size（每一页数量）
+ 所有数据组件接口（dataModuleListAll）
    - 发送参数：page（当前页号），size（每一页数量）
+ 根据名称查询布局列表接口（layoutLibraryListByName）
    - 发送参数：name（查询名称），page（当前页号），size（每一页数量）
+ 根据名称查询基础组件接口（baseModuleListByName）
    - 发送参数：name（查询名称），page（当前页号），size（每一页数量）
+ 根据名称查询数据组件接口（dataModuleListByName）
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
  errTip: '错误提示'
}
```
***
