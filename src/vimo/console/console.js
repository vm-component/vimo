
var middleDiv;

  window.addEventListener('error', function (err) {
    console.log('addEventListener--error')
    printToDiv("errorList",'EXCEPTION:', err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno);
  });

function createContainer(){

}


var logTo = (function createLogDiv() {  //创建盛放信息的container当中
  var container = document.createElement("fieldset");

  var caption = document.createTextNode('console output \n');
  var legend = document.createElement('legend');
  legend.appendChild(caption);
  container.appendChild(legend);


  return container;
}());



function fnErrorTrap(sMsg,sUrl,sLine){
  debugger;
  oErrorLog.innerHTML="<b>An error was thrown and caught.</b><p>";
  oErrorLog.innerHTML+="Error: " + sMsg + "";
  oErrorLog.innerHTML+="Line: " + sLine + "";
  oErrorLog.innerHTML+="URL: " + sUrl + "";
  return false;
}

function toString(x) {
  if (x instanceof Error) {
    return x.message;
  }
  return typeof x === 'string' ? x : JSON.stringify(x);
}

var log = console.log.bind(console);  //bind是为了绑定上下文  就是为了将两个函数继续绑定下共同的上下文中， 因为这里需要的是console的arguments
var error = console.error.bind(console);
var warn = console.warn.bind(console);
var info = console.info.bind(console);
var debug = console.debug.bind(console);
var table = console.table ? console.table.bind(console) : null;
var id = 'console-log-div';

function createOuter() { //创建一个放置error的东西
  var outer = {
    logList:[],
    errorList:[],
    infoList:[],
    warnList:[],
    debugList:[]
  }
  return outer;
}

  //创建盛放信息的container当中

  var _console = createOuter();


function printToDiv() {
  var msg = Array.prototype.slice.call(arguments,1) //msg就是每次的信息内容
    .map(toString)
    .join(' ');
  _console[arguments[0]].push(msg);
  var text = logTo.textContent;  //容器就是div的text
  logTo.textContent = text + msg + '\n';
  if(middleDiv)  middleDiv.scrollTop = middleDiv.scrollHeight;
 }

function logWithCopy() {  //以后的console就是这个了
   var args = Array.prototype.slice.call(arguments, 0);
   args.unshift('LOG:');
   args.unshift('logList');
  log.apply(null, arguments);  //console.log.bind(console);
  printToDiv.apply(null, args);
}

console.log = logWithCopy;
console.log.toDiv = true;

console.error = function errorWithCopy() {
  error.apply(null, arguments);
  var args = Array.prototype.slice.call(arguments, 0);
   args.unshift('ERROR:');
  args.unshift('errorList');
  printToDiv.apply(null, args);
};

console.warn = function logWarning() {
  warn.apply(null, arguments);
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift('WARNING:');
  args.unshift("warnList");
  printToDiv.apply(null, args);
};

console.info = function infoLoad(){
  info.apply(null,arguments);
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift('INFO:');
  args.unshift("infoList");
  printToDiv.apply(null, args);
}

console.debug = function debuginfo(){
   debug.apply(null,arguments);
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift('DEBUG:');
  args.unshift("debugList");
  printToDiv.apply(null, args);
}


function closeConsole(){
  document.querySelector("#winConsole").style.display = "none";
}


function createDiv(div){ //创建中间层，有和Start标识END
    var text1  = document.createTextNode("START: \n");
    var text2  = document.createTextNode("END: \n");
    div.appendChild(text1);
    div.appendChild(logTo);
    div.appendChild(text2);
    div.id = "consoleScroll";
    div.style.height = "95%";
    div.style.overflowY = "scroll"
    return div;
}




let style={
  fontFamily:'monospace',
  marginTop:'20px',
  marginLeft:'10px',
  marginRight:'10px',
  whiteSpace:'pre-line',
  wordBreak:'break-all',
  border:'1px solid black',
  borderRadius:'5px',
  padding:'5px 10px',
  zIndex:'99999',
  position:'absolute',
  backgroundColor:'#ffe692',
  height:'90%',
  id:'winConsole',
}

function openConsole(){
  if(!document.querySelector("#winConsole")){
    var outer = document.createElement("div");
    var style = outer.style;
    style.fontFamily = 'monospace';
    style.marginTop = '20px';
    style.marginLeft = '10px';
    style.marginRight = '10px';
    style.whiteSpace = 'pre-line';
    style.wordBreak = 'break-all';
    style.border = '1px solid black';
    style.borderRadius = '5px';
    style.padding = '5px 10px';
    style.zIndex="99999";
    style.position = "absolute";
    style.backgroundColor = "#ffe692";

    style.height = "90%"
    outer.id = "winConsole"
    var div = document.createElement("div")
     middleDiv = createDiv(div);

    outer.appendChild(middleDiv);
    var button = document.createElement("button");
    button.style.width = "100px";
    button.style.height="30px";
    button.onclick = closeConsole;
    button.style.position = "relative";
    button.style.bottom = "5px;"
    button.appendChild(document.createTextNode("close"));
    outer.appendChild(button);
    document.body.appendChild(outer);
  }else{
    document.querySelector("#winConsole").style.display = "block";
  }
}

function install(Vue){
  Vue.prototype.$console = _console;
  Vue.prototype.$openconsole = openConsole;
}

module.exports = install;
