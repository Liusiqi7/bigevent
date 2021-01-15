// ----------切换两个盒子
$('.login a').on('click', function () {
    $('.login').hide().next().show();
});
$('.register a').on('click', function () {
    $('.login').show().next().hide();
});
// 表单提交--阻止默认行为--收集表单数据(查询字符串形式)--提交数据
$('register form').on('submit', function (e) { 
    e.preventDefault();
    var data = $(this).serialize(); 
    $.ajax({
        url: '/api/reguser',
        type: 'POST',
        data: data,
        success: function (res) { 
            if (res.status === 0) { 
                 
            }
        }

    })
})