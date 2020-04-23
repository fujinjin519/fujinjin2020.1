//1.操作元素
let container = document.querySelector(".container")
wrapper = document.querySelector(".wrapper")
pagination = document.querySelector(".pagination")
paginationList = document.querySelectorAll("li");
changeLeft = document.querySelector(".changeLeft")
changeRight = document.querySelector(".changeRight")
sliderList = wrapper.querySelectorAll(".slider")
//2，定义公共数据
let step = 0; //索引
    interval=1000; //间隔时间
	len = sliderList.length; //slider的个数
	autoTimer=null; //自动轮播定时器

//3.自动轮播
function automove(){
    if(step===(len-1)){
		step=0;
		wrapper.style.transitionDuration="0s"
		wrapper.style.left="0px"
		wrapper.offsetWidth;
	}
	step++;
	wrapper.style.transitionDuration="0.3s"
	wrapper.style.left=-step*800+"px"
	paginationFocus()
}


//4.焦点对齐
function paginationFocus(){
	let tempStep=step;

	tempStep===(len-1) ? tempStep=0:null;
    [].forEach.call(paginationList,(item,index)=>{
		if(index===tempStep){
		   item.className="active";
		   console.log(item);
		   
		   return
	 }
	   item.className=""
   })
   
}
autoTimer=setInterval(automove,interval)


//鼠标进入停止
container.onmouseenter=function(){
	clearInterval(autoTimer)
}
//鼠标离开播放
container.onmouseleave=function(){
	autoTimer=setInterval(automove,interval)

};
//6.实现焦点切换
[].forEach.call(paginationList,(item,index)=>{
	item.onclick=function(){
		if(index===step||(index===0&&step===(len-1))){
			return;
		}
		step=index;
		wrapper.style.transitionDuration="0.3s";
		wrapper.style.left=-step*800+"px"
		paginationFocus()
      }
})
//7.
changeRight.onclick=automove;
changeLeft.onclick=function(){
	if(step==0){
		step=len-1;
		wrapper.style.transitionDuration="0s";
		wrapper.style.left=-step*800+"px"
		wrapper.offsetWidth;
	}
	step--;
	wrapper.style.transitionDuration="0.3s"
	wrapper.style.left=-step*800+"px"
	  paginationFocus();

}