


  window.addEventListener('error', function (err) {
    printToDiv("errorList",'EXCEPTION:', err.message + '\n  ' + err.filename, err.lineno + ':' + err.colno);
  });




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



function install(Vue){
  Vue.prototype.$console = _console;
}

module.exports = install;