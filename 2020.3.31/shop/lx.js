let ary=[]
function getdata(){
    let xhr=new XMLHttpRequest()
    xhr.open("get","./data.json")
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4&&xhr.status===200){
            let data=JSON.parse(xhr.response)
            console.log(data);
            render(data)
            ary=data
        
    
         }
       }
    xhr.send()
 }
getdata()

seqq    
function render(data=[]){
    let str=``;
    data.forEach((item)=>{
        console.log(item);
        
        str+=` <li>
    <div class="img_box">
      <img src="${item.img}" alt="">
    </div>
    <h2>${item.title}</h2>
    <div class="price_box">
      <span class="price">${item.price}</span>
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
   console.log(ul);
   
   ul.innerHTML=str
   

 

}

let timeBtn=document.getElementsByClassName("sort_btn")[1]
timeBtn.flag=1
timeBtn.onclick=function(){
    this.flag*=(-1)
    let b=ary.sort((a,b)=>{
     return (a.time-b.time)*this.flag
    })
    render(b)
}



