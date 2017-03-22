import {setElementClass} from '../../util/dom';

export function startAni(el){
  setElementClass(el,"run",true);
  setTimeout(function(){
    setElementClass(el,"run",false);
  },1000);
}

export function stopAni(){
   
}