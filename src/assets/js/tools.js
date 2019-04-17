/**
 * 时间戳转换
 * @param {*} value 
 */
const formatDate = value => {
    let date;
    if(value.toString().length < 13){
        date = new Date(value * 1000);
    }else{
        date = new Date(value);
    }
    let y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
    if(m < 10) { m = '0' + m }
    if(d < 10) { d = '0' + d }
    if(h < 10) { h = '0' + h }
    if(i < 10) { i = '0' + i }
    if(s < 10) { s = '0' + s }
    // 获取时间格式 2018-12-01 10:20:30
    return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
}

const test = {
    localhost: 'http://localhost/phpmyadmin/',
    url: 'http://www.zhujianbo.cn',
}


export{
    formatDate,
    test
}