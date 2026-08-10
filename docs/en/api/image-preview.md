# Image Preview API

<VersionBadge />

The default immersive preset shows only a centered image, without a header, toolbar, or scrollbars. The panel follows the scaled image dimensions but never exceeds the viewport area left after padding.

## Minimal example

```ts
import { bindImagePreview } from 'sodialog'

const binding = bindImagePreview({ root: document.querySelector('.help-content')! })
binding.destroy()
```

```ts
import { openImagePreview } from 'sodialog'

const preview = openImagePreview('/images/manual.png', {
  alt: 'Product instructions',
  showToolbar: true,
})
preview.setScale(1.5)
```

## Methods

| Method | Returns | Description |
| --- | --- | --- |
| `openImagePreview(source, options?)` | `SoImagePreviewHandle` | Open a URL or `HTMLImageElement` immediately. |
| `bindImagePreview(options?)` | `SoImagePreviewBindingHandle` | Delegate image clicks from a root node. |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | image alt or `Image preview` | Accessible name and optional visible title. |
| `alt` | `string` | source image alt | Overrides preview alternative text. |
| `initialScale` | `'fit' \| 'original' \| number` | `'fit'` | Initial scale; `fit` only shrinks oversized images. |
| `minScale` | `number` | `0.25` | Minimum zoom. |
| `maxScale` | `number` | `4` | Maximum zoom. |
| `wheelStep` | `number` | `0.1` | Mouse-wheel zoom increment. |
| `viewportPadding` | `number` | `32` | Total space reserved around the viewport. |
| `resizeWithScale` | `boolean` | `true` | Resize the panel with the scaled image. |
| `showHeader` | `boolean` | `false` | Show the title and close button. |
| `showToolbar` | `boolean` | `false` | Show zoom-out, scale, zoom-in, and 1:1 controls. |
| `showScale` | `boolean` | `true` | Show the current zoom percentage when the toolbar is enabled. |
| `overflow` | `'hidden' \| 'auto'` | `'hidden'` | Enable scrollbars when requested. |

Binding options also accept `root?: ParentNode` (default `document`) and `selector?: string` (default `img`). The preview handle exposes `image`, `scale()`, and clamped `setScale(scale)` in addition to `SoDialogHandle`. Call the binding handle's `destroy()` when its host is removed.
