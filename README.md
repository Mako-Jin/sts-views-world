# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


## MapBox.Map

Parameters 参数

|名称|	类型|	默认值|	描述|
|---|   ---|      ---|  ---|
|bearing |	number |	0 |	地图的初始方位角（指北方向，顺时针，单位：°），若未设置，则在style里查找，若style也未设置，则默认为0°
|bounds |	LngLatBoundsLike |	null |	地图的初始边界。如果设置了，会覆盖center和zoom
|center |	LngLatLike|	[0,0]	|地图的初始地理中心点。若未设置，则在style里查找，若style也未设置，则默认为[0，0]。注意：Mapbox GL使用经度、纬度坐标顺序（与纬度、经度相反）来匹配GeoJSON
|pitch|	number|	0	|地图的初始俯仰角（0-85）。若未设置，则在style里查找，若style也未设置，则默认为0
|zoom|	number|	0	|地图的初始缩放级别。若未设置，则在style里查找，若style也未设置，则默认为0
|accessToken|	string|	null	|如果定义的话，map就不用mapboxgl.accessToken
|antialias|	boolean|	false|	是否需要平滑，若true，则使用MSAA(MultiSampling Anti-Aliasing)。默认false性能优化
|attributionControl|	boolean|	true|	若true，则在地图上添加 AttributionControl 控件
|customAttribution|	string|	Array|	null
|bearingSnap|	number|	7	|北向捕捉的阈值，单位：°，例如，bearingSnap为7时，如果用户将地图旋转到北纬7度以内，地图将自动捕捉到正北
|fitBoundsOptions|	Object	|	|对bounds适应范围的属性设置
|boxZoom|	boolean|	true|	是否启用“缩放工具”部件
|clickTolerance|	number|	3	|用户在单击过程中可以移动鼠标指针的最大像素数，以便将其视为有效的单击（与鼠标拖动相反）
|collectResourceTiming|	boolean|	false|	若true，则收集资源请求耗时信息，在属性 resourceTiming 和相关事件的 data里返回
|container|	HTMLElement or string|		|渲染地图的 HTML 元素id，被指定的元素不允许有子元素
|cooperativeGestures|	boolean	|	|若true，则需要按【ctrl】(win)或【⌘】(mac)来滚动缩放地图，移动设备则需要两指平移/三指俯仰地图
|crossSourceCollisions|	boolean	|true	|若true，则多源符号可能会相互碰撞，若false，则每个源的符号分别运行碰撞检测
|doubleClickZoom|	boolean|	true|	若true，则双击鼠标自动缩放地图
|dragPan|	(boolean or Object)|	true|	是否可以（长按左键）拖拽地图，并设置拖拽属性
|dragRotate|	boolean|	true|	是否可以（长按右键）旋转地图
|fadeDuration|	number|	300|	控制标签碰撞的淡入/淡出动画的持续时间，单位：毫秒，会影响所有符号图层。不会影响运行时样式转换或光栅平铺交叉淡入的持续时间
|failIfMajorPerformanceCaveat|	boolean|	false|	若true，则如果Mapbox GL JS的性能大大低于预期（将使用软件渲染器），地图创建将失败
|hash|	(boolean or string)|	false|	若true，则在浏览器地址栏中显示跟地图位置姿态相关的数据 (zoom, center latitude, center longitude, bearing, and pitch) ，一般在调试阶段比较有用，如：http://path/to/my/page.html#map=2.59/39.26/53.07/-24.1/60&foo=bar
|interactive|	boolean|	true|	若false，则地图不关联任何鼠标/触摸板/键盘等监听事件，也就是说地图对交互不会有任何反应
|keyboard|	boolean|	true|	是否启用键盘快捷键
|language|	(“auto” or string or Array)|	null|	若设置为【auto】，则语言与浏览器同步
|locale|	Object|	null|	UI字符串（如控件工具提示）的默认本地化，不设置则与浏览器同步
|localFontFamily|	string|	false|	CSS font，会覆盖 localIdeographFontFamily 的设置
|localIdeographFontFamily|	string|	‘sans-serif’|	表意文字相关，会被 localFontFamily 设置覆盖
|logoPosition|	string|	‘bottom-left’|	文字标记在地图上的位置：top-left , top-right , bottom-left , bottom-right
|maxBounds|	LngLatBoundsLike|	null|	改变地图的适应范围
|minZoom/maxZoom|	number|	0/22|	地图的最小/大缩放级别（0-24）
|minPitch/maxPitch|	number|	0/85|	地图的最小/大俯仰角度（0-85）
|minTileCacheSize/maxTileCacheSize|	number|	null|	切片缓存中存储的最小/大切片数
|optimizeForTerrain|	boolean|	true|	若true，则地图将按性能优先级进行渲染，若false，则按照图层顺序优先级进行渲染
|performanceMetricsCollection|	boolean|	true|	若true，则将收集并发送性能指标
|pitchWithRotate|	boolean|	true|	若false，则俯仰控制被禁用
|preserveDrawingBuffer|	boolean|	false|	若true，则可用 map.getCanvas().toDataURL() 将地图的画布导出为PNG，默认false性能优化
|projection|	ProjectionSpecification|	‘mercator’|	地图渲染的坐标系
|refreshExpiredTiles|	boolean|	true|	瓦片过期后是否重新请求
|renderWorldCopies|	boolean|	true|	-180/180度以外的部分是否渲染世界副本
|scrollZoom|	(boolean or Object)|	true|	是否启用“滚动缩放”交互
|style|	(Object or string)|		|地图样式，必须是JSON格式或者指向JSON的 URL
|testMode|	boolean|	false|	token失效时报错，编写单元测试时用
|touchPitch|	(boolean or Object)|	true|	是否启用“拖拽俯仰”交互
|touchZoomRotate|	(boolean or Object)|	true|	是否启用“捏旋转和缩放”交互
|trackResize|	boolean|	true|	若true，则地图将在浏览器窗口调整大小时自动调整大小
|transformRequest|	RequestTransformFunction|	null|	在 Map 请求外部 URL 之前运行回调
|worldview|	string|	null	|某些争议边界的呈现方式