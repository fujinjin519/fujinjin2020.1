let container = document.querySelector(".container")
wrapper = document.querySelector(".wrapper")
sliderList = document.querySelectorAll(".slider")
pagination = document.querySelector(".pagination")
paginationList = document.querySelectorAll("li")
changeLeft = document.querySelector(".changeLeft")
changeRight = document.querySelector(".changeRight")

let step = 0;
interval = 1000;
let len = sliderList.length;
autoTimer = null

function automove() {
    if (step === (len - 1)) {
        step = 0;
        wrapper.style.transitionDuration = "0s"
        wrapper.style.left = "0px"
        wrapper.offsetWidth;
    }
    step++;
    wrapper.style.transitionDuration = "0.3s"
    wrapper.style.left = -step * 800 + "px"
    paginationFocus()

}


function paginationFocus() {
    let tempStep = step;
    tempStep = (len - 1) ? tempStep = 0 : null;
    [].forEach.call(paginationList, (index, item) => {
        if (index === tempStep) {
            item.className = "active"
            return
        }
        item.className = ""
    })
}
autoTimer = setInterval(automove, interval)

container.onmouseenter = function () {
    clearInterval(autoTimer)
}
container.onmouseleave = function () {
    autoTimer = setInterval(automove, interval)
};

[].forEach.call(paginationList, (item, index) => {
    item.onclick = function () {
        if (index === step || (index === 0 && step === (len - 1))) {
            return
        }
        step = index;
        wrapper.style.transitionDuration = "0.3s"
        wrapper.style.left = -step * 800 + "px"
        paginationFocus()
   }

})
changeRight.onclick=automove;
changeLeft.onclick=function(){
    if(step==0){
        step=len-1;
        wrapper.style.transitionDuration="0s";
        wrapper.style.left=-step*800+"px"
        wrapper.offsetWidth;
    }
    step--;
    wrapper.style.transitionDuration="0.3s";
    wrapper.style.left=-step*800+"px"
    paginationFocus();

}


