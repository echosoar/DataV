### 模块、布局显示逻辑
***
+ 在全局的state上维护一个对象siteDisplay，包含整个站点所有显示逻辑控制变量。
+ 在渲染的时候首先查看布局或模块是否包含和props平级的display属性：
    - 如果有display属性并且不为空，那么就检测siteDisplay中是否有这个值：
      + 没有或者为false的时候则不对此模块进行渲染。
      + 有并且不为false那么就进行渲染。
    - 如果模块没有display属性或者display为空，那么就直接渲染。
+ 提供一个方法siteDisplayChange方法，并将此方法传入所有模块的props中，此方法接受传入一个数组：
```
[
  {
    name: 'xxx',
    value: false
  }
]
```
将会遍历此数组并将值存入siteDisplay
+ 在渲染的时候会把siteDisplay传入所有模块的props中
