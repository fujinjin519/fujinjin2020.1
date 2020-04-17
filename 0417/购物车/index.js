//jq实现购物车
$(function(){ //事件触发才会执行这个大函数不是闭包，这是一个事件绑定，监听的是一个事件（和onload事件不同，widow.onload是所有资源加载完
    //1.获取要操作的元素list和info下的所有元素
    let $list=$(".list")
        $btns=$list.find("i")//按钮
        $countBoxs=$list.find("em") //数量
        $strongs=$lisy.find("strong")
        $priceBoxs=$strongs.even(), //索引为奇数是小计，偶数为单价
        $xiaojiBoxs=$strongs.odd();




     let $info=$(".info"),
         $infoEms=$info.find("em") //info的儿子是span，孙子是em.孙子辈用find,子代获取child
         $totalBox=$infoEms.eq(0), //。总计元素通过eq获取
         $totalPricelBox=$infoEms.eq(1)
         $maxPriceBox=$infoEms.eq(2)
   //2.计算最后的总数据，用数组的reduc求和，转成数组
   function computed(){
       //总数量
    let total=Array.from($countBoxs).reduce((n,item)=>{
           return n+parseFloat($(item).html())
    },0);
    $totalBox.html(total);
    //总价格
    let totalPrice= [...$xiaojiBoxs].reduce((n,item)=>{
        return n+parseFloat($(item).html())
    },0)
    $totalPriceBox.html(totalPrice.toFixed(2))
    //最高单价
    let arr=[0];
    $countBoxs.each((index,item)=>{ //循环数量盒子
        if($(item).html()>1){ //大于1就是购买过的
            //数量盒子的索引和单价的索引是一样的
            //把所有单价购买过的放到arr里，比较谁最大
            arr.push(parseFloat($priceBoxs.eq(index).html))
        }
      //最后要放到总数据的最大值
   
     });
     $maxPriceBox.html(Math.max(...arr))
 }
 computed()

 //3.点击按钮控制数量和小计的变化
 $btn.on("click",function(){
     //jq里面有内置循环的机制，集合.xxx()
     //this:当前点击的这个按钮
     //不管加还是减，找到爹的e m，爹的stong,里面的索引为1的就是小计
     let $this=$this //点击的按钮加减,
          flag=$this.attr("data-btn") //获取自定义属性，加号减号
        $parent=$this.parent()//获取父亲节点
        $countBox=$parent.find("em"),
        $strongsx=$parent.find("strong")
        $xiaojiBox=$strongs.eq(1)
        $priceBox=$strongs.eq(0)
    //点击加号
    let count=parseFloat($countBox.html)
    if(flag==="plus"){
        count++
     }else{
         count--
         count<0 ? count=0 :null
     }
     $countBox.html(count);
     let xiaoji=count*parseFloat($priceBox.html())
     $xiaoji=



 })
})