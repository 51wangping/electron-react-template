#### electron-react-template

### 技术架构

electron16 + react17 + webpack5

### 目录解构

```bash
├── build   # 渲染进程构建目录
├── build_electron  # 主进程构建目录
│   ├── index.html
│   └── main.js
├── config # webpack 配置文件目录
│   ├── webpack.config.base.js
│   ├── webpack.config.electron.js # electron主进程生产环境打包配置
│   ├── webpack.config.dev.js # 渲染进程开发环境打包配置
│   └── webpack.config.prod.js # 渲染进程生产环境打包配置
├── electron # electron相关文件
│   ├── main.js # electron入口文件
│   └── preload.js # electron预加载文件
├── index.less
├── index.tsx
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── favicon.png
│   └── index.html
├── src # 渲染进程
│   ├── components
│   │   └── layout
│   │       └── Nav
│   │           ├── index.less
│   │           └── index.tsx
│   ├── index.less
│   └── index.tsx
└── tsconfig.json #ts配置文件
```

### 命令

- `npm run start`: web 端启动
- `npm run build`: 渲染进程构建
- `npm run build:electron`: 主进程构建
- `npm run electron`: 开发环境启动 electron
- `npm run pack`: 构建生产环境调试文件
- `npm run dev:win64`: 构建生产 windows64 环境包
- `npm run dev:macArm`: 构建生产 mac --arm 环境包
