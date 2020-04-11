let cascade=(function(){
    //获取要操作的元素
    let colums=Array.from(document.querySelectorAll('.column'));
        data=null
   
   
   //获取数据
    let queryData=function queryData(){
      let xhr=new XMLHttpRequest;
      xhr.open("GET","json/data.json",false);
      xhr.onreadystatechange=()=>{
          if(xhr.readyState===4 && xhr.status===200){
               data=JSON.parse(xhr.responseText)
               console.log(data);
         }
      }
      xhr.send()

    }
   
    //获取数据插入到页面中
   let bind=function bind(){
       data=data.map(item=>{
           let w=item.width,
               h=item.height;
            h=h/(w/230)
            item.width=230;
            item.height=h;
            return item

       })
       

     //每3组数据为一轮
     for(let i=0;i<data.length;i+=3){
           //group每一轮获取的三个数据   
           //数据从小到大排序，数据的宽度一样，高度排序，高度从小到大排序
           let group=data.slice(i,i+3);//索引n开始截取到m,不包括m
           group.sort((a,b)=>{
               //每一组数据按照高度排序
               return a.height-b.height
           });
           //把三个列按照现在的高度进行排序（降序）
           colums.sort((a,b)=>{
               return b.offsetHeight-a.offsetHeight

           });
           //循环三个数据中的每一项，每循环一项
           group.forEach((item,index)=>{
               let{id,pic,link,title,width,height

               }=item
               let str=`<div class="card">
               <a href="${link}">
                   <div class="lazyImageBox" style="height:${height}.px">
                   
                       <img src="images/1.jpg" alt="">
                   </div>
                   <p>${title}</p>
               </a>
           </div>`;
               
               colums[index].innerHTMl+=str
               //要设置一个高

           })
         
        
        }
      }

      //数据绑定完成做延迟加载
      let lazyFunc=function lazyFunc(){
          //单张图片加载
          //延迟加载处理
      
    }




    return{
        init(){
            queryData()
            bind()
            lazyFunc()

        }
    }
})()
cascade.init()