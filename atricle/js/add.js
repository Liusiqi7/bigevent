// 调用函数,会把add.html中的textarea替换成富文本编辑器
initEditor();
// 因为涉及到剪裁框,所以还是之前的步骤先初始化剪裁框--配置剪裁区域的配置项--初始化剪裁区域
var $image = $('#image');
var option = {
    aspectRatio: 400 / 200,
    preview:'.img-preview'
}
$image.cropper(option);