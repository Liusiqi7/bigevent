// 登录成功跳转到首页要完成两件事
// 1.获取用户的信息, 渲染到头像区域,修改昵称,修改头像还要用到,所以还是封装成一个函数
// url:/my/user/userinfo,get
$.ajax({
    url: '/my/user/userinfo',
    success: function (res) {
        // console.log(res);
        if (res.status === 0) { 
            // 渲染
            // 设置欢迎语后面的名字,优先使用昵称也就是nickname,如果没有就使用username
            // 如果||前面为true就使用nickname,为false就使用后main的username
            var name = res.data.nickname || res.data.username;
            $('.username').text(name);
            // 设置头像,如果有图片,优先使用图片,如果没有图片就使用名字的第一个字并且转换为大写
            // 用if判断一下
            if (res.data.user_pic) {
                // 说明有图片
                $('.layui-nav-img').attr('src',res.data.user_pic).show();
                $('.text-avatar').hide();
            } else { 
                // 说明没有图片
                var first = name.substr(0, 1).toUpperCase();
                // 因为show方法的作用恢复元素默认的样式(span默认是行内元素,show会恢复display-inline,div默认是块级元素,会把div设置为displayblock)
                $('.text-avatar').text(first).css('display', 'inline-block');
            }


        }
     }
})
// 2.退出
$('#logout').on('click', function (e) { 
    // 阻止跳转
    e.preventDefault();
    layer.confirm('您确定要退出吗?', function(index){
        //do something
        // 因为发送请求的接口地址是以my开头的,所以要加请求头token身份,现在要退出不仅仅只是一个跳转页面,还要把token身份移除掉,彻底的退出index页面,进不去
        localStorage.removeItem('token');
        location.href = './login.html';
        layer.close(index);
      }); 
})