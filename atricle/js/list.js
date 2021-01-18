// 获取文章的请求参数
var data = {
    // 表示页码值,即获取n页的数据
    pagenum: 1,
    // 表示每页显示几条数据
    pagesize:2,
}
// 获取文章,并渲染到列表中
function renderArticle() { 
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            // console.log(res);
            layer.msg(res.message);
            if (res.status===0) { 
            //    获取成功以后渲染到页面中,这时候就用到了模板引擎
                var str = template('tpl-list', res)
                $('tbody').html(str);
            }

        }
    })
}
renderArticle();
// 使用模板处理器函数处理时间
template.defaults.imports.f = function (time) {
    // console.log(time);
    // time为原本要输出的时间
    // return为返回的加工好的时间
    var date = new Date(time);
    var y = addZero(date.getFullYear());
    var m = addZero(date.getMonth()+1);
    var d = addZero(date.getDate());
    return  y+'-'+m+'-'+d;
}
// 补零函数
function addZero(n) { 
    return n < 10 ? '0' + n : n;
}
