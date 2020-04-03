let shio=(function(){
    let chooseBox=document.querySelector('#choose'),
         typeBox=document.querySelector("#type"),
         links=null; //先把它设为null
  //构建数据模型 2个数据模型  一个被选择的区域的  一个是下面的列表的
    let chooseData=[
        {
            typeId:1,
            name:"华为"
        }
         
    ]

    let typeData = [
        {
		id: 1,
		name: '品牌',
		content: ['苹果', '华为', '小米', '锤子', '魅族', '三星', 'OPPO']
      },
       {
		id: 2,
		name: '尺寸',
		content: ["3.0英寸以下", "3.0-3.9英寸", "4.0-4.5英寸", "4.6-4.9英寸", "5.0-5.5英寸", "6.0英寸以上"]
    }, 
      {
		id: 3,
		name: '系统',
		content: ["安卓 ( Android )", "苹果 ( IOS )", "微软 ( WindowsPhone )", "其他"]
    }, 
      {
        id: 4,
		name: '网络',
		content: ["联通3G", "双卡单4G", "双卡双4G", "联通4G", "电信4G", "移动4G"]
    }];
    //渲染数据
    let chooseRender=function chooseRender(){
        let str=`你的选择`;
        chooseData.forEach(item=>{
            //被选择的每一项。
            str+=`<mark>
               苹果${item.name}
            <a href="javascript:;">x</a>
        </mark> `
        })
        chooseBox.innerHTML=str

    };

    let typeRender=function typeRender(){
        let str=``;
        typeData.forEach(item=>{
            let{id,name,content}=item
            str+=`<li>`;
            str+=`${name}`;
            content.forEach(cur=>{
                str+=`<a href="javascript:;" data-id=${id}>${cur}</a>`
                //cur获取a里面的内容 //id自定义属性 获取type里面的id
            })
            str+=`</li>`
        })
        typeBox.innerHTML=str;
        links=typeBox.querySelectorAll("a")
        //绑定完成后获取所有的A标签
    } 
    //绑定点击事件方法 点击事件
    let handerLinks=function handerLinks(){
        [].forEach.call(links,item=>{
            item.onclick=function(){
                //给上面新增一项数据
                let obj={
                    typeId:parseInt(this.getAttribute("data-id")),
                    name:this.innerHTML //点击谁给谁增加上去
                 };
                 //校验，每一个类别中只能保留一个
                 chooseData.push(obj);
                 chooseRender()



            }
           
        })
    }


   
    return{
        init(){
            chooseRender()
            typeRender()
            handerLinks()
         }
      }
})()
shop.init()