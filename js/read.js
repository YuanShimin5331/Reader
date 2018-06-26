(function () {
  var Util = (function () {
    var getJsonp = function (url, callback) {
      return $.jsonp({
        url: url,
        catch: true,
        callback: 'duokan_fiction_chapter',
        success: function (result) {
          var data = $.base64.decode(result);
          var json = decodeURIComponent(escape(data));
          callback(data)

        }
      })
    }
    return {
      getJsonp:getJsonp
    }

  })

  var Dom = {
    top_nav: $('#top-nav'),
    bottom_nav: $(".bottom_nav"),
    font_container: $('.font_container'),
    font_button: $("#font-button")


  }
  var clickNumber = 0;

  var Win = $(window);
  var Doc = $(document);
  var RootContainer = $('.container');
  var intBackground = localStorage.getItem('background');
  console.log(intBackground);

  console.log(intBackground);
  if (!intBackground) {
    RootContainer.css('background', '#e9dfc7')
  }
  RootContainer.css('background', intBackground)



  var initfontSize = localStorage.getItem('key');

  console.log(initfontSize);

  initfontSize = parseInt(initfontSize)
  console.log(initfontSize);

  if (!initfontSize) {
    initfontSize = 14;
  }
  console.log(initfontSize);

  RootContainer.css('font-size', initfontSize)



  function main() {
    // 整个项目的入口函数
    var readerModel= ReaderModel();
    readerModel.init();
    EventHanlder();
   
  }

  function ReaderModel() {
    // 实现和阅读器相关的数据交互的方法
    var Chapter_id;
    var init =function () { 
      getFictionInfo(function(){
        getArticalContent(Chapter_id,function(data){
          // TODO
        })
      })
     }
    var getFictionInfo = function (callback) {
     
      $.get("/data/chapter.json", function (data) {
        // 获得章节信息的回调
        Chapter_id=data.chapter_id[0].chapter_id
        callback && callback(da)
      }, 'json');
    }
    var getArticalContent = function () {
      $.get('/data/data' + chapter_id + '.json', function (data) {
        console.log(data);
        if (data.result == 0) {
          var url = data.jsonp;
          Util.getJsonp(url,function (data) { 
            callback && callback(data)
           });

        }

      }, 'json')


    }
    return {
      init:init
    }
  }

  function ReaderBaseFrame() {
    // 渲染基本的UI结构
  }

  function EventHanlder() {
    // 交互的事件绑定
    // 点击中部，上下nav显示
    $('#action_mid').click(function () {
      console.log(1111);
      if (Dom.top_nav.css('display') == "none") {
        Dom.top_nav.show();
        Dom.bottom_nav.show();
      } else {
        Dom.top_nav.hide();
        Dom.bottom_nav.hide();
        Dom.font_container.hide();
        Dom.font_button.removeClass("current")
      }

    });

    // 内容滚动时 上下nav 隐藏
    Win.scroll(function () {
      Dom.top_nav.hide();
      Dom.bottom_nav.hide()
      Dom.font_container.hide();
      Dom.font_button.removeClass("current")
    });

    // 点击字体，字体面板显示
    Dom.font_button.click(function () {
      if (Dom.font_container.css('display') == "none") {
        Dom.font_container.show();
        Dom.font_button.addClass("current")

      } else {
        Dom.font_container.hide();
        Dom.font_button.removeClass("current")
      }
    });

    // 
    $("#night_btn").click(function () {
      // TODO 触发背景切换事件
    });
    // 字体放大

    $("#large-font").click(function () {
      if (initfontSize > 20) {
        return;
      }
      initfontSize += 1;
      RootContainer.css('font-size', initfontSize);
      // Util.StorageSetter('font-size',initfontSize);
      localStorage.setItem('key', initfontSize);
      console.log(localStorage.getItem('key'));


    })
    // 字体缩小
    $("#small-font").click(function () {
      console.log(111);

      if (initfontSize < 12) {
        return;
      }
      initfontSize -= 1;
      RootContainer.css('font-size', initfontSize);
      localStorage.setItem('key', initfontSize);


    });

    // 背景变红
    $('#red').click(function () {
      RootContainer.css('background', 'red')
      localStorage.setItem('background', 'red');

    })
    $('#black').click(function () {
      RootContainer.css('background', 'black')

      localStorage.setItem('background', 'black');

    });
    $('#white').click(function () {
      RootContainer.css('background', 'white')
      localStorage.setItem('background', 'white');
    });


    $('#night_btn').click(function () {

      if (clickNumber % 2 == 0) {
        RootContainer.css('background', '#e9dfc7')
        localStorage.setItem('background', '#e9dfc7')
      } else {
        RootContainer.css('background', 'black')
        localStorage.setItem('background', 'black');

      }

      clickNumber++;

    })

  }

  main();



})();