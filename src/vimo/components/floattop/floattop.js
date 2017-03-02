import {setElementClass}  from '../../util/dom';
export function startFloat(el){
  setElementClass(el,"float",true);
  setTimeout(function(){
    setElementClass(el,"float",false);
  },1500);
}
