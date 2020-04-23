let container = document.querySelector('.container'),
    wrapper = document.querySelector('.wrapper'),
    sliderList = document.querySelectorAll('.slide'),
    pagination = document.querySelector('.pagination'),
    paginationList = document.querySelectorAll('li'),
    changeLeft = document.querySelector('.changeLeft'),
    changeRight = document.querySelector('.changeRight');


let step = 0,
    prev = 0,
    interval = 1000,
    autoTimer = null,
    len = sliderList.length;

function change() {
 
    sliderList[step].style.zIndex = '1';
    sliderList[prev].style.zIndex = '0';

    sliderList[step].style.transitionDuration = '0.3s';
    sliderList[step].style.opacity = '1';
    sliderList[prev].style.transitionDuration = '0s';
    sliderList[prev].style.opacity = '0'; 
 
  [].forEach.call(paginationList,(item,index)=>{
    if (index === step) {
        item.className = 'active';
        return;
    }
    item.className='';
  }) ;
   
}

function autoMove() {
    prev = step;
    step++;
    step > (len - 1) ? step = 0 : null;
    change();
}

autoTimer = setInterval(autoMove, interval);

container.onmouseenter = function(){
    clearInterval(autoTimer);
};
container.onmouseleave = function(){
    autoTimer = setInterval(autoMove, interval);
};

[].forEach.call(paginationList,(item,index)=>{
item.onclick = function(){
    if(index === step) return;
    prev = step;
    step = index;
    change();
}
});

changeRight.onclick= autoMove;
changeLeft.onclick= function () {
    prev = step;
    step--;
    step < 0 ? step = len - 1 : null;
    change();
};