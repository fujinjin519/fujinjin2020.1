let shop=(function(){
    let navList=document.querySelectorAll(".navbar-nav .nav-item")
    let productBox=document.querySelector(".productBox")
    data=null;

let huodata=function huodata(){
    let xhr=new XMLHttpRequest;
    xhr.open("GET","./json/product.json",false)
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4&&xhr.status===200){
            data=JSON.parse(xhr.responseText)
            // console.log(data);
            
        }
    }
    xhr.send()
}

let render=function render(){
    let str=``;
    data.forEach((item)=>{
        // console.log(item);
        let{title,price,time,hot,img}=item
        str+=` <div class="card">
        <img src="${img}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">HUAWEI Mate 10 4GB+64GB 全网通版（亮黑色）</h5>
            <p class="card-text">价格：¥${price.toFixed(2)}</p>
            <p class="card-text">销量：${hot}</p>	 
            <p class="card-text">时间：${time}</p>
          </div>
       </div>
 
     </div> `
        

    })
    productBox.innerHTML=str
   
}

let clear=function clear(){
    Array.from(navList).forEach((item,index)=>{
        if(item!==this){
            item.flag=-1
        }

    })
}

let change=function change(){
  Array.from(navList).forEach((item,index)=>{
      item.flag=-1
      item.onclick=function(){
        clear.call(this)
          this.flag*=-1
          let pai=this.getAttribute("data-pai")
          data.sort((a,b)=>{
              a=String(a[pai]).replace(/-/g,"")
              b=String(b[pai]).replace(/-/g,"")
               return (a-b)*this.flag

          })
          render()


      }
  })
  }

return{
        init(){
            huodata()
            render()
            change()


        }
    }
})()
shop.init()
