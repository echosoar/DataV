### 系统接口配置

***
#####  数据查询接口

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
      tolSize: 100, // 总数量
      data: [
        // 数据
        {
          id: '5', // 模板或模块id
          json: '{}' // 模板或模块json配置数据
        }
      ]
  },
  msg: '错误提示'
}
```
***

#####  数据添加接口

+ 添加新布局模板接口（layoutLibraryAdd）
    - 发送参数：data（json配置数据）

+ 添加新基础组件接口（baseModuleLibraryAdd）
    - 发送参数：data（json配置数据）

+ 添加新数据组件接口（dataModuleLibraryAdd）
    - 发送参数：data（json配置数据）

以上接口返回数据格式：
```
{
  success: true,
  model: '',
  msg: '错误提示'
}
```
***

##### 数据修改接口
+ 布局模板修改接口（layoutLibraryEdit）
    - 发送参数：id（当然模板id），data（新的json数据）

+ 基础组件修改接口（baseModuleLibraryEdit）
    - 发送参数：id（当然组件id），data（新的json数据）

+ 数据组件修改接口（dataModuleLibraryEdit）
    - 发送参数：id（当然组件id），data（新的json数据）

以上接口返回数据格式：
```
{
  success: true,
  model: '',
  msg: '错误提示'
}
```
***

##### 页面编辑器数据接口
+ 数据保存接口 （pageDataAdd）
