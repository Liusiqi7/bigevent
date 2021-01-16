// 只要修改就必须数据回填---------------------------
// 加载layui的form模块
var form = layui.form;
function renderUser() { 
    $.ajax({
        url: '/my/user/userinfo',
        success: function (res) {
            if (res.status === 0) { 
                console.log(res);
                // 发送请求成功完成数据回填
                // 以前的方式:
                // $('input[name=username]').val(res.data.usernaem);
                // $('input[name=nickname]').val(res.data.nickname);
                // $('input[name=email]').val(res.data.email);
                // $('input[name=id]').val(res.data.id);
                // form.val('表单的lay-fiflter属性值','对象形式的数据(对象的key要和表单各项的name属性值相同)')
                form.val('user',res.data)
            }
         }
    })
}
renderUser();
// 修改--------------------
$('form').on('submit', function (e) { 
    e.preventDefault();
    // 不能拿到禁用状态的值,账号是不能修改的,别切接口文档中就3个必要的参数
    var data = $(this).serializeArray();
    console.log(data);
    $.ajax({
        url: '/my/user/userinfo',
        type: 'POST',
        data:data,
        success: function (res) {
            layer.msg(res.message)
            if (res.status === 0) { 
            //   修改完成以后首页欢迎您后面的span要更改,但是欢迎您在首页面上,不在同一个页面上,但是想调用首页面上封装好的函数,前提是在父子关系下,还有一个前提就是必须在live sever打开才可以,不用live sever打开会报错的,记住,有两个前提条件
                // 调用函数,更新昵称
                window.parent.getuserInfo();
                
            }
         }
    })
})
// 重置(简而言之就是数据在回填一下)----------------------------------------------
$('button[type=reset]').on('click', function (e) { 
    e.preventDefault();
    renderUser();
})