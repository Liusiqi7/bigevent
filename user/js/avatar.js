// 1.初始化剪裁插件
// 先找到图片--写好配置项(剪裁框的宽高比-指定预览区域(就是那两个小框框))--调用cropper方法,初始化
var $image = $('#image');
var option = {
    aspectRatio: 1,
    preview: '.img-preview'
};
$image.cropper(option);

//2. 点击文件域可以选图片,现在想点击上传按钮也可以选图片
$('#chooseFile').on('click', function () {
    $('#file').trigger('click');
})
//  3.文件域内容改变了,能够更换剪裁区域的图片
$('#file').on('change', function () {
    // console.log(123);
    // 经过打印输出,点击取消也能触发改变事件
    // multiple控制文件是否可以多选,但此时在这是不需要多选的,为了就是console.dir(this)的时候容易看出文件对象
    if (this.files.length > 0) {
        // 找到文件对象,比如说选取了多张,选择它的第一张,有一个属性length,万一没有选呢,所以需要判断一下
        var fileObj = this.files[0];
        // 为文件对象创建临时路径url
        var url = URL.createObjectURL(fileObj);
        // 通过url可以找到选择的图片
        // console.log(url);
        // 更换剪裁区的图片,(剪裁框生成就不能改图片了,所以先销毁剪裁框),更换以后在创建新的剪裁框
        $image.cropper('destroy').attr('src', url).cropper(option);
    }
 


});
// 4.点击确定按钮实现更换头像
$('#sure').on('click', function () { 
    // 点击确定,剪裁图片得到一个canvas
    var canvas = $image.cropper('getCroppedCanvas', { width: 30, heigt: 30 });
    // 把canvas转成base64格式字符串
     var base64=canvas.toDataURL();
    $.ajax({
        type: 'POST',
        url: '/my/user/avatar',
        // 必须的参数
        // 字面量对象的形式,不能直接写base64
        data: {avatar:base64},
        success: function (res) { 
            layer.msg(res.message);
            if (res.status === 0) { 
                // 更换头像成功要做的事情
                window.parent.getuserInfo();
            }
        }
    })
})

