# Intro
article-directory-react是一个简单实用的react组件，只需要提供文章的id,就可以自动生成相应的文章目录，根据目录你可以快速的定位到相应的段落所在的位置 
# Use
1 安装
``` js
    npm install react-article-directory
```
2 引入并在render中渲染
```js
import Directory from 'react-article-directory'

<Directory
          id="article"
          style={{topAbs:350,topFix:30}}
/>
```
## attention
为保证article-directory-react可以正常工作，请保证它的上级元素没有定位属性。
# Options  
  * `id` 包裹文章内容标签的id选择器，必要的。<br>
  * `selector` 决定了哪种元素作为目录的内容 (default: `h1`)<br>
  * `title` 目录的title。 (default: `Directory`)<br>
  * `style` 目录的样式，对象类型，包括了topAbs：目录绝对定位时的高度，topFix：目录固定定位时的高度（小于等于topAbs）,left:目录的left值，width：目录的宽度. (default: `{topAbs:100, topFix:30,left:100,width:250}`)<br>
  * `offset` 点击目录定位时，相对于selector元素所在位置的偏移量，数字类型(default: `0`)<br>
  * `itemStyle` 目录list中item的样式<br>
  * `refresh` 当文章内容更改需要重新获得目录内容时，只需改变refresh的值，即可刷新组件(例：每次fetch新的文章内容后，设置refresh的值为文章的id或者title)<br>
