const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = 3000

// 创建连接池
const pool = mysql.createPool({
  host: '172.17.0.3',
  user: 'root',
  password: '651023',
  database: 'computer_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})
const poolPromise = pool.promise()

operateMysql('readData', 'SELECT * FROM warranty')
operateMysql('insertData', `INSERT INTO warranty (reason, name, images) VALUES ('理由', '名称', '图片路径')`)
operateMysql('updateData', `UPDATE warranty SET reason = '最新理由' limit 1`)
operateMysql('deleteData', 'DELETE FROM warranty limit 1')

app.listen(port, () => {
  console.log(`Server is running on http://1.12.237.206/`)
})

process.on('SIGINT', () => {
  console.log('SIGINT sinnal received: closing HTTP server')
  pool.end(err => {
    if (err) {
      console.error('Error closing connection pool:', err)
    } else {
      console.log('Connection pool closed')
    }
    process.exit()
  })
})

async function operateMysql(apiName, sql) {
  app.get(`/api/${apiName}`, async(req, res) => {
    try {
      const [rows] = await poolPromise.query(sql)
      res.json(rows)
    } catch(err) {
      console.error(`Error ${apiName} database:`, err)
      res.status(500).send('Internal Server Error')
    }
  })
}