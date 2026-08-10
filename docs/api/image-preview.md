# 图片预览 API

<VersionBadge />

图片预览默认采用沉浸预设：仅显示居中的图片，不显示标题栏、工具栏或滚动条。面板会随缩放后的图片同比扩缩，但不会超过扣除视口留白后的可用范围。

## 最小示例

```ts
import { bindImagePreview } from 'sodialog'

const binding = bindImagePreview({
  root: document.querySelector('.help-content')!,
})

binding.destroy()
```

也可以直接打开单张图片：

```ts
import { openImagePreview } from 'sodialog'

const preview = openImagePreview('/images/manual.png', {
  alt: '操作说明',
  showToolbar: true,
})

preview.setScale(1.5)
```

## 方法

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| `openImagePreview(source, options?)` | `SoImagePreviewHandle` | 立即打开 URL 或 `HTMLImageElement`。 |
| `bindImagePreview(options?)` | `SoImagePreviewBindingHandle` | 委派监听指定区域内的图片点击。 |

## `SoImagePreviewOptions`

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | 图片 alt 或 `Image preview` | 可访问名称；开启标题栏时显示。 |
| `alt` | `string` | 来源图片 alt | 覆盖预览图片替代文字。 |
| `initialScale` | `'fit' \| 'original' \| number` | `'fit'` | 初始缩放；`fit` 只缩小超出视口的图片。 |
| `minScale` | `number` | `0.25` | 最小缩放比例。 |
| `maxScale` | `number` | `4` | 最大缩放比例。 |
| `wheelStep` | `number` | `0.1` | 每次滚轮缩放增量。 |
| `viewportPadding` | `number` | `32` | 浏览器可视范围四周保留的总尺寸。 |
| `resizeWithScale` | `boolean` | `true` | 面板是否跟随缩放后的图片扩缩。 |
| `showHeader` | `boolean` | `false` | 显示标题栏和关闭按钮。 |
| `showToolbar` | `boolean` | `false` | 显示缩小、比例、放大和 1:1 工具栏。 |
| `showScale` | `boolean` | `true` | 工具栏启用时是否显示当前缩放百分比。 |
| `overflow` | `'hidden' \| 'auto'` | `'hidden'` | 是否允许预览区域出现滚动条。 |

`SoImagePreviewBindingOptions` 额外接受 `root?: ParentNode`（默认 `document`）和 `selector?: string`（默认 `img`）。

## 返回句柄

`SoImagePreviewHandle` 继承 `SoDialogHandle`，并增加：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `image` | `HTMLImageElement` | 预览层中的图片元素。 |
| `scale()` | `() => number` | 获取当前缩放比例。 |
| `setScale(scale)` | `(number) => void` | 设置比例，并自动限制在最小/最大值内。 |

`SoImagePreviewBindingHandle.destroy()` 用于解除委派监听。

## 可选工具栏与滚动

```ts
bindImagePreview({
  root: document,
  selector: '.article img',
  showToolbar: true,
  showScale: true,
  showHeader: true,
  overflow: 'auto',
  initialScale: 'original',
  minScale: 0.5,
  maxScale: 3,
  viewportPadding: 48,
})
```

关闭预览时，内部滚轮和窗口尺寸监听会自动清理；动态内容区域自身销毁时，应同时调用绑定句柄的 `destroy()`。
