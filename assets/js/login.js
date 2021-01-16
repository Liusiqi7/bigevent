// ----------切换两个盒子
$('.login a').on('click', function () {
    $('.login').hide().next().show();
});
$('.register a').on('click', function () {
    $('.login').show().next().hide();
});
// 表单提交--阻止默认行为--收集表单数据(查询字符串形式)--提交数据
$('.register form').on('submit', function (e) { 
    e.preventDefault();
    var data = $(this).serialize(); 
    // console.log(data);
    $.ajax({
        url: '/api/reguser',
        type: 'POST',
        data: data,
        success: function (res) { 
            layer.msg(res.message);
            if (res.status === 0) { 
                // JQ对象转为DOM对象,重置表单达到清空输入框的效果
                $('.register form')[0].reset();
                // $('.login').show().next().hide();
            }
        }

    })
})
// 注册的表单验证直接使用lay-verify="验证规则|验证规则|验证规则"
// 使用layui的内置模块-form模块 必须加载模块
// 自定义验证规则以对象的形式,键值对键:验证规则,值(验证方法)
var form = layui.form;
form.verify({
    // \s空格 \S非空格
    // 验证用户名2-10位,数组或字母 , 正则表达式,用户名使用
    user: [/^[a-zA-Z0-9]{2,10}$/, '用户名只能是数组或字母,长度为2-10位'],

    // 验证密码6-12位,切不能出现空格
    len: [/^\S{6,12}$/, '密码长度为6-12位,且不能有空格'],
    // 验证两次密码一致不一致,也可以函数
    same: function (val) { 
        // val是一个形参,也可以是别的,表示使用该验证规则的输入框的值(谁使用这个验证规则就是谁的值)
        // 判断一下,因为是确认密码使用验证规则,所以是确认密码是否=输入的密码相等
        if (val !== $('.pwd').val()) { 
            return ('两次输入的密码不一样');
        }
    }
})
// -------------------------登录功能
// 表单提交---阻止默认行为--收集表单数据---提交
$('.login form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serializeArray();
    $.ajax({
        url: '/api/login',
        type: 'POST',
        data: data,
        success: function (res) { 
            console.log(res);
            layer.msg(res.message);
            if (res.status === 0) { 
                //登录成功,保存token,然后跳转到index页面
                localStorage.setItem('token', res.token);
                location.href = './index.html';
                
            }
        }
    })
 })