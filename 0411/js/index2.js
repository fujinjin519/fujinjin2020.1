let pblz=(function(){
    //1.获取元素
   let $columns=$(".column");
   $lazyBox=$(".$lazyBox")
   _data=[]
   //2.服务器获取数据
//    let getdata=function getdata(){
//        $.ajax({
//            url:"./json/data.json",
//            method:"get",
//            async:json,
//            success:function(){

//            }


//        })

//    }
    //实现数据绑定
    let bin
    
    
    
    
    return{
        init(){
            getdata()

        }
    }

})()
pblz.init()