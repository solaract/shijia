;(function($){
    //导航滑条动画
    var $bar = $('.nav_bar'),
        $nav = $('.nav_list');
    $nav.on("mouseover",function(e){
        var _target = e.target;
        if(_target.nodeName.toLowerCase() === 'a'){
            var _left = $(_target).data('left')+'px',
                _width = $(_target).css('width');
            $bar.animate({
                left:_left,
                width:_width
            },'normal');
        }
        return false;
    });
    $nav.on("mouseleave",function(e){
        var _target = e.target;
        if(_target.nodeName.toLowerCase() === 'a'){
            var _$main = $('[data-main]'),
                _left = _$main.data('left')+'px',
                _width = _$main.css('width');
            $bar.animate({
                left:_left,
                width:_width
            },'normal');
        }
    });

    //检查图片是否加载完成
    function check_img(img_ar,cb){
        var _bool = true,
            _len = img_ar.length;
        for(var i = 0;i<_len;i++){
            if(img_ar[i].css('width') === 0){
                _bool = false
            }
        }
        if(_bool){
            cb();
        }
        else{
            setTimeout(function(){
                check_img(img_ar,cb);
            },100);
        }
    }

    var $mor = $('.title_mor'),
        $yth = $('.title_yth');
    check_img([$mor,$yth],function(){
        $mor.animate({
            top:'12px',
        },1500);
        $yth.animate({
            top:'107px',
        },1500);
        $('.title_3').animate({
            opacity:1
        },1500)
    })
}(jQuery));