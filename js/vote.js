/**
 * Created by zxy on 2015/11/16.
 */
;(function($){

    $(document).ready(function(){
        var _hash = document.location.hash;
        if(!_hash){
            return;
        }
        var _$nav = $("[href*="+_hash+"]").children();
        console.log(_hash);
        _$nav.addClass('vote_nav_li_sel');
        switch_page(_$nav);
    });

    //vote切换分页
    function switch_page($ele){
//        $ele.on('click',function(){
            var _$seled = $('.vote_nav_li_sel');
            var _$select = $ele;
            var _hash = _$select.parent().attr('href');
            if(_$seled === _$select){
                return;
            }
            _$seled.removeClass('vote_nav_li_sel');
            _$select.addClass('vote_nav_li_sel');
            $('.vote_container').addClass('vote_container_hide');
            $(_hash).removeClass('vote_container_hide');
//        })
    }
    $('.vote_nav_li').on('click',function(){
        switch_page($(this));
    });
//    switch_page($('.vote_nav_li'));




}(jQuery));