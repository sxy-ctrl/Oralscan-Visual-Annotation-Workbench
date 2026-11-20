# Oralscan Visual Annotation Workbench

静态口扫图像标注平台。支持病例切换、多视图查看、类别标注、异常标签、复核状态、本地暂存和 JSON / CSV 导入导出。无后端接口。

## 运行

直接打开 `index.html`，或使用 Node.js 18 及以上版本运行：

```sh
npm start
```

访问 http://127.0.0.1:8080 。无需安装第三方依赖。

## 检查

```sh
npm run check
```

检查源码语法、资源引用、素材哈希及常见敏感字段。

## 目录

```text
index.html       页面入口
src/             应用逻辑与样式
assets/images/   病例图像
data/            规则、测试集及素材清单
docs/            操作说明与数据检查记录
scripts/         本地服务与检查脚本
```

## 数据与许可

病例图像来源及许可见 [ATTRIBUTION.md](ATTRIBUTION.md)，代码许可范围见 [LICENSE.md](LICENSE.md)。当前图像为二维截图，不包含原始三维模型或接触热图。当前评分规则未经过临床验证，不用于临床判断。

操作说明见 [docs/usage.md](docs/usage.md)。
