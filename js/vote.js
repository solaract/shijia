/**
 * Created by zxy on 2015/11/16.
 */
;(function($){

    $(document).ready(function(){
        //禁用已投票表单
        $('.vote_form').each(function(){
            var _$form = $(this);
            var voted = _$form.data('voted');
            if(voted){
                _$form.find('.vote_v').each(function(){
                    var _$check = $(this).next(),
                        _len = voted.length;
                    for(var i = 0;i<_len;i++){
                        if(_$check.val() == voted[i]){
//                            console.log(1);
                            $(this).addClass('vote_ved').html('&#xe660;').css({
                                fontSize:'30px',
                                lineHeight:'38px'
                            });
                            break;
                        }
                    }

                });
                _$form.find('.vote_sub').addClass('vote_subed').val('已投票');
            }
        });
        //定位分页
        var _hash = document.location.hash;
        if(!_hash){
            return;
        }
        var _$nav = $("[href*="+_hash+"]").children();
//        console.log(_hash);
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
    //投票部分
    //弹框提示
    function message(title,p,sub){
        $('.norm_suc_h').html(title);
        $('.norm_suc_p').html(p);
//        $('.norm_suc_sub').html(sub);
        $('.norm_suc').css({display:'block'});
    }
    $('.norm_suc_sub').click(function(){
        $('.norm_suc').css({
            display:'none'
        })
    });
    //投票动画
    var $vote = $('.vote_v');
//    $vote.on('mouseenter',function(){
//        if($(this).next().prop('checked')||$(this).parents('form').data('voted')){
//            return false;
//        }
//        $(this).css({
////            width:'30px',
////            height:'30px',
//            fontSize:'30px'
////            right:'0'
//        });
//    });
//    $vote.on('mouseleave',function(){
//        if($(this).next().prop('checked')||$(this).parents('form').data('voted')){
//            return false;
//        }
//        $(this).css({
////            width:'20px',
////            height:'20px',
//            fontSize:'20px'
////            right:'5px'
//        });
//    });
    $vote.on('click',function(){
        var _$vote = $(this),
            _$check = _$vote.next();
        if(_$vote.parents('form').data('voted')){
            return false;
        }
        if(_$check.prop('checked')){
            _$vote.css({
//                borderWidth:'2px',
//                right:'0px'
//                lineHeight:'34px',
                color:'#c3a1a7',
                fontSize:'24px'
            }).html('&#xe651;');
            _$check.prop('checked',false);
        }
        else{
            _$vote.css({
//                borderWidth:'0px',
//                width:'30px',
//                height:'30px',
//                right:'2px'
//                lineHeight:'38px',
                color:'#ff9125',
                fontSize:'30px'
            }).html('&#xe660;');
            _$check.prop('checked',true);
        }
    });
    //正在投票时禁用submit
    var voting = false;
    $('.vote_form').on('submit',function(){
        if(voting){
            return false;
        }
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
//            alert('请先选择候选人再投票');
            message('出错啦','请先选择候选人再投票');
            return false;
        }
        if(_len>6&&_len<11){
            voting = true;
            _type = _$form.find('.vote_v_in').prop('name');
            if(_type === 'nor'){
                _obj.type = 1;
            }else{
                _obj.type = 2;
            }
            _obj.data = _checked;
            _obj._token = _token;
//            _obj = JSON.stringify(_obj);
            console.log(typeof _obj,_obj);
            var _$sub = _$form.find('.vote_sub'),
                //判断动画是否已结束
                _vote_b = false;
            _$sub.addClass('vote_subed').val('正在奋力帮您投票.');
            function vote_ani(){
                if(!_vote_b){
                    var _$val = _$sub.val();
                    if(_$val.length < 13){
                        _$sub.val(_$val+'.');
                    }else{
                        _$sub.val('正在奋力帮您投票.');
                    }
                    setTimeout(vote_ani,500);
                }
            }
            setTimeout(vote_ani,500);
//            alert(1);
            $.ajax({
                type:"POST",
                url:url,
                data:_obj,
                dataType:"json",
                success:function(data){
                    var _res = data;
                    var _status = _res.status,
                        _info = _res.info;
                    if(_status === 403){
                        _$sub.removeClass('vote_subed').val('投票');
//                        alert(_info);
                        message('出错啦',_info);
                    }else{
                        _$form.data('voted',_checked);
                        _$sub.val('已投票');
                        _$form.find('.vote_v').each(function(){
                            var _$check = $(this).next(),
                                _len = _checked.length;
                            for(var i = 0;i<_len;i++){
                                if(_$check.val() == _checked[i]){
//                            console.log(1);
                                    $(this).addClass('vote_ved').html('&#xe660;').css({
                                        fontSize:'30px',
                                        lineHeight:'38px'
                                    });
                                    break;
                                }
                            }

                        });
//                        alert('投票成功！');
                        message('投票成功！','您已经成功投票');
                    }
                    _vote_b = true;
                    voting = false;
                },
                error:function(){
                    _$sub.removeClass('vote_subed').val('投票');
//                    alert('投票失败');
                    message('出错啦','请检查您的网络再重试');
                    _vote_b = true;
                    voting = false;
                }
            });

//            _checked = JSON.stringify(_checked);
//            console.log(typeof _obj,_obj,JSON.parse(_obj));
        }else{
//            alert('每次只能投给7-10位候选人哦');
            message('出错啦','每次只能投给7-10位候选人哦');
            return false;
        }
//        console.log(this);
        return false;
    });

//data:'nor'1 'yth'2
//
//    status:403 200
//    info:'dasdasd'


}(jQuery));