## 整体框架

```
├── base                                     // 定义游戏开发基础类
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                         // ES6 Symbol简易兼容
│   └── weapp-adapter.js            // 小游戏适配器
├── tetris
│   ├── box.js                               // 方块类
│   └── map.js                              // 地图类
├── ui
│   ├── menu.js                             // 菜单类
│   ├── button.js                           // 按钮类
│   ├── background.js                  // 背景类
│   ├── gameinfo.js                      // 用于展示分数和结算界面
│   └── music.js                            // 全局音效
├── databus.js                              // 管控游戏状态
└── main.js                                   // 游戏入口主函数# Tetris
```
