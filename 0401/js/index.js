(function(){
    //获取要操作的dom元素
    let navList=document.querySelectorAll(".navbar-nav .nav-item")
    // console.log(navList);//获取 三个li 价格  时间  销量
       productBox=document.querySelector(".productBox"),
        console.log(productBox);//每一项数据
        cardList=null; //插入到页面中的数据为null
         data=null; //设定数据为null
       
      //获取数据通过ajax
      let xhr=new XMLHttpRequest;
      xhr.open("GET","./json/product.json",false)
      xhr.onreadystatechange=()=>{
          if(xhr.readyState===4&&xhr.status===200){
              data=JSON.parse(xhr.responseText); //json格式的字符串转为对象
            //   console.log(data); //获取后台提供的数据
          }
      }
      xhr.send()

      //渲染数据到页面上
      let str=`` //模版字符串，数据拼接到一起，数据是字符串形式的没有意义，我们要操作它的数组
      for(let i=0;i<data.length;i++){
          let item=data[i]
      
        //   console.log(item);//    //获取数据的每一项{}{}
        let{         
            id,
            title,
            price,
            time,
            hot,
            img
          }=item;
        //data-结构中自定义的属性/
        //先把写死的数据结构，拼接到一起用${},变成真正的后台数据。
        //${}:${}是在ES6的模板字符串中拼接一个JS表达式（执行有结果的JS语句）的结果
          str+=`<div class="card" data-price="${price}" data-time="${time}"
        data-hot="${hot}">
        <img src="${img}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">价格：￥${price.toFixed(2)}</p>
            <p class="card-text">销量：${hot}</p>
            <p class="card-text">时间：${time}</p>
        </div>
    </div>`;
    // console.log(str);//总共10个数据的每一个div结构都有,
     }
    productBox.innerHTML=str; //innerHTML： 获取元素的内容 (可以识别标签)
    //把获取的真实数据的结构插入到  productBox这个标签里在页面中展示出来

    cardList=productBox.querySelectorAll(".card");
    console.log(cardList); //获取每一个卡片，

    //循环事件绑定 （需要给每一个都绑定重复操作的话，可以用事件绑定）循环navlist里面的三个li
     for(let i=0;i<navList.length;i++){
         let item=navList[i]
         console.log(item); //获取三个li
         item.flag=-1;//设置自定义属性flag
         item.onclick=function(){
             let arr=Array.from(cardList) //类数组转数组，因为下面要进行数组的排序
             for(let j=0;j<navList.length;j++){
                 if(navList[j]!==this){ //不是要点击的那个，就让它等于-1
                     navList[j].flag=-1
                 }

             }
             this.flag*=-1
             let char="data-price";//创建一个变量是它的价格
             i === 1 ? char="data-time" :null;
             i === 2 ? char="data-hot" :null;
            //排序
            arr.sort((a,b)=>{
                a=a.getAttribute(char)
                b=b.getAttribute(char)//获取自定义属性，变量名接收
               
                if(char==="data-time"){
                   //遇到时间—，需要替换掉
                   a=a.replace(/-/g,"")
                   //正则全局有—,替换为空的，进行排序
                   b=b.replace(/-/g,"")
                }
                return(a-b)*this.flag
            });
            //排好序的数组，
            for(let z=0;z<arr.length;z++){
                productBox.appendChild(arr[z])
                //appendChild：把节点插入到容器的末尾
            }
        }
    }

    })()