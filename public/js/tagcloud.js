function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

// 防抖函数
function debounce(fn, delay){
    var timer = null;
    return function(){
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function(){
        fn.apply(context, args);
      }, delay);
    };
  };

addLoadEvent(function() {

    try {
        TagCanvas.textFont = 'Helvetica';
        TagCanvas.textColour = '#409EFF';
        TagCanvas.textHeight = 28;
        TagCanvas.outlineColour = '#c9c9c9';
        TagCanvas.maxSpeed = 0.05;
        TagCanvas.minSpeed = 0.01;
        TagCanvas.freezeActive = true;
        TagCanvas.outlineMethod = 'block';
        TagCanvas.minBrightness = 0.2;
        TagCanvas.depth = 0.98;
        TagCanvas.pulsateTo = 0.6;
        TagCanvas.initial = [0.1,-0.1];
        TagCanvas.decel = 0.5;
        TagCanvas.reverse = true;
        TagCanvas.hideTags = false;
        TagCanvas.shadow = '#fff';
        TagCanvas.stretchX = 1.2;
        TagCanvas.stretchY = 1.5;
        TagCanvas.shadowBlur = 3;
        TagCanvas.weight = false;
        TagCanvas.imageScale = null;
        TagCanvas.fadeIn = 1000;
        TagCanvas.clickToFront = 600;
        TagCanvas.lock = false;
        TagCanvas.Start('resCanvas');
        TagCanvas.tc['resCanvas'].Wheel(true)

        // 渲染
        render()

        function render() {
      // 优化代码 1 start
            var $box = $('#resCanvas');
            var dpr = 1.2
            $box.get(0).width = $box.width() * dpr;
            $box.get(0).height = $box.width() * dpr;
            // 优化代码 1 end
            TagCanvas.Start('resCanvas');
            TagCanvas.tc['resCanvas'].Wheel(true)
        }


    } catch(e) {
        //console.log(e);
        document.getElementById('myCanvasContainer').style.display = 'none';
    }
});