(function(){
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
    productBox = document.querySelector('.productBox'),
    cardList = null,
    data = null;
    let xhr = new XMLHttpRequest;
    xhr.open('GET','./json/product.json',false);
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4 && xhr.status===200){
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
    console.log(data);
    // 数据绑定
    let str = ``;
    for(let i = 0;i<data.length;i++){
        let item = data[i];
        let{
            id,
            title,
            price,
            time,
            hot,
            img
        }=item;
        str+=`<div class="card">
        <img src="${img}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">价格：${price}</p>
            <p class="card-text">销量：${hot}</p>
            <p class="card-text">时间：${time}</p>
           
        </div>
    </div>`;
    }
    productBox.innerHTML = str;
    cardList= productBox.querySelector('.card');
    
})()