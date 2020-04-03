//单例模式实现。利用数据实现视图更新
let shopModule=(function(){
    //每个模块需要实现的方法，在闭包里
    //1.获取要操作元素
    let navList=document.querySelectorAll(".navbar-nav .nav-item"),
        productBox=document.querySelector(".productBox")
        data=null;
    //2.从服务器获取数据
    let queryData=function queryData(){
        let xhr=new XMLHttpRequest;
        xhr.open("GET","./json/product.json",false)
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4&&xhr.status===200){
                data=JSON.parse(xhr.responseText)
                console.log(data);
                
            }
        }
        xhr.send()
    };
    //3.渲染数据.获取到的数据。渲染到页面中
    let render=function render(){
        let str=``
        data.forEach(item=>{
            //遍历数组中的每一项
            //每循环一次拼一个card
            //item东西比较多，我们用解构赋值
            //let obj = {name:'xxx',age:10};
// let {
//     name,
//  }  = obj;
            let{title,price,time,hot,img}=item;

            str+=`<div class="card">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">HUAWEI Mate 10 4GB+64GB 全网通版（亮黑色）</h5>
                <p class="card-text">价格：￥${price.toFixed(2)}</p>
                <p class="card-text">销量：${hot}</p>
                <p class="card-text">时间：${time.replace(/-/g,'/')}</p>
                <a href="#" class="btn btn-primary">立即购买</a>
            </div>
        </div>`
      });
      productBox.innerHTML = str;
    //   console.log(str);
      

    }
    //4,循环所有的li。每个按钮实现绑定事件
    let clear=function clear(){
        //点击当前LI，按照当前维度排序，最好让其它的维度的FLAG回归初始-1，这样再点击其它的，才是继续从升序开始。解决
        Array.from(navList).forEach(item=>{
            if(item!==this){
                item.flag=-1 
            }
        })
    }
    let handle=function  handle(){
        //x类数组集合，先把类数组要转数组
        Array.from(navList).forEach((item,index)=>{
            item.flag=-1//设置自定义属性，默认是-1 ,  -1 第一次点击1升序  第二次点击 -1  降序
            item.onclick=function(){
                clear.call(this)
                this.flag*=-1 //this。就是点击的这个li
                //直接操作的是data。直接操作
                let pai=this.getAttribute('data-pai') //点击哪个this,就是哪个price,time,hot//点击的时候获取这个字段就可以了
                //obj['name'] let tt='name' obj[tt]


                data.sort((a,b)=>{
                    //a,是数据 数据的前一项和后一项
                    //在html.结构中设置自定义属性.data-pai
                    //当点击li的时候，我们控制其按照某一个字段排序，字段存储当前li的自定义属性上
                    //进来到底按照哪个排序
                    // let pai=this.getAttribute('data-pai') //获取自定义属性
                   a=String(a[pai]).replace(/-/g,"") //字符串才有replace方法，没效果报错，需要把获取到结果都先变为字符串
                   b=String(b[pai]).replace(/-/g,"")
                    return (a-b)*this.flag
                 })
                render()
                //效果实现但是有个问题就是，点击当前LI，按照当前维度排序，最好让其它的维度的FLAG回归初始-1，这样再点击其它的，才是继续从升序开始。解决
              }
        });

    };
     return {
        //模块的入口，在这个按照顺序一次实现整个模块的功能
        init(){ //init初始化
            queryData()
            render();
            handle()


        }
    }

})()
shopModule.init();