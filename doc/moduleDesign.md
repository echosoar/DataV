关于模块的设计

加载模块js文件，这个js文件中包含的只是模块的所有事件操作，都会传入这个模块的refs，会暴露出来一个对象，名称为模块hash名称，挂在到window.datavModule上

检测是否加载成功，加载成功了就进行模块渲染，模块的所有事件处理都在上面的js文件中



模块也应该可以保存成为一个对象
{
  "name": '模块名称',
  "introduction": "暂无简介",
  "enName": "moduleName",
  "version": "1.0.0",
  "datavVersion": "DataV版本",
  "previewImg": "预览图片",
  "hashName": "模块hash名称-根据时间等生成的模块唯一标识",
  "scriptType": "online or local",
  "scriptAddr": "模块js文件地址",
  "component": "div",
  "props": [],
  "childs": []
}

childs可以处理两个值@state和@props
