let pbl=(function () {
    //1.获取要操作的元素,用jq的形式
    let $columns=$(".column");
   
    //2.从后台获取数据
    let getdata=function() {
         $.ajax({
            url:"./json/data.json",
            method:"get",
            // async:false, //同步  默认是异步的
            success:function(data) { 
                console.log(data); //获取到数据，获取完数据了执行下面的数据
                render(data) //异步的形式写的，不会等,render在这执行，不再下面写了
                lazyLoadImg();
                flag=true;
               
            }
           })
         }
    //3.获取完数据，把数据渲染到页面上 ，js是单线程。
    let render=function(data=[]){  //给数据给默认值
        //循环数据
        data.forEach((item,index)=>{
            //item代表数组中的每一项
            //console.log(item);
            let h=(230*item.height)/item.width; //设置的宽度是230，要获取到它的高度，每个图片的高度不同，没空白
            let str=`<div class="card">
            <a href="${item.link}">
                <div class="lazyImageBox" style='height:${h}px'>
                    <img src="" alt="" data-image="${item.pic}">
                </div>
                <p>${item.title}</p>
            </a>
        </div> `;
        //colums 三列 三个元素，n只能是0，1，2，
                         //3，4，5     6.7.8   每三个一组
        
        // let n=index%3  //取3的余数
        // $columns.eq(n).append(str) //
        
        //以上这种方式按照索引填充，有可能导致长短不一，长的长，短的短，
        //我们采用方式：每次填充时去查找到最矮的那个 columns
        //把这三个列排序，可以找到最短的那个,按照高度
       let el=[...$columns].sort((a,b)=>{ //获取最短的那个
        // console.log(a.offsetHeight,b.offsetHeight);
           return a.offsetHeight-b.offsetHeight
    
           

       })[0];//这样写不用取余了，按照最低的排序。sort排序完后是数组，数组的第一项[0]，是最低的
       $(el).append(str) //插入到容器中
    })
      }
    //4.图片懒加载
    let lazyLoadImg=function(){
        //先把所有图片获取到
        let $imgs=$(".container img") //container 下面的img都获取到
        //t获取屏幕的高度加上卷起来的高度(页面底部加上顶部的距离)
        let $window=$(window) //原生转为jq的对象写法
        //$(window).offsetHeight 屏幕的高度
        //$（window.scrolltop:获取卷曲的高度
        let T=$window.outerHeight()+$window.scrollTop();
        [...$imgs].forEach((item,index)=>{
           //item.每一张图片
           let $item=$(item) //原生变为jq
           if($item.css("opacity")==1)return; //说明这张图片已经加载过了
           let h=$item.offset().top//图片顶部到body顶部的偏移量
           if(h<T){
               //图片顶部已经露出来了
               let src=$item.attr("data-image")
               $item.attr("src",src) //把真实图片的地址赋给img的src属性
               $item.on("load",function(){
                   $item.css("opacity",1)
               })
            }
       
        })
      }
    //6.加载更多图片,在
    let loadMore=function(){
        let $window=$(window);
        let T=$window.outerHeight()+$window.scrollTop();
        let el=[...$columns].sort((a,b)=>{
            return a.offsetHeight-b.offsetHeight
        })[0] //最短的那个出现的时候就加载出来
        let $el=$(el);//把原生转为jq
        //最矮的这个元素底边到body顶边的距离
        let h=$el.offset().top+$el.outerHeight();
        if(h<T){
            //证明最短的那个底边就让它加载显示出来图片
            if(!flag)return;
            flag=false;
            getdata(); //触发很多次，只要触发一次，防抖处理
          }
        }
    return{
        init(){
            getdata();
            //5.当页面滚动的时候懒加载，
            window.onscroll=function(){
                lazyLoadImg();
                loadMore();

            }         
        }
     }
    
})();
pbl.init();