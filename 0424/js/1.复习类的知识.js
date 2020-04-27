//基于es6的写的类
class Modal{
    constructor(x,y){//实例设置私有属性
        this.x=x
        this.y=y
    }
    // z=10//也是实例设置私有属性，不是公共的
    getx(){ //给原型上扩展公共的方法
        console.log(this.x);
        
    }
    gety(){
        console.log(this.y);
        
    }
    static n=200 //加static当作对象给自己设置的私有属性
    static serNumber(n){
        this.n=n
    }


}
Modal.prototype.z=10//只能这样写公有的

let m = new Model(10,20);
let n =new Modal(30,40)


//
//1.this.什么的 是每个实例的私有属性
 //2.modal.prototype.getx....实例的公用的属性
 //3.modal.n什么的就是把类当做普通的对象  给其设置的自己的私有的属性 
function Modal(x,y){
    this.x=x;
    this.y=y;
}
Modal.prototype.z=10;
Modal.prototype.getX=function(){
    console.log(this.x);
}
Modal.prototype.getY=function(){
    console.log(this.y);
}
Modal.n=200;
Modal.setNumber=function(n){
    this.n=n;
};
let m = new Model(10,20);
let n =new Modal(30,40)


