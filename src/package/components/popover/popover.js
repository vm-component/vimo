import Vue from 'vue';
import popoverVue from './popover.vue';
import $ from 'jquery'
const popoverContent =  Vue.extend(popoverVue);

const wid = 300;  // 参数
const hei = 500; //参数
var _this;

/**
*
*/
class popover{
  constructor(){
   _this =  this;
   _this.template; //容器
   _this.shrill; //头顶小尖角
   _this.content; //内容
   _this.width; // 容器宽度
   _this.height; //容器高度
   _this.direct; //尖角方向
   _this.transform = "translate(5px) rotate(45deg)"
   _this.fixUnit = "px"; //单位
   _this.sw; //源控件宽
   _this.sh;//源控件高
   _this.sp;//源控件位置
   _this.shrPos; //尖角 top 和 left的对象
   _this.initEl(); //初始化
  }

  initEl(){
    _this.template =  new popoverContent({
      el:document.getElementById('popoverPortal').appendChild(document.createElement('div'))
    });
     _this.shrill = document.getElementById("shrill");
     _this.content = document.getElementById("popContent");
     _this.width = wid;
     _this.height = hei;
     _this.direct = "left";
     _this.shrPos = {}; 
  }

 
  presentInAuto(container,options){
    _this.reset();

    var tcontent;
    var instance;
    var source;
   
    if(!!options.direct)_this.direct=options.direct;
    if(!!options.width){
      _this.width=options.width;
      _this.content.style.width = _this.width+_this.fixUnit;
    }
    if(!!options.height){
      _this.height=options.height;
      _this.content.style.height = _this.height+_this.fixUnit;
    }
    if(!!container.template){
      tcontent = Vue.extend(container.template);
      instance = new tcontent({
        el:document.getElementById("popoverPortal").querySelector(".popContent").appendChild(document.createElement("div"))
      });
    }
     if(!!container.source){
        source = container.source;
        _this.setStyle(source);
     }
     _this.template._present();  //破隐
    // alert(_this.shrPos.left)
  }


  setStyle(source){
    let width = $(source).width();
    _this.sw = width;
    let height = $(source).height();
    _this.sh = height;
    let pos = $(source).offset();
    _this.sp = pos;
   
    _this.setShrillPos();
    _this.setContentStyle();
  }

  setContentStyle(top,left,isDelSelf=false){
    let dom = _this.content;
    dom.style.top = _this.shrPos.top+_this.fixUnit;
    _this.clearStyle(dom);
    if(_this.shrPos.left<=_this.width/2){
       dom.style.left = "0px";
    }else if(_this.shrPos.left>_this.width/2&&_this.shrPos.left<=window.innerWidth-_this.width/2){
       dom.style.left = (_this.shrPos.left-_this.width/2)+_this.fixUnit;
    }else{
      dom.style.right = "0px";
    }
    _this.ContentAdjust();
  }



  ContentAdjust(){  //调整内容
    let dom  = _this.content;
    _this.direct=="left"?dom.style.transform = "translateY(6px)":dom.style.transform="translate(0px,6px)"; //这里是为了调整
  }

  setShrillPos(){
    switch(_this.direct){
      case "left":
        _this.setShrillDirect(_this.sp.top+_this.sh,_this.sp.left); //如果是左边  只要跟着源控件的top left 的位置就行了
        break;
      case "center":
        _this.setShrillDirect(_this.sp.top+_this.sh,_this.sp.left+_this.sw/2);
        break;
      case "right":
        _this.setShrillDirect(_this.sp.top+_this.sh,_this.sp.left+_this.sw);
        break;
      default:
         _this.setShrillDirect(_this.sp.top+_this.sh,_this.sp.left); //如果是左边  只要跟着源控件的top left 的位置就行了
    }
  }

  setShrillDirect(top,left){
    let dom = _this.shrill;
    dom.style.top = top+_this.fixUnit;
    _this.shrPos.top = top;
    dom.style.left = left+_this.fixUnit;
    _this.shrPos.left = left;
    _this.ShrillAdjust();
  }

  ShrillAdjust(){  //调整shrill
    let dom = _this.shrill;
    dom.style.transform = "translate(-10px,5px) rotate(45deg)"
    //_this.shrPos.top += 5;
    //_this.shrPos.left -= 10; 
  }

  clearStyle(dom){
     dom.style.left = "";
     dom.style.right = "";
  }

   reset(){
    _this.width = wid;
    _this.height = hei;
    _this.content.style.width = wid+_this.fixUnit;
    _this.content.style.height = hei+_this.fixUnit;
  }


  /*present(options){
    var obj = {
      top:options.top||0,
      left:options.left||0,
      posInPer:options.posInPer||false,
      shrilldirect:options.sdirect||"left",
      shrillSize:options.size||"big"
    }
   //options. let template = options.template||void 0;
   _this.fixedPos(obj);
    var tcontent;
    var instance;
    if(!!options.template){
      tcontent = Vue.extend(options.template);
      instance = new tcontent({
        el:document.getElementById("popoverPortal").querySelector(".popContent").appendChild(document.createElement("div"))
      });
    }
    _this.template._present();
  }

  fixedPos(obj){
    var suffix = "px"
    if(obj.posInPer) suffix = "%";
    let popContent = document.querySelector("#popContent");
    let shrill = document.querySelector("#shrill");
    let width = $(popContent).width();
    popContent.style.top = obj.top + suffix;
    popContent.style.left = obj.left + suffix;
    shrill.style.top = obj.top + suffix;
    shrill.style.left = obj.left + suffix;
    shrill.style.transform = _this.getSize(obj.shrillSize,obj.shrilldirect);
    debugger;
  }  

  getSize(size,direct){
    var preffix = "translate(";
    var suffix = ") rotate(45deg)"
    if(size=="big"&&direct=="left") preffix += "5px,-3px";
    else if(size=="big"&&direct=="right") preffix += "-25px,-3px";
     else if(size=="small"&&direct=="right") preffix += "-25px,0px";
     else  preffix += "5px,0px";
     return preffix+suffix;
  }*/

}


/**
 * 获取单例
 */
export default function getAnInstance(){
  if(!Vue.prototype._popover){
    Vue.prototype._popover = new popover();
  }
  return Vue.prototype._popover;
}

//export defaultgetAnInstance;
