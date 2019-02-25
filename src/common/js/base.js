(function (doc, win) {
   
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            //如果页面的宽度超过了640px，那么页面中html的font-size恒为100px，
            //否则页面中html的font-size的大小为：100*(当前页面宽度/640)
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                //此时1rem=100px
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);