// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
const successData = function(data){
    return {status:1,object:data}
}
const failureData = function(msg){
    return {status:1,msg:msg}
}
// mock一组数据
const produceNewsData = function() {
    let articles = [];
    let size = Random.integer(1, 8);
    console.info('随机数',size)
    for (let i = 0; i < size; i++) {
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
//html data
const htmlData = function(){
    let html = [];
    let size = Random.integer(5, 20);
    for(let i = 0;i<size;i++){
        html.push('<div style=\'text-align:center\'><img src=\''+ Random.dataImage('300x250', 'mock的图片'+i)+'\'/><p>'+Random.csentence(5, 15)+'</p></div>');
    }
    return  successData(html.join(''));
}
//
const myaccount = function(){
    let data = {};
    data.cardAmount =  Random.csentence(0, 1000);
}
const growthrecord = function(){
    return successData({
        labels: [Random.integer(1, 8), Random.integer(1, 8)],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [Random.integer(1, 8), Random.integer(1, 8)]
          }, {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [Random.integer(1, 8), Random.integer(1, 8)]
          }
        ]
      })
}
const stores = function(){
    let data = []
    for(let i = 0;i<6;i++){
        data.push({id:i,name:'门店'+Random.csentence(5, 10)});    
    }
    return successData({
        data
    });
}
Mock.setup({
    timeout: '800-1000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});
/*门店数据 */
Mock.mock('/show/store',stores)
/*begin展示页面*/
Mock.mock(/\/show\/room\/\d/,  htmlData);
Mock.mock(/\/show\/nanny\/\d/,  htmlData);
Mock.mock(/\/show\/expert\/\d/,  htmlData);
Mock.mock(/\/show\/nurser\/\d/,  htmlData);
Mock.mock(/\/show\/package\/\d/,  htmlData);
/*end展示页面 */
Mock.mock('/account/myaccount',myaccount);
Mock.mock('/account/growthrecord',growthrecord);