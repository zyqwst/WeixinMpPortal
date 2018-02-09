// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
    let articles = [];
    for (let i = 0; i < 100; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        articles.push(newArticleObject)
    }
 
    return {
        articles: articles
    }
}
 
const htmlData = function(){
    let html = [];
    for(let i = 0;i<15;i++){
        html.push('<div><img src=\''+ Random.dataImage('300x250', 'mock的图片'+i)+'\'/><p>'+Random.csentence(5, 15)+'</p></div>');
    }
    return html.join();
}
Mock.setup({
    timeout: '2000-5000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});
Mock.mock('/html',  htmlData);