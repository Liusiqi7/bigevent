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
            console.log(res);
            
            layer.msg(res.message);
            if (res.status===0) { 
            //    获取成功以后渲染到页面中,这时候就用到了模板引擎
                var str = template('tpl-list', res)
                $('tbody').html(str);
                showPage(res.total);
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

// 分页功能,去layui分页,用的时候先加载模块
var laypage = layui.laypage;
function showPage(t) { 
    //执行一个laypage实例
  laypage.render({
    elem: 'page', //注意，这里的 test1 是 ID,就是前面html页面中的那个id,此刻为page不用加 # 号
    count: t ,//数据总数，从服务端得到,想用上面打印里面的res的total值,那也不能直接用,通过函数传参来用
    // 上面的res中data.total:5,也就是里面有5条数据
    // 写到这一步打印出来就一页,是因为参数选项limit每页显示的条数默认值为10,更改一下
    limit: data.pagesize,
    // 因为5条数据显示出来3页
    //   curr为当前显示的页数
    curr: data.pagenum,
    //   分页的回调
    jump: function(obj, first){
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        console.log(obj.limit); //得到每页显示的条数
        
        //首次不执行
        if(!first){
          //do something
        }
      }
  });
}
  