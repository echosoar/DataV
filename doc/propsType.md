### 属性类型
+ size

  大小类型，会进行数据验证，只允许有3种类型的值：auto/ 像素px / 百分比%

  ```
  /^\s*(?:auto|[\d\.]+%|[\d\.]+px)\s*$/
  ```

+ text

  文本类型，不会做数据验证

+ array 和 options 配合使用

  定项选择类型，会渲染成一个下拉列表，列表里面的值需要在options属性里面配置：
  {
    text: '选项条目名称',
    value: '选项值'
  }

+ color

  颜色类型，会进行数据验证，支持#rgb、#rrggbb、rgb(0,0,0)、rgba(0,0,0,0)四种格式

  ```
  /^\s*(?:#[0-9a-f]{3}|#[0-9a-f]{6}|rgb\(\s*(?:\s*(?:\d{1,2}|1\d\d|2(?:[0-4]\d|5[0-5]))\s*,?){3}\)|rgba\(\s*(?:\s*(?:\d{1,2}|1\d\d|2(?:[0-4]\d|5[0-5]))\s*,?){3}\s*(?:0|1|0?\.\d+)\s*\))\s*$/i
  ```
