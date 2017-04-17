模块依赖于布局模板
即模块的上一层一定是一个布局模板
布局模板可以进行嵌套
在模板中嵌套模板会导致原模板中的所有数据丢失

模板设计：

布局模板包含：
  name：模板名称，
  introduction: 模板简介,
  version：当前模板版本，
  datavVersion：要求datavVersion的最低版本
  previewImg：布局预览图像DataUrl或线上地址，最好为240*140，其它比例会被拉伸或缩放

  布局模板-模板信息：
  width: 模板宽度，百分比会根据上层容器宽度进行转换，auto为自动（配置时默认展示300px）
  height: 模板高度，百分比会根据上层容器高度进行转换，auto为自动（配置时默认展示300px）
  repeat-x: 横向重复数量，总宽度超出上层width(不为auto时)会出现左右滚动
  repeat-y: 纵向重复数量，总高度超出上层height(不为auto时)会出现纵向滚动

{
  "name": "横向无限布局模板",
  "introduction": "暂无简介",
  "version": "1.0.0",
  "datavVersion": "1.0.0",
  "previewImg": "",
  "layout": [
    {
      "width": "100%",
      "height": "auto",
      "repeat-x": "1",
      "repeat-y": "unlimited",
      "layout": []
    }
  ]
}
