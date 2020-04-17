let pbl=(function(){
    //获取要操作的元素，在这里直接转成数组了
   let columns=Array.from(document.querySelectorAll(".column")),
     data=[];

//获取数据
let queryData = function queryData() {
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/data.json', false); xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            console.log(data);
            
        }
    };
    xhr.send();

};
//数据插入到页面中
let bindHTML=function bindHTML(){
    //获取到的数据的宽高度不一样，渲染到宽度为230窗口中，宽度会缩放.高度不一样变形，按照高度排序，
    //按照真实图片的宽度和渲染宽度230做对比，渲染高度计算处理
    data=data.map(item=>{
        let w=item.width,
            h=item.height;
            h=h/(w/230);//对应的能到的高度
          //最后要放的宽度和高度
          item.width=230;
          item.height=h;
          return item
     });
     //数据3个为一排，为一组，进行循环
    for(let i=0;i<data.length;i+=3){
        // console.log(i); //0.1.2  一组
                            //3.4.5 二组
                            //6.7.8 三组
        
    //截取到的每三个为一组数据，然后按照高度进行排序升序
       let group=data.slice(i,i+3);
         group.sort((a,b)=>{
            // console.log(a.height);
            return a.height-b.height;
      });
      //把三列按照高度进行排序，降序
      
      columns.sort((a,b)=>{
          return b.offsetHeight-a.offsetHeight
      });
      //把循环好的数据，插入到card中
      
      
      group.forEach((item,index)=>{
          //解构呀赋值
          let{
            pic,
            link,
            title,
            height}=item
            //获取card元素
          let card=document.createElement('div')
          card.className="card"//类选择器获取card
          //获取元素和html结构也包括
           card.innerHTML=`<a href="${link}">
        <div class="lazyImageBox" style="height:${height}px">
            <img src="" alt="" data-image="${pic}">
        </div>
        <p>${title}</p>
        </a>`
        columns[index].appendChild(card)


        
      })
    }
 };
  //延迟加载
  let  lazyFunc=function  lazyFunc(){
      //所有的图片都得延迟加载，获取lazyImageBox盒子元素
     let lazyImageBoxs=document.querySelectorAll(".lazyImageBox");
     [].forEach.call(lazyImageBoxs,lazyImageBox=>{
         let isLoad=lazyImageBox.getAttribute("isLoad")



     })
  


};

return{
        init(){
            queryData();
            bindHTML();
            lazyFunc();
        

        }
    }

})()
pbl.init();