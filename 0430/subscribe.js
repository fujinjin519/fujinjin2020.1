// 自己封装发布订阅 ,基于原生js
(function anonymous(){ //闭包 私有的
      class Sub{
          //创建是事件池挂载在实例上，事件池有标示
          pond={}//相当于写constructor，实例上的方法 .整个事件池，
          
          //1.向事件池追加方法
          on(flag,func){
              //1.校验新增的标示是否存在，不存在创建标示,如果存在那就拿到现有的值
          let pond=this.pond;  //获取事件池 //堆内存地址AAAff00
          if(!pond.hasOwnProperty(flag)){
              pond[flag]=[] //没有加一个空数组
           }
           let arr=pond[flag]; //bbbfff0也是地址
           //加之前去重，已经存在不加了，用inclucdes
           if(!arr.includes(func)){ //不存在加进来
            arr.push(func) //把func方法加进来

           }
         }
          //2.从事件池删除
          off(flag,func){
              let pond=this.pond;
              let arr=pond[flag] //从事件池找到这个标示的数组
             //如果移除的标示不在事件池中，说明之前没设置过
             if(!arr)return;//就什么都不做
             for(let i=0;i<arr.length;i++){ //如果存在一项了
                 if(arr[i]===func){
                     //为了防止数组塌陷，用null解决值变索引不变，，数组塌陷索引就变了再循环没意义了。
                     arr[i]=null //站位

                    //  arr.splice(i,1); //增加的时候是去重的，所以移除1个
                  break
                 } n
           
             }

          }
          //3.通知事件池中的方法执行
          fire(flag,...params){
              //flag标示  marry等
              //...params其他的一些方法
              let arr=this.pond[flag]
              if(!arr) return //如果不存在直接返回
              for(let i=0;i<arr.length;i++){
                  let item=arr[i];  //存在就通知，把它的this//
                  //数组塌陷后，如果把当前项不是函数，从数组中删除
                 if(typeof item!=='function'){
                     arr.splice(i,1)
                     i--;
                     continue;
                

                 }
                  item.call(this,...params) 
              }

          }

      }
     window.subscribe=function subscribe(){
         return new Sub();
     }
})()
let sub=subscribe(); //创建一个发布订阅，相当于一个new实例,都是基于面向对象
sub.on("marry",fn1);  //通过实例一步步实现 //方法
sub.off("marry",fn1);   //移除
sub.fire("marry",10,20) //通知

// let sub2=subscribe("holiday") //两种写法
// sub2.on(fn1)
// sun2.off(fn1);
// sub2.fire(10,20)