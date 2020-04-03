(function(){
   
   let navList=document.querySelectorAll('.navbar-nav .nav-item'),
      productBox=document.querySelector('.productBox')
      cardList=null
      data=null;

   let xhr=new XMLHttpRequest;
   xhr.open('GET',"./json/product.json",false)
   xhr.onreadystatechange=()=>{
   if(xhr.readyState===4&&xhr.status===200){
        data=JSON.parse(xhr.responseText)
  }
  };
  xhr.send()
  
  let str=``
  for(let i=0;i<data.length;i++){
      let item=data[i];
      let{
        id,
        title,
        price,
        time,
        hot,
        img

      }=item
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
  }
  productBox.innerHTML=str
  cardList=productBox.querySelectorAll(".card");
  
  for(let i=0;i<navList.length;i++){
      let item=navList[i]
      item.flag=-1;
      item.onclick=function(){
          let arr=Array.from(cardList);
          for(let z=0;z<navList.length;z++){
              if(navList[z] !==this){
                  navList[z].flag=-1
              }
             }
          this.flag*=-1;
          let char="data-price";
          i===1?char="data-time":null
          i===2?char="data-hot":null;
          arr.sort((a,b)=>{
              a=a.getAttribute(char)
              b=b.getAttribute(char)
              if(char==="data-time"){
                  a=a.replace(/-/g,"")
                  b=b.replace(/-/g,"");

              }
              return (a-b)*this.flag
          });
          for(let j=0;j<arr.length;j++){
              productBox.appendChild(arr[j])
          }
      }
  }
})()