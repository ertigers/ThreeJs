// function getScrollbarWidth() {
//   var odiv = document.createElement("div"), //创建一个div
//     styles = {
//       width: "100px",
//       height: "100px",
//       overflowY: "scroll", //让他有滚动条
//     },
//     i,
//     scrollbarWidth;
//   for (i in styles) odiv.style[i] = styles[i];
//   document.body.appendChild(odiv); //把div添加到body中
//   scrollbarWidth = odiv.offsetWidth - odiv.clientWidth; //相减
//   odiv.remove(); //移除创建的div
//   return scrollbarWidth; //返回滚动条宽度
// }
function myReady(fn) {
  //对于现代浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fn, false);
  } else {
    IEContentLoaded(fn);
  }
  //IE模拟DOMContentLoaded
  function IEContentLoaded(fn) {
    var d = window.document;
    var done = false;

    //只执行一次用户的回调函数init()
    var init = function () {
      if (!done) {
        done = true;
        fn();
      }
    };
    (function () {
      try {
        // DOM树未创建完之前调用doScroll会抛出错误
        d.documentElement.doScroll("left");
      } catch (e) {
        //延迟再试一次~
        setTimeout(arguments.callee, 50);
        return;
      }
      // 没有错误就表示DOM树创建完毕，然后立马执行用户回调
      init();
    })();
    //监听document的加载状态
    d.onreadystatechange = function () {
      // 如果用户是在domReady之后绑定的函数，就立马执行
      if (d.readyState == "complete") {
        d.onreadystatechange = null;
        init();
      }
    };
  }
}
function setRem() {
  var windowHeight = window.screen.height;
  console.log(windowHeight);
  //1、获得设计稿尺寸
  let ulSize = windowHeight;
  //2、获得当前视口的宽度
  let winSize = document.documentElement.clientHeight;
  //3、计算布局视口的缩小比例
  let rate = winSize / ulSize;
  //5、设置html元素font-size的缩小值
  document.documentElement.style.fontSize = 100 * rate + "px";
  // console.log(rate);
}

//setRem()在页面加载结束执行
myReady(function () {
  setRem();
});
// onload =
onresize = setRem;
