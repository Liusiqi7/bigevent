

// 统一配置url,headers,complete
var baseurl = ' http://www.itcbc.com:8080';
$.ajaxPrefilter(function (option) { 
    option.url = baseurl + option.url;
    option.headers = {
        Authorization:localStorage.getItem('token')
    }
    option.complete = function(xhr){
        var res = xhr.responseJSON;
        if (res && res.status === 1 && res.message === '身份认证失败！') { 
            localStorage.removeItem('token')
            location.href = './login.html';
        }
        // 如果有其他错误
        if (res && res.status === 1) { 
            layer.msg(res.message);
        }
    }
})