//优化，基于单例模式实现业务开发
let shopModule=(function(){
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
    productBox = document.querySelector('.productBox'),
    cardList = null,
    data = null;
    //queryData.从服务器获取数据
    let queryData=function queryData(){
        //4步

    }
    //实现数据绑定，渲染到页面中
    let bindHTMl=function bindHTMl(){
        //放代码 循环改成foreach
    }
    //handleNav:按钮的循环事件绑定
    let handleNav=function handleNav(){
        
    }
    
    return{
        init(){//init:function(){...}普通函数不是箭头函数（es6：如果对象的属性是一个函数，则可以这样简写

        }
    }
})()













/* 以后写代码第一件事情应当就想到“闭包”：保护作用 */
(function () {
	// 获取需要操作的DOM元素
	let navList = document.querySelectorAll('.navbar-nav .nav-item'),
		productBox = document.querySelector('.productBox'),
		cardList = null,
		data = null;

	// 从服务器获取数据（AJAX）
	// ->从服务器获取的结果是JSON格式的字符串（我们需要把其处理为对象再操作）
	// ->vscode预览的时候，我们基于 open with live server 来预览，让页面地址是：http://127.0.0.1:5500...这种网络协议格式，而不是 file://E:... 文件协议格式，因为文件协议不能发送AJAX请求
	let xhr = new XMLHttpRequest;
	xhr.open('GET', './json/product.json', false);
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4 && xhr.status === 200) {
			data = JSON.parse(xhr.responseText);
		}
	};
	xhr.send(null);

	// 数据绑定
	// 我们从服务器获取的数据是一个数组，数组中有多少项，证明有多少个产品，此时我们创建多少个CAED盒子（展示不同的产品信息），最好把所有创建好的CARD放到容器中即可
	let str = ``; //=>ES6的模板字符串（两个撇）
	for (let i = 0; i < data.length; i++) {
		let item = data[i]; //=>item是获取的每一个产品对象
		let {
			id,
			title,
			price,
			time,
			hot,
			img
		} = item;
		// ${}是在ES6的模板字符串中拼接一个JS表达式（执行有结果的JS语句）的结果
		// 结构中写的 data-xxx 一般都是设置自定义属性
		str += `<div class="card" data-price="${price}" data-time="${time}"
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
	productBox.innerHTML = str;
	// 数据绑定完，获取到页面中创建的10个CARD盒子（cardList：存储的是CARD的元素对象，他是一个节点集合）
	cardList = productBox.querySelectorAll('.card');
   
    //循环事件绑定

    for(let i=0;i<navList.length;i++){
        let item=navList[i];
        console.log(item);//每一个li.价格 热度 销量 
         item.flag=-1
        item.onclick=function(){   
            let arr=Array.from(cardList)//类数组转数组
            for(let z=0;z<navList.length;z++){
                if(navList[z]!==this){
                    navList[z].flag=-1
               }
             }
            this.flag*=-1
            // console.log(this); //每一次点击
           let char="data-price";
           i===1?char="data-time":null;
           i===2?char="data-hot":null;
           arr.sort((a,b)=>{
               a=a.getAttribute(char)
               b=b.getAttribute(char)
               if(char==="data-time"){
                   a=a.replace(/-/g,'')
                   b=b.replace(/-/g,'')
               }
               return (a-b)*this.flas
           
             });
             for(let j=0;j<arr.length;j++){
                 productBox.appendChild(arr[j])
             }
           };
        }
    })()

   
//     //点击时间排序.
//     //  let  time=-1
//     navList[1].flag=-1//按照自定义属性，增加一个自定义属性
//      navList[1].onclick=function(){
//         //  time*=-1
//         //this就是 navList[1]
//         this.flag*=-1
//         let arr=Array.from(cardList)
//         arr.sort((a,b)=>{
//             a=a.getAttribute("data-time")
//             b=b.getAttribute("data-time")
//             a=a.replace(/-/g,'')
//             b=b.replace(/-/g,"")

//             return (a-b)*this.flag

//         })
//         for(let i=0;i<arr.length;i++){
//             productBox.appendChild(arr[i])
//         }
//      }


// })();

//重复绑定  要用循环事件绑定 ， 未来用事件委托
/* 
let arr = [10, 20, 30],
	flag = 1;
arr.sort((a, b) => {
	/!* // 第一次执行：a=20 b=10   flag=-1  交换位置  [20, 10, 30]
	// 第二次执行：b=20 a=30   flag=1  不交换位置 [20, 10, 30]
	// 第三次执行：b=30 a=10   flag=-1 交换位置 [20, 30, 10]
	debugger;
	console.log(a, b);
	flag = flag * -1;
	return flag; *!/
	// a 当前比较的下一项
	// b 比较的当前项
	// 返回小于零的的值，则两者交换位置
});
// console.log(arr); //=>[20,30,10] */