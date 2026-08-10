# 图片预览

<DemoPreview src="/components/image-preview.html" title="Image Preview" :height="430" />

点击图片打开预览并使用鼠标滚轮缩放。小图保持自然尺寸，大图会先适配浏览器可视范围。

默认预设仅显示居中的图片且隐藏滚动条。示例传入 `showToolbar: true` 展示可选缩放工具栏；还可使用 `showHeader`、`overflow`、`viewportPadding` 和 `initialScale` 定制展示方式。

完整参数、缩放边界和清理方式请参阅[图片预览 API](/api/image-preview)。
