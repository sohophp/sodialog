# SoDialog 发布前检查清单

## 1) 版本与变更
- [x] 更新 `package.json` 的 `version`
- [x] 确认 `README.md` 的 API 与当前实现一致
- [x] 梳理本次变更要点（建议写到发布说明）

## 2) 本地质量检查
- [x] `npm run release:check -- vX.Y.Z` 通过（tag 与 `package.json` 版本一致）
- [x] `npm run lint` 通过
- [x] `npm run build` 通过
- [ ] 手工验证关键场景：
  - [ ] `cancel/close => dialog.close()`
  - [ ] `confirmAction: 'destroy' => dialog.remove()`
  - [ ] 输入相同 `id` 可唤醒同实例
  - [ ] 留空 `id` 自动生成
  - [ ] auto-fit 在图片切换、超长词、超宽表格场景表现正常

## 3) 产物检查
- [x] `dist/sodialog.es.js` 存在
- [x] `dist/sodialog.umd.js` 存在
- [x] `dist/sodialog.css` 存在
- [x] `dist/types/lib.d.ts` 存在
- [x] `npm pack --dry-run` 输出内容符合预期

## 4) npm 发布
- [ ] `npm login`
- [ ] `npm whoami` 正常
- [ ] 如需公开包：`npm publish --access public`

## 5) 发布后验证
- [ ] 新建空项目安装验证：`npm i sodialog`
- [ ] 运行最小示例：`openModal(...)` + `import 'sodialog/style.css'`
- [ ] 检查 ESM 导入、样式导入、类型提示是否正常
