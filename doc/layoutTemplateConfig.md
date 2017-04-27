### 布局模板配置

***

+ 在DataV中，所有的模块（基础模块、数据模块等）都必须放在布局模板中，布局模板可以进行嵌套使用。

+ 布局模板可以进行模板样式设置，在配置JSON中 _templat -> props -> style_ 下并且在样式配置列表中的属性都可以进行配置。

+ 布局模板分为两类：
  + 布局条目可重复布局模板：设置repeat属性为 _unlimited-x_ 或 _unlimited-y_ 时，布局模板下面的布局条目可以进行复制添加和删除（数量为1的时候不可删除）
  + 布局条目不可重复布局模板：repeat属性无 _unlimited-x_ 前缀，那么就不可以进行 上下/前后 复制。


+ 布局模板、布局条目的删除会导致其所包含的子布局、模块也一起删除（由于目前DataV没有保存操作路径，所以删除不可撤销），导致数据丢失。

+ 模板的布局信息是通过 template 和 childs 这两个属性相互嵌套进行的 template是一个对象，包含childs属性，childs是一个数组，包含所有 _子模板布局_ 或者 _组件_ 。

***

#### 模板配置JSON格式：


##### 布局模板包含：
###### 1. 模板基本信息：
  + _name_ ：模板名称。
  + _introduction_ ： 模板简介信息。
  + _enName_ ：模板英文名称。
  + _version_ ：当前模板版本。
  + _datavVersion_ ：要求使用此模板的DataV的最低版本（暂无作用）。
  + _previewImg_ ：布局预览图像，可使用DataUrl或线上地址，大小最好为240*140，其它比例会被拉伸或缩放。
  + _repeat_ ：模块条目是否可重复


###### 2. 模板布局信息：
  DataV 会根据这里的信息，递归调用React.createElement方法进行模板渲染。
  + _template_ ：模板当前层信息，是一个对象。
    - _component_ ：当前标签名称，是一个字符串类型的值，如 div、table、span等等。
    - _display_ ：全局显示控制字段
    - _props_ ：当前标签层属性值
      + _className_ ：必要属性，代表当前标签层class值。作为一个DataV的布局模板，要求模板主容器层的className需要包含 _template-container_ ；模板的子条目层需要包含 _template-item_ ；其它中间层都需要有 _template-middle_ ，使用方法可以查看下面的demo。
      + _style_ ：可选属性，代表模板的样式，如果下面的值匹配上了样式配置列表里面的属性，那么就可以唤起属性配置面板进行属性配置。
    - _childs_ ：这是一个数组，存放子条目、子布局模板、组件等各种此模板层包含的信息。


##### 布局模板Demo：
  ```
  {
    "name": "无限纵向布局模板",
    "introduction": "暂无简介",
    "enName": "vertical",
    "version": "1.0.0",
    "datavVersion": "1.0.0",
    "previewImg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACMCAYAAABCtSQoAAADEUlEQVR4nO3c0U1UURCA4Rnju9rBdiAdSAl2AC1YgdABJUAH0IF2gB1sB2IF4wM3SggClwzZHfN9j3dP5vDy5+wucCIAAAAAAAAAAAAAAAAAAAAAAABgt7J7YFXVszbOfNbe5pm3y3n77s2ufwDg5QQMgwkYBhMwDCZgGEzAMJiAYTABw2AChsEEDIMJGAYTMAwmYBhMwDCYgGEwAcNgAobBBAyDCRgGEzAMJmAYTMAw2Ntd/wDwP6mqo4g4vvf4PDMvXmM/AUOTqvoaEScPvHRYVZvMPO3e08Xu5pnXoKo+RcS3J5YdZub3zn19BoYeZ01rVnECm2deg13t6wSGwQQMPa6b1qwiYOhx0rRmFQFDg8y8ise/pDpb1rQSMDTJzC9x+0cc2zuPtxFxvLzWv2f3wH3/VtE889bM23dOYBhMwDCYgGEwAcNgAobBBAyDCRgGEzAMJmAYTMAwmIBhMJfaQbPlfqw/uu/BukvA0KSqPkbEZURs7j3fRsTnzPzRvae30NCgqt5FxHnci3exiYjzZU0rAUOPk4g4eOT1g3iFGzn8P7B55jWoqp8R8f6JZTeZ+aFzXycw9Hgq3ueuWUXA0OOmac0qAoYel01rVvEZ2DzzGizfMG/j32+TbyJik5m/Ovd1AkODJcyDePjy9uuIOOiON8IJbJ55rZaT+HP8/X3wNiIuXyPeCAGbZ95o3kLDYAKGwQQMgwkYBhMwDCZgGEzAMJiAYTABw2AChsEEDIO5lRIaVdVRRBzfe3yemRevsZ+AoUlVfY2HL647rKpNZp527+m/kcwzr8Fymfu3J5Yddl/y7jMw9DhrWrOKE9g88xrsal8nMAwmYOjx0F1YL1mzioChx0nTmlUEDA0y8yoe/5LqbFnTSsDQJDO/xO0fcWzvPN5GxPHyWv+e3QP3/VtF88xbM2/fOYFhMAHDYAKGwQQMgwkYBhMwDCZgGEzAMJiAYTABw2AChsEEDIMJGAYTMAwmYBhMwDCYgGEwAcNgAobBBAyDCRgAAAAAAAAAAAAAAAAAAAAAAACAF/sNgI76MGsrjlIAAAAASUVORK5CYII=",
    "template": {
      "component": "div",
      "display": "",
      "props": {
        "className": "template-container"

      },
      "childs": [
        {
          "repeat": "unlimited-x",
          "template": {
            "component": "div",
            "props": {
              "className": "template-middle",
              "style": {
                "overflow-x": "auto",
                "white-space": "nowrap"
              }
            },
            "childs": [{
              "template": {
                "component": "div",
                "display": "",
                "props": {
                  "className": "template-item",
                  "style": {
                    "display": " inline-block",
                    "width": "25%",
                    "verticalAlign": "top"
                  }
                },
                "childs": []
              }
            }]
          }
        }
      ]
    }
  }
  ```
