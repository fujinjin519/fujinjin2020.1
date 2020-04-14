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
                    <img src="${item.pic}" alt="" data-image="${item.pic}">
                </div>
                <p>${item.title}</p>
            </a>
        </div> `;
        //colums 三列 三个元素，n只能是0，1，2
        
        // let n=index%3  //取3的余数
        // $columns.eq(n).append(str) //
        
        //以上这种方式填充，有可能导致长短不一，长的长，短的短，
        //我们采用方式：每次填充时去查找到最矮的那个 columns
        //把这三个列排序，可以找到最短的那个
       let el=[...$columns].sort((a,b)=>{ //获取最短的那个
           return a.offsetHeight-b.offsetHeight

       })[0];//这样写不用取余了，按照最低的排序。sort排序完后是数组，数组的第一项[0]，是最低的
       $(el).append(str) //插入到容器中
    })
      }
     
    return{
        init(){
            getdata();
   

        }
    }
    
})();
pbl.init();