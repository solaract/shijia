!function(t){function a(a,e){var n=t(a);e&&"string"==typeof e&&n.data("placeh",e);var i=n.data("placeh");n.on("focus",function(){this.value===i&&(this.value="")}),n.on("blur",function(){""===this.value&&(this.value=i)})}function e(t,a){for(var n=!0,i=t.length,o=0;i>o;o++)0===t[o].css("width")&&(n=!1);n?a():setTimeout(function(){e(t,a)},100)}var n=t(".nav_bar"),i=t(".nav_list");i.on("mouseover",function(a){var e=a.target;if("a"===e.nodeName.toLowerCase()){var i=t(e).data("left")+"px",o=t(e).css("width");n.animate({left:i,width:o},"normal")}return!1}),i.on("mouseleave",function(a){var e=a.target;if("a"===e.nodeName.toLowerCase()){var i=t("[data-main]"),o=i.data("left")+"px",r=i.css("width");n.animate({left:o,width:r},"normal")}}),a("#user","用户名");var o=t(".title_mor"),r=t(".title_yth");e([o,r],function(){o.animate({top:"12px"},1500),r.animate({top:"107px"},1500),t(".title_3").animate({opacity:1},1500)})}(jQuery);