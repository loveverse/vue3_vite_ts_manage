const fs = require('fs');
const mysql = require('mysql');

// 连接数据库配置
const connection = mysql.createConnection({
  host: "1.12.252.87",
  user: 'verse',
  password: '123456',
  database: 'verse'
})
connection.connect()



const pathName = './imgs'
const baseUrl = 'http://pic.loveverse.top/imgs/'
fs.readdir(pathName, function (err, files) {
  let values = files.reduce((acc, cur) => {
    acc.push([baseUrl + cur, 1])
    return acc
  }, [])
  con(values)
})


function con(values) {
  const addSql = 'insert into picture(url,putaway) values ?'
  connection.query(addSql, [values], (err, rows) => {
    if (err) {
      console.log("报错：", err);
    } else {
      console.log("插入数据成功！");
    }
  })
  connection.end()
}

