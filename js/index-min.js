!function(a){function r(r,n){var t=a(r);n&&"string"==typeof n&&t.data("placeh",n);var o=t.data("placeh");t.on("focus",function(){this.value===o&&(this.value="")}),t.on("blur",function(){""===this.value&&(this.value=o)})}try{r("#user","用户名"),a("#log_form").on("submit",function(){var r=a("#user").val(),n=a("#password").val(),t=a(".log_err");return""===r||r===a("#user").data("placeh")?(t.html("请输入用户名"),!1):""===n?(t.html("请输入密码"),!1):void 0}),r("#norm_name","被提名人姓名"),r("#norm_part","被提名人所在单位"),r("#norm_rea","请输入提名推荐理由"),r("#name","提名人姓名"),r("#part","提名人所在单位（班级或学院）"),a("#norm_form").on("submit",function(){var r=[a("#norm_name"),a("#norm_part"),a("#name"),a("#part")],n=!0,t=a(".norm_err");if(a.each(r,function(a,r){var o=r.val(),e=r.data("placeh");return""===o||o===e?(t.html("请输入"+e),n=!1,!1):void 0}),!n)return!1;var o=a("#norm_rea").val();return""===o||o===a("#norm_rea").data("placeh")?(t.html("请输入提名推荐理由"),!1):void 0})}catch(n){console.log(n.message)}}(jQuery);