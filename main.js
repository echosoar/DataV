const electron = require('electron')
const fs = require('fs');
const path = require('path')
const url = require('url')

let { app, BrowserWindow } = electron;

const ipcMain = electron.ipcMain;

let configWin = null;
let preWindow = null;

let listenerRendererMsg = msg => {
	return new Promise((resolve, reject) => {
		ipcMain.on(msg, (event, arg )=>{
			resolve(arg);
		});
	});
}

function fun_ConfigWindow () {
	let screenDisplayBounds = electron.screen.getPrimaryDisplay().bounds;


	configWin = new BrowserWindow({x: 0, y: 0, width: screenDisplayBounds.width, height: screenDisplayBounds.height, transparent: true, frame: false, resizable: false});

	configWin.setFullScreen(true);

	configWin.webContents.openDevTools();// dev tools

	configWin.loadURL(url.format({
		pathname: path.join(__dirname, 'config.html'),
		protocol: 'file:',
		slashes: true
	}))

	configWin.on('closed', function () {
	 configWin = null
	})

	listenerRendererMsg("getSystemConfig").then(args=>{
		let systemConfigFileAddr = path.join(__dirname, './config/systemConfig.json');
		let data = fs.readFileSync(systemConfigFileAddr);
		console.log(data);
	});

	listenerRendererMsg("exitConfig").then(args=>{
		fun_PreWindow();
		configWin.close();
	});
}

function fun_PreWindow() {
	preWindow = new BrowserWindow({width: 480, height: 320, transparent: true, frame: false, resizable: false});
	preWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'preWindow.html'),
		protocol: 'file:',
		slashes: true
	}));
	preWindow.on('closed', function () {
		preWindo = null
	});


	listenerRendererMsg("exitMain").then(args=>{
		preWindow.close();
		if(configWin) configWin.close();

	});

	listenerRendererMsg("openConfig").then(args=>{
		fun_ConfigWindow();
		preWindow.close();
	});
}

app.on('ready', fun_PreWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (d3kabWin === null) {
    createWindow()
  }
})
