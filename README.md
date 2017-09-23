# Intro
article-directory-react是一个简单实用的react组件，只需要提供文章的id,就可以自动生成相应的文章目录，根据目录你可以快速的定位到相应的段落所在的位置
# Options

  * `id` 包裹文章内容标签的id选择器，必要的。
  * `selector` 决定了哪种元素作为目录的内容 (default: `h1`)
  * `title` 目录的title。 (default: `Directory`)
  * `style` 目录的样式，对象类型，包括了topAbs：目录绝对定位时的高度，topFix：目录固定定位时的高度（小于等于topAbs）,left:目录的left值，width：目录的宽度. (default: `{topAbs:100, topFix:30,left:100,width:250}`)
  * `offset` 点击目录定位时，相对于selector元素所在位置的偏移量，数字类型(default: `0`)
  * `itemStyle` 目录list中item的样式
