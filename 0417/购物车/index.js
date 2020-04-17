//jq实现购物车
$(function(){ //事件触发才会执行这个大函数不是闭包，这是一个事件绑定，监听的是一个事件（和onload事件不同，widow.onload是所有资源加载完
    //1.获取要操作的元素list和info下的所有元素
    let $list=$(".list")
        $btns=$list.find("i")//按钮
        $countBox=$list.find("em") //数量
        $strongs=$lisy.find("strong")
        $priceBoxs=$strongs.even(), //索引为奇数是小计，偶数为单价
        $




     let $info=$(".info"),
         $infoEms=$info.find("em") //info的儿子是span，孙子是em.孙子辈用find,子代获取child
         $totalBox=$infoEms.eq(0), //总计处的元素。eq获取
         $totaPricelBox=$infoEms.eq(1)
         $maxPriceBox=$infoEms.eq(2)




    
    






})