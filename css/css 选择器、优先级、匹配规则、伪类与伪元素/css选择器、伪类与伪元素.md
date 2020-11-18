### CSS选择器、伪类与伪元素

---

1. #### 类选择器

   - ##### 即标签选择器

2. #### 属性选择器

   - ##### class属性

   - ##### id属性

   - ##### style属性

3. #### 组合选择器

   - ##### 伪类和伪元素（均不存在于html）

     - ###### a `:link`  `:hover` `:active` `:visited` 

     - ###### input `:focus` `:enabled` `:disabled` `:checked` 

     - ###### `:first-of-type` `:lase-of-type` `:nth-of-type(n)` `nth-child(n)`

   - ##### 将类选择器、属性选择器组合

4. #### 优先级

   - ##### !important

   - ##### style

   - ##### id

   - ##### class

   - ##### 标签

   - ##### 浏览器自定义属性、继承属性

5. #### 伪类、伪元素

   - ##### 区别：伪类操作对象是文档中已有的元素，伪元素创建一个文档外的元素

   - ##### 以 `::` 开头，可能会改变dom结构，创建虚拟dom

   - ##### `::before` `::after` ,在元素的前后创建虚拟dom，通常和`content` 一起使用

   - ##### `::first-letter` `::first-line` 改变选中元素内文本节点的第一个字母，第一行样式

   - ##### `::selection` 用于修改鼠标选中的文本样式，仅限于 `color` `background` `cursor` `outline`