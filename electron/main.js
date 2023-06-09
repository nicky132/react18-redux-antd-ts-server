/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-12 18:01:26
 * @LastEditTime: 2022-06-18 09:17:16
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\electron\main.js
 */
const { app, BrowserWindow, Tray, Menu, shell } = require('electron');
const path = require('path');
const isMac = process.platform === 'darwin';
require(path.resolve(__dirname, '../dist/main.js'));

const isDev = process.env.NODE_ENV === 'development';
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.resolve(__dirname, 'favicon_256.ico'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // electron 拦截所有页面跳转
  // mainWindow.webContents.on('will-navigate', (e, url) => {
  //   e.preventDefault();
  //   console.log(url);
  //   // shell.openExternal(url);
  // });
  // // 处理 window.open 跳转
  mainWindow.webContents.setWindowOpenHandler((data) => {
    // shell.openExternal(data.url);
    console.log(data);
    return {
      action: 'deny',
    };
  });

  // 允许跨域
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      callback({
        requestHeaders: { Origin: '*', ...details.requestHeaders },
      });
    },
  );
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          'Access-Control-Allow-Origin': ['*'],
          ...details.responseHeaders,
        },
      });
    },
  );

  isDev && mainWindow.webContents.openDevTools();
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3006'
      : `file://${path.join(__dirname, '../ui/index.html')}`,
  );
}

app.whenReady().then(() => {
  createWindow();

  // 托盘图标
  const tray = new Tray(path.resolve(__dirname, 'favicon_256.ico'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
  ]);
  tray.setToolTip('hhq');
  tray.setContextMenu(contextMenu);

  // 菜单
  const template = [
    // { role: 'appMenu' }
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' },
            ],
          },
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
              },
            ]
          : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
      ],
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac
          ? [
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'window' },
            ]
          : [{ role: 'close' }]),
      ],
    },
    {
      role: 'help',
      label: '文档',
      submenu: [
        {
          label: 'swagger文档',
          click: async () => {
            await shell.openExternal('http://localhost:3006/api');
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
