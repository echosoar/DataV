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

  repeat-x: 横向重复数量，总宽度超出上层width(不为auto时)会出现左右滚动
  repeat-y: 纵向重复数量，总高度超出上层height(不为auto时)会出现纵向滚动

  {
    "name": "无限横向布局模板",
    "introduction": "暂无简介",
    "enName": "horizontal",
    "version": "1.0.0",
    "datavVersion": "1.0.0",
    "previewImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACMCAYAAABCtSQoAAACO0lEQVR4nO3c3W0aURCA0blpgHTgdEA6oASXQEpIB3YHTglJBS7B6cDpwEkFVioYvzgIIQF77SvCLOc8rlbDj/QtWhATAQAAAAAAAAAAAAAAAAAAAAAAAP9XGz0wM3P0TJiL1trQ5j6MHAacloChMAFDYQKGwgQMhQkYChMwFCZgKEzAAAAAAAAAAAAAwAWzEwtOyE4sYEPAUJiAoTABQ2EChsIEDIUJGAoTMBQmYAAAAAAAAAAAAOCC2YkFJ2QnFrAhYChMwFCYgKEwAUNhAobCBAyFCRgKEzAAAAAAAAAAAABwwezEghOyEwvYEDAUJmAoTMBQmIChMAFDYQKGwgQMhQkYAAAAAAAAAAAAuGB2YsEJ2YkFbAgYChMwFCZgKEzAUJiAoTABQ2EChsIEDAAAAAAAAAAAAFyw4TuxeJ/MXEfEl53D31trP94waxURXyPi49bhnxHxrbX2t3PWVUTcRsSnrcO/I+K2tfan97nB7GTmTe530zlrdWDWQ+esRWY+75n1nJmLvlcKM3MkuH9WE2cdCq77gpCZD0dmdV0QYHYy83FCwI8TZ91NmJU54ZMzM68nzrp+/7tAL38nPB+fB50z+rzRj8lAAobCBHw+fg06Z/R5ox8T5mfiveak+8zMvMrjX2LddTy3Y/fnk+7NYdby8JdPk4N7nbU+EPFDdvz0k5nLzHzaM+spM5f9rxZm6DW8p51A1m+ctdz59HzuvRBszVpk5v1OvPc9FwIAAAAAAAAAAAA4Py+Yx5ElJSG0iAAAAABJRU5ErkJggg==",
    "layout": {
      "repeat-x": "1",
      "repeat-y": "unlimited",
      "template": {
        "component": "div",
        "props": {
          "className": "template-container template-item",
          "style": {
            "width": "100%"
          }
        },
        "childs": []
      }
    }
  }
