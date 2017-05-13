const fs = require('fs');
const path = require('path')

let mkdir = path => {
	try {
		fs.mkdirSync(path);
	}catch(e) {
		return false;
	}
	return true;
}

let exportPage = (dirname, data, cb) => {


  let libDir = path.join(dirname, 'libs/');
  mkdir( libDir );

  fs.writeFileSync(path.join(dirname, '/libs/react.js'), fs.readFileSync(path.join(__dirname, 'lib/react.js')).toString());
  fs.writeFileSync(path.join(dirname, '/libs/react-dom.js'), fs.readFileSync(path.join(__dirname, 'lib/react-dom.js')).toString());
  fs.writeFileSync(path.join(dirname, '/libs/datav.js'), fs.readFileSync(path.join(__dirname, 'lib/datav.js')).toString());

  let pageData = `<meta charset="utf-8"/>
<div id="datav-container"></div>
<script>window.datavGlobalData = '${data.replace(/'/g, '_DATAV_SIG_Y_')}';</script>
<script src="./libs/react.js"></script>
<script src="./libs/react-dom.js"></script>
<script src="./libs/datav.js"></script>
`
  fs.writeFileSync(path.join(dirname, 'datav.html'), pageData);
  cb();
};

module.exports =  exportPage;
