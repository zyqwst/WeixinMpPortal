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

let gen = function(){
    let size=Random.integer(1,7);
    let data=[];
    let x=[]
    for(let i = 1 ;i<=size;i++){
        x.push(Random.date('M-dd'))
        data.push(Random.integer(2000,4500))
    }
    return {'x':x,'data':data}
}
const growthrecord = function(label){

    let collection = []
    for(let i =0;i<Random.integer(1,8);i++){
        let gen = function(){
            let size=Random.integer(1,7);
            let data=[];
            let x=[]
            for(let i = 1 ;i<=size;i++){
                x.push(Random.date('M-dd'))
                data.push(Random.integer(2000,4500))
            }
            return {'x':x,'data':data}
        }
        collection.push({
            labels: gen().x,
            options:{
                legend: {
                    display: false,
                  }
            },
            datasets: [
              {
                label: label,
                showLabel:false,
                backgroundColor: '#d42930',
                fill:false,
                borderColor:'#d42930',
                borderWidth: 2,
                data: gen().data
              }
            ]
          })
    }
    return successData(collection)
}
const stores = function(){
    let storeD = [];
    for(let i = 0;i<6;i++){
        storeD.push({id:i,name:'门店'+Random.csentence(5, 10)});    
    }
    return successData(storeD)
  
}
const wallet = function(){
    let wallet = {
        card:{label:'卡余额',amount:68},
        coupons:{label:'卡券',amount:4},
        score:{label:'积分',amount:980},
        growthrecord:{show:true},//成长记录
        meal:{show:true}, //陪客餐
        question:{show:true}, //调查问卷
        evaluate:{show:true} //出所评价
    }
    return successData(wallet)
}

const barcode = function(){
    return successData({qrcode:Random.csentence(10,40),timestamp:1234});
}
const eshop = function(){
    let obj={menus:[],foods:[]}
    for(let i =0;i<Random.integer(1,8);i++){
        let menu = {id:i,name:Random.csentence(2,4).replace('。','')}
        let foods = []
        for(let j = 0;j<Random.integer(5,20);j++){
            foods.push({id:j,menuid:i,name:Random.csentence(8,20).replace('。',''),icon:Random.dataImage('57x57', i+"-"+j),description:'xxx',sellCount:30,price:69})
        }
        obj.menus.push(menu)
        obj.foods.push({'food':foods})
    }
    return successData(obj)
}
Mock.setup({
    timeout: '800-1000' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});
// /*门店数据 */
// Mock.mock('/show/store',stores)
// /*begin展示页面*/
// Mock.mock(/\/show\/room\/\d/,  htmlData);
// Mock.mock(/\/show\/nanny\/\d/,  htmlData);
// Mock.mock(/\/show\/expert\/\d/,  htmlData);
// Mock.mock(/\/show\/nurse\/\d/,  htmlData);
// Mock.mock(/\/show\/package\/\d/,  htmlData);
// /*end展示页面 */
// Mock.mock(/\/member\/baby\/height/,growthrecord('身高'))
// Mock.mock(/\/member\/baby\/weight/,growthrecord('体重'))
// /**个人账户首页 */
// Mock.mock('/member/wallet',wallet)
// /**电子会员卡（二维码数据） */
// Mock.mock('/member/qrcode',barcode);
Mock.mock('/eshop/cards',eshop)