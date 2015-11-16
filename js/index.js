/**
 * Created by zxy on 2015/11/14.
 */
;(function($){
    //placeholder兼容
    function placeh(selector,message){
        var _$ele = $(selector);
        if(message&&typeof message === 'string'){
            _$ele.data('placeh',message);
        }
        var _mes = _$ele.data('placeh');
        _$ele.on('focus',function(){
            if(this.value === _mes){
                this.value = '';
            }
        });
        _$ele.on('blur',function(){
            if(this.value === ''){
                this.value = _mes;
            }
        })
    }
    try{
        //index
        placeh('#user','用户名');
        $('#log_form').on('submit',function(){
            var _user = $('#user').val(),
                _pass = $('#password').val(),
                _err = $('.log_err');
            if(_user === ''||_user === $('#user').data('placeh')){
//                alert('请输入用户名');
                _err.html('请输入用户名');
                return false;
            }
            if(_pass === ''){
//                alert('请输入密码');
                _err.html('请输入密码');
                return false;
            }
        });
        //norm
        placeh('#norm_name','被提名人姓名');
        placeh('#norm_part','被提名人所在单位');
        placeh('#norm_rea','请输入提名推荐理由');
        placeh('#name','提名人姓名');
        placeh('#part','提名人所在单位（班级或学院）');
        $('#norm_form').on('submit',function(){
            var _inputs = [$('#norm_name'),$('#norm_part'),$('#name'),$('#part')];
            var _bool = true;
            $.each(_inputs,function(i,value){
                var _val = value.val(),
                    _placeh = value.data('placeh');
                if(_val === ''||_val === _placeh){
                    alert('请输入'+_placeh);
                    _bool = false;
                    return false;
                }
            });
            if(!_bool){
                return false;
            }
            var _rea = $('#norm_rea').val();
            if(_rea === ''||_rea === $('#norm_rea').data('placeh')){
                alert('请输入提名推荐理由');
                return false;
            }
        })


    }catch(e){
        console.log(e.message);
    }

}(jQuery));