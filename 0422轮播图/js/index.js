//功能插件类的不需要单例模式
//1.操作dom先获取元素
let container = document.querySelector(".container")
wrapper = document.querySelector(".wrapper")
pagination = document.querySelector(".pagination")
paginationList = document.querySelectorAll("li")
changeLeft = document.querySelector(".changeLeft")
changeRight = document.querySelector(".changeRight")
sliderList = wrapper.querySelectorAll(".slider")
//2.定义公共数据step步长 ，控制展示第几个（索引），
// 还要定义间隔时间，设置一个3s
// 定义autoTimer：  存储自动轮播的定时器
//len：存储的是slider的个数（包含克隆的那一个）
let step = 0
interval = 1000,
    autoTimer = null
len = sliderList.length

//3.自动轮播
function automove() {
    if (step === (len - 1)) {
        //当3秒后到达索引step到达到克隆的那一张
        step = 0//索引立即切换到第一张
        wrapper.style.transitionDuration = "0s"//  //切换的时间也得改
        wrapper.style.left = "0px" //初始的位置left就是0

        wrapper.offsetWidth;//读写分离，通过获取样式中断渲染存储，让立即回到第一张操作渲染
    }
    step++;
    wrapper.style.transitionDuration = "0.3s"
    wrapper.style.left = -step * 800 + "px"

    //左移动是负数。每个宽度是800，看是往左移动一个还是两个，索引判断，初始值是0，移动一个800，两个1600.。。。
    // 上面一起渲染的时候会按照最后两条为主

    paginationFocus()
}
//4.焦点对齐
function paginationFocus() {
    //循环焦点每一项，根据焦点的索引跟step 的索引做对比，正常对应.但是多了最后一个
    let tempStep = step;//解决创建临时的step
    tempStep === (len - 1) ? tempStep = 0 : null;//临时的等于最后一个时候，让它的step变为0就和第一张一样了
    [].forEach.call(paginationList, (item, index) => {
        if (index === tempStep) {
            item.className = 'active';
            return
        }
        item.className = '';
    })
}
autoTimer = setInterval(automove, interval)//加载页面自动轮播

//5.鼠标进入停止轮播，离开开始
container.onmouseenter = function () {
    clearInterval(autoTimer)
}
container.onmouseleave = function () {
    autoTimer = setInterval(automove, interval)

};
//6.点击实现焦点切换
[].forEach.call(paginationList, (item, index) => {
    item.onclick = function () {
        //点击的索引和图片step刚好一样，就不处理.还有就是我点击的是第一张，真好展示的是克隆的那一张也不处理
        if (index === step || (index === 0 && step === (len - 1))) {
            return;
        }
        //点击项的索引是谁，就让warpper切换到那一张
        step = index;
        wrapper.style.transitionDuration = "0.3s"
        wrapper.style.left = -step * 800 + "px";
        //焦点对齐
    	paginationFocus()
    }
})
//7.点击左右按钮实现切换
//右边按钮：和实现自动轮播一直
//左边按钮
changeRight.onclick = automove; //不能加小括号执行，加了是里面的结果给了automove，我们要的是automove执行

changeLeft.onclick = function () {
    if (step === 0) {
        step = len - 1;
        wrapper.style.transitionDuration = "0s"
        wrapper.style.left = -step * 800 + "px"
        wrapper.offsetWidth;//先渲染完一批，再减减执行下面的

    }
    step--;
    wrapper.style.transitionDuration = "0.3s"
    wrapper.style.left = -step * 800 + "px"
    paginationFocus();
}





