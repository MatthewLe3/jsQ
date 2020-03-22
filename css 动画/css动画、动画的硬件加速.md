### CSS动画

---

1. #### @keyframes创建动画，再将动画绑定到选择器

2. #### 至少规定 动画时长、动画名称 两条动画属性

   - ##### 背景色变化，时长5s

     ```javascript
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Document</title>
     </head>
     
     <style>
         div{
             height: 100px;
             width: 100px;
             border: 1px solid black;
             animation: myfirst 5s;
         }
         @keyframes myfirst
         {
             from {background: red;}
             to {background: yellow;}
         }
     </style>
     
     <body>
         <div class="content">
     
         </div>
     </body>
     </html>
     ```

   - ##### 通过百分比设置多段动画

     ```javascript
     @keyframes myfirst
     {
         0%   {background: red;}
         25%  {background: yellow;}
         50%  {background: blue;}
         100% {background: green;}
     }
     ```

3. #### 动画属性

   | 属性                      | 描述                                                 | css版本 |
   | ------------------------- | ---------------------------------------------------- | ------- |
   | @keyframes                | 规定动画                                             | 3       |
   | animation                 | 所有动画属性的简写属性，除了animation-play-state属性 | 3       |
   | animation-name            | 规定@keyframes的名称                                 | 3       |
   | animation-duration        | 规定动画完成时间                                     | 3       |
   | animation-timing-function | 规定动画速度曲线，默认“ease”                         | 3       |
   | animation-delay           | 动画延迟，默认0                                      | 3       |
   | animation-iteration-count | 动画播放次数，默认1                                  | 3       |
   | animation-direction       | 动画是否在下一周期逆向播放，默认“normal”             | 3       |
   | animation-play-state      | 规定动画是否正在运行或暂停，默认“running”            | 3       |
   | state                     | 规定对象动画时间外的状态                             | 3       |

4. #### CSS相对于js动画的优缺点

   - ##### 优点：

     - ###### 1.性能稍好，浏览器会对css3动画进行优化，例如专门新建一个图层来跑动画

     - ###### 2.代码相对简单

   - ##### 缺点：

     - ###### 1.在动画控制上不够灵活

     - ###### 2.兼容性不好

     - ###### 3.部分动画功能无法实现（滚动）

5. ### CSS3 动画 transition

   1. ##### 鼠标放置div，宽度变为300px

      ```javascript
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      
      <style>
          div{
              height: 100px;
              width: 100px;
              transition: width 2s;
              border: 1px solid black;
              animation: myfirst 5s;
          }
          div:hover{
              width:300px;
          }
      </style>
      
      <body>
          <div class="content">
      
          </div>
      </body>
      </html>
      ```

   2. ##### 属性

      | 属性                       | 描述                            | CSS  |
      | -------------------------- | ------------------------------- | ---- |
      | transition-property        | 规定设置果冻效果的css属性的名称 | 3    |
      | transition-duration        | 持续时间                        | 3    |
      | transition-timing-function | 速度效果曲线                    | 3    |
      | transition-delay           | 延迟                            | 3    |

      

6. #### 硬件加速

   - ##### transform动画由GPU控制，支持硬件加速

   - ##### 硬件加速的原理

     - ###### 浏览器接受到html，渲染dom树，dom树与css结合形成渲染树，渲染树包含大量图层，每个渲染元素会被分配到一个图层中，每个图层加载到GPU进行纹理渲染，图层在GPU中transform是不会出发repain重绘的，这些transform操作由独立的合成器处理

     - ###### 3D，transform，`<viedo>` 、`<canvas>` 标签，CSS filters，z-index，会创建独立合成器

