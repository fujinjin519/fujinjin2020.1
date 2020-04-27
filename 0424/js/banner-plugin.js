
  class BannerPlugin{
      constructor(container,opitios){
          this.container=container;
          //循环options,options挂载到实例上
          _each(options,(item,key)=>{
               this[key]=item

          })
          this.step=this.initialSlide

      }
       
  }





function bannerPlugin(container,opitios={}){
    //1.设置传参问题，实参与形参一一对应的，
    //2.传递多个参数的情况可以直接写成对象里面有（对象和键值对）
    
    //1.不传递信息我们给其设置默认值
    let defaultParams={
        initialSlide:0,
        autoplay:3000,
        speed:3000,

    }
    //2.传递信息就替换默认值的就行，也就是深比较
    opitios=_assginDeep(defaultParams,opitios)
//3.实现轮播图效果  用面向对象，类的方式
 
     return new BannerPlugin(container,opitios)

}

bannerPlugin(box,0,3000,300,{})
bannerPlugin(box)
bannerPlugin(box,{ //如果传递信息了替换传递的
    // 属性名：属性值
})

