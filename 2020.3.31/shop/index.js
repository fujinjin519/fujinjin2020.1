let ary=[] //把数据放到全局，数据是私有的
function getdata(){
    let xhr=new XMLHttpRequest();
    xhr.open("get","./data.json");
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            let data=JSON.parse(xhr.response)
            console.log(data);
            render(data)
            ary=data //后台拿到的数据
    }
    }
    xhr.send()
}
getdata()
//渲染数据
function render(data=[]){ 
    let str=``; //拿到的数据，拼接成字符串，让再放到ul里面
    data.forEach((item)=>{
        console.log(item);
        
        str+=`<li>
        <div class="img_box">
          <img src="${item.img}" alt="">
        </div>
        <h2>${item.title}</h2>
        <div class="price_box">
          <span class="price">${item.price.toFixed(2)}</span>
          <span class="select_icon">多款可选</span>
        </div>
        <ul class="feature_box">
          <li>好使</li>
          <li>限时抢购</li>
        </ul>
        <div class="comment_box">
          <span>34343人评价</span>
          <span>99%好评</span>
        </div>
      </li>`
    })
    let ul=document.querySelector(".phone_list_box")
    ul.innerHTML=str

 }


 let timeBtn=document.getElementsByClassName("sort_btn")[1]
// console.log(timeBtn);

timeBtn.flag=1
timeBtn.onclick=function(){
    // console.log(ary);
    this.flag*=(-1)
    let a=ary.sort((a,b)=>{
        return (a.time-b.time)*this.flag
    })
    render(a)
}
let priceBtn=document.getElementsByClassName("sort_btn")[3]
// console.log(price);
priceBtn.flag=1
priceBtn.onclick=function(){
    this.flag*=(-1)
    let b=ary.sort((a,b)=>{
        return (a.price-b.price)*this.flag

    })
    render(b)
 }
 
 let hotBtn=document.getElementsByClassName("sort_btn")[2]
//  console.log(hot);
hotBtn.flag=1
hotBtn.onclick=function(){
    this.flag*=(-1)
    let c=ary.sort((a,b)=>{
        return (a.num-b.num)*this.flag

    })
    render(c)


}


 
 
 







