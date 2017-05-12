const deepClone = require('deepclone');

/*修改数据*/

let fun_changeData = (template, path, data) => {
  if(path.length==0) {
    return data;
  }
  if(path.length==1) {
    let childsIndex = path.shift();
    template.childs[childsIndex] = data;
    return template;
  }
  let nowIndex = path.shift();

  let newTemplate = Object.assign({}, template.childs[nowIndex].template);

  template.childs[nowIndex].template = fun_changeData(newTemplate, path, data);
  return template;
}

module.exports = {
  fun_changeData
}
