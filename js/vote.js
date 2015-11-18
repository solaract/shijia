/**
 * Created by zxy on 2015/11/16.
 */
;(function($){

    $(document).ready(function(){
        //定位分页
        var _hash = document.location.hash;
        if(!_hash){
            return;
        }
        var _$nav = $("[href*="+_hash+"]").children();
//        console.log(_hash);
        _$nav.addClass('vote_nav_li_sel');
        switch_page(_$nav);

        //禁用已投票表单
        $('.vote_form').each(function(){
            var _$form = $(this);
            if(_$form.data('voted')){
                _$form.find('.vote_v').addClass('vote_ved').html('&#xe660;');
                _$form.find('.vote_sub').addClass('vote_subed').val('已投票');
            }
        })
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
    //投票部分
    var $vote = $('.vote_v');
    $vote.on('mouseenter',function(){
        if($(this).next().prop('checked')||$(this).parents('form').data('voted')){
            return false;
        }
        $(this).css({
            width:'30px',
            height:'30px',
            right:'0'
        });
    });
    $vote.on('mouseleave',function(){
        if($(this).next().prop('checked')||$(this).parents('form').data('voted')){
            return false;
        }
        $(this).css({
            width:'20px',
            height:'20px',
            right:'5px'
        });
    });
    $vote.on('click',function(){
        var _$vote = $(this),
            _$check = _$vote.next();
        if(_$vote.parents('form').data('voted')){
            return false;
        }
        if(_$check.prop('checked')){
            _$vote.css({
                borderWidth:'2px',
                right:'0px'
            }).html('');
            _$check.prop('checked',false);
        }
        else{
            _$vote.css({
                borderWidth:'0px',
                width:'30px',
                height:'30px',
                right:'2px'
            }).html('&#xe660;');
            _$check.prop('checked',true);
        }
    });
    $('.vote_form').on('submit',function(){
        var _$form = $(this),
            _checked = [],
            _obj = {},
            _type;
        if(_$form.data('voted')){
            return false;
        }
        _$form.find('.vote_v_in').each(function(){
            var _$in = $(this);
            if(_$in.prop('checked')){
                _checked.push(_$in.val());
            }
        });
        var _len = _checked.length;
        if(_len === 0){
            alert('请先选择候选人再投票');
            return false;
        }
        if(_len>6&&_len<11){
            _type = _$form.find('.vote_v_in').prop('name');
            _obj.type = _type;
            _obj.checked = _checked;
            _obj = JSON.stringify(_obj);
//            alert(1);
//            $.ajax()

//            _checked = JSON.stringify(_checked);
            console.log(typeof _obj,_obj,JSON.parse(_obj));
        }else{
            alert('每次只能投给7-10位候选人哦');
            return false;
        }
//        console.log(this);
        return false;
    });



}(jQuery));