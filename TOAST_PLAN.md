# SoDialog Toast 功能规划

## 目标

实现类似 Bootstrap Toast 的消息提醒系统，支持：

- 动态弹出（任意时刻调用 API）
- 可配置位置（多位置容器）
- 自动消失（可设置时长，支持关闭自动消失）
- 消息队列（超出可见上限后排队）
- 稳定的生命周期回调与可编程控制

## 设计原则

- 复用当前库风格：保留 `SoDialog` 的静态类 + 函数导出模式
- 非侵入：不依赖 `dialog` 元素，不锁定焦点，不拦截页面交互
- 强可控：返回 handle，支持主动关闭、更新内容、暂停/恢复计时
- 易扩展：后续可加 promise toast、loading toast、分组清理

## API 草案

### 类型定义

```ts
export type SoToastPlacement =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'

export type SoToastVariant = 'default' | 'info' | 'success' | 'warning' | 'danger'

export type SoToastCloseReason =
  | 'timeout'
  | 'manual'
  | 'close-button'
  | 'container-clear'
  | 'programmatic'
```

```ts
export interface SoToastOptions {
  id?: string
  title?: string
  content: string | Node
  placement?: SoToastPlacement
  variant?: SoToastVariant
  duration?: number | false
  closable?: boolean
  pauseOnHover?: boolean
  newestOnTop?: boolean
  maxVisible?: number
  className?: string
  attrs?: Record<string, string>
  onShown?: (handle: SoToastHandle) => void
  onClose?: (reason: SoToastCloseReason, handle: SoToastHandle) => void
}

export interface SoToastHandle {
  id: string
  element: HTMLElement
  close: (reason?: Exclude<SoToastCloseReason, 'timeout' | 'close-button'>) => void
  update: (patch: Partial<Pick<SoToastOptions, 'title' | 'content' | 'variant' | 'duration'>>) => void
  pause: () => void
  resume: () => void
}
```

### 对外方法

```ts
export class SoToast {
  static show(options: SoToastOptions): SoToastHandle
  static clear(placement?: SoToastPlacement): void
  static configure(defaults: Partial<SoToastOptions>): void
}

export function toast(options: SoToastOptions): SoToastHandle
```

### 便捷方法（可选）

```ts
SoToast.success(content, options?)
SoToast.error(content, options?)
SoToast.info(content, options?)
SoToast.warning(content, options?)
```

## 关键行为规范

- `duration` 默认 `3000ms`
- `duration: false` 表示不自动关闭
- `maxVisible` 默认 `3`，按 `placement` 分组生效
- 超过 `maxVisible` 后进入队列，前面的 toast 关闭后自动补位
- `newestOnTop` 默认 `true`
- `id` 未传时自动生成（例如 `sot-toast-1`）
- 如果传入已存在 `id`：
  - 默认策略为更新已有 toast 内容并重置计时
  - 返回同一 handle

## 队列模型

按 `placement` 维护状态：

```ts
interface PlacementState {
  container: HTMLElement
  active: ToastRecord[]
  pending: ToastRecord[]
  maxVisible: number
}
```

处理流程：

1. `show` 时获取 placement 状态
2. 若 `active.length < maxVisible`，立即渲染并进入 `active`
3. 否则进入 `pending`
4. 任一 active 关闭后：
   - 从 `active` 移除
   - 若 `pending` 有项，按顺序取出并渲染
5. `clear(placement)` 同时清空 `active + pending`

## 生命周期与计时

每个 toast 维护：

- `timerId`
- `remainingMs`
- `startedAt`
- `paused`

规则：

- 显示时启动倒计时
- `pauseOnHover` 为真时，`mouseenter` 暂停，`mouseleave` 恢复
- `update({ duration })` 会重置计时逻辑
- 关闭触发离场动画，动画结束后真正移除 DOM，再处理队列补位

## DOM 结构建议

```html
<div class="sot-toast-layer sot-toast-layer-top-end" aria-live="polite" aria-atomic="false">
  <article class="sot-toast sot-toast-success" role="status">
    <header class="sot-toast-header">
      <strong class="sot-toast-title">Success</strong>
      <button class="sot-toast-close" type="button" aria-label="Close">×</button>
    </header>
    <div class="sot-toast-body">Saved successfully.</div>
  </article>
</div>
```

可访问性：

- 普通提醒：`role="status"`
- 错误提醒：`role="alert"`
- 容器使用 `aria-live="polite"`，避免抢占式播报

## 样式建议

新增 `src/sotoast.css`，保持 `sot-` 前缀避免污染：

- `.sot-toast-layer` 固定定位 + `pointer-events: none`
- `.sot-toast` 使用 `pointer-events: auto`
- 位置类映射 6 个 placement
- 进场动画：淡入 + 位移
- 出场动画：淡出 + 缩放
- 支持 variant 色彩条或边框

## 代码组织建议

- 新文件：`src/toast.ts`（核心逻辑）
- 新文件：`src/sotoast.css`（样式）
- 调整：`src/lib.ts` 导出 toast API（或在 `src/lib.ts` 内直接实现）
- 调整：`README.md` 增加 Toast 章节
- 调整：`demo.html` / `src/demo-main.ts` 增加 Toast 交互区

## 实施里程碑

### M1: 核心能力

- 完成类型定义与 `SoToast.show`
- 支持 placement、duration、manual close
- 支持 `onShown` / `onClose`

### M2: 队列与更新

- 完成 `maxVisible` 与 `pending` 队列
- 支持传入重复 `id` 的更新策略
- 完成 `clear` 与 `configure`

### M3: 交互完善

- 完成 `pauseOnHover`
- 完成进出场动画与动画后清理
- 完成 `success/error/info/warning` 便捷方法

### M4: 文档与示例

- 更新 README API
- 增加 demo 按钮：不同位置、不同时长、批量触发队列
- 增加边界示例：`duration=false`、重复 `id` 更新

## 验收清单

- 同一位置连续触发 10 条消息时，最多同时展示 `maxVisible` 条
- Active 关闭后 Pending 能按顺序补位
- 自动关闭、手动关闭、清空关闭都能触发正确 reason
- 重复 `id` 调用不会无限创建 DOM 节点
- 页面缩放/移动端下各位置容器可正常显示
- 与现有 Modal/Offcanvas API 共存，无样式冲突

## 风险与决策点

- 决策点 1：重复 `id` 是更新还是忽略（当前建议：更新）
- 决策点 2：队列维度按全局还是按位置（当前建议：按位置）
- 决策点 3：默认 `maxVisible` 数量（当前建议：3）
- 风险：快速批量触发时动画与队列状态竞争，需要以 record 状态机防重入

## 建议分支策略

- 当前分支：`feature/toast-system`
- 提交建议：
  - `feat(toast): scaffold toast core and styles`
  - `feat(toast): add queue and timer control`
  - `docs: add toast api and demo usage`
