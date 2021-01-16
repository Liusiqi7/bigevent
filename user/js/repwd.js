
// 完成重置密码
$('form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        url: '/my/user/updatepwd',
        data: data,
        type: 'POST',
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) { 
                // 如果重置密码成功要完成移除token,并且跳转到登录页面
                localStorage.removeItem('token');
                // location.href = '../login.html';
                // 但是此时的跳转页面没有跳转到首页的打的登录页面,想让父页面跳转
                window.parent.location.href = '../login.html';

            }
         }
    })
})
 // 密码,涉及到了表单验证
//  1.密码长度6-12位,三个密码框都要用到
// 2.新旧密码不能一样,第二个密码框要用到
// 3.确认密码输入必须一致,第三个密码框要用到
// 首先加载form模块
var form = layui.form;
form.verify({
    len: [/^\S{6,12}$/,'密码6-12位并且不能有空格'],
    diff: function (val) { 
        if (val ===$('input[name=oldPwd]').val()) { 
            return '新密码不能和原密码重复';
        }
    },
    same: function (val) {
        if (val !== $('input[name=newPwd]').val()) { 
            return '确认密码必须输入一致';
        }
     }
})