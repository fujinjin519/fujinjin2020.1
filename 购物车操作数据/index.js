let shop=(function () {
    //获取要操作的元素
    let box=document.querySelector(".box");
    //构建数据，后台没有数据的时候，我们需要自己构建数据
    let data=[
        {id:1,count:0,price:12.5},
        {id:2,count:0,price:10.5},
        {id:3,count:0,price:8.5},
        {id:4,count:0,price:8},
        {id:5,count:0,price:14.5}
        ]
    //渲染数据,数据写死的，变成动态用${}
    let render=function render() {
        let counts=0//定义总数量 先设置为0
        let total=0//总小计
        let priceArr=[0] //总商品单价
        let str=`<ul class="list">`;
        
        data.forEach((item)=>{
            let{
                id,
                count,
                price
            }=item//解构赋值
            //循环数据中的每一项，计算总数量和总价格，以及所有单价存到数组中
            counts+=count //
            total+=count*price
            count>0 ?priceArr.push(price) :null; //已经购买的数量才会被算进去，没购买不算

         
            str+=`<li>
            <i  data-btn="minus" data-id='${id}'></i>
            <em>${count}</em>
            <i  data-btn="plus" data-id='${id}'></i>
            <span>
                单价：<strong>${price}元 </strong> 
                小计：<strong>${count*price}</strong>
            </span>
        </li>`
              
        })
        str+=`</ul>`
        
        str+=`<div class="info">
        <span>商品公合计：<em>${counts}</em>件</span>
        <span>共花费了：<em>${total}</em>元</span>
        <br />
        <br />
        <span>其中最贵的商品单价是：<em>${Math.max(...priceArr)}</em>元</span>
    </div>`;

    box.innerHTML=str
    handle() //每次页面按照数据渲染完，
  }
  //事件绑定
  let handle=function handle() {
    let btns = Array.from(box.querySelectorAll('i'));
      //获取i按钮标签 1，没法区分+ -号 2，我哪知道点击的哪一项。有10项
      //1，区分加减号，通过自定义属性data-btn,
      //2，知道点击的哪个，也是自定义属性，通过id,data-id来搞定
      //当点击的时候，只需要从当前点击的这个I中，获取标识值，就啥都知道了
      console.log(btns);//总共10个+—号码
      
      btns.forEach((item)=>{
          item.onclick=function(){
              //获取加减号  获取id
              let btn=this.getAttibute("data-btn"),
                  id=this.getAttibute("data-id")
              id=parseInt(id) //getAttibute获取结果是字符串
              data=data.map(cur=>{//当前的这一项
                  if(cur.id===id){
                      if(btn==="minus"){
                          cur.count--
                          cur.count<0 ?cur.count=0 :null;
                       }else{
                           cur.count++
                       }
                   }
                   return cur
              });
              render()
             }
          })
      }

  return{
        init(){
            render()

        }
    }
    
})()
shop.init()
