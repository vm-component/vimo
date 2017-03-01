import {setElementClass} from '../../util/dom';

export function startAni(){
   let top  = document.querySelector("#top");
   setElementClass(top,"topAnimation",true);
  let bottom  = document.querySelector("#bottom");
  setElementClass(bottom,"bottomAnimation",true);
   let left  = document.querySelector("#left");
  setElementClass(left,"leftAnimation",true);
   let right  = document.querySelector("#right");
  setElementClass(right,"rightAnimation",true);
}

export function stopAni(){
   let top  = document.querySelector("#top");
  setElementClass(top,"topAnimation",false);
   let bottom  = document.querySelector("#bottom");
  setElementClass(bottom,"bottomAnimation",false);
   let left  = document.querySelector("#left");
  setElementClass(left,"leftAnimation",false);
   let right  = document.querySelector("#right");
  setElementClass(right,"rightAnimation",false);
}