import * as mysql from 'mysql'

const db = mysql.createConnection({
	host: 'localhost',
	user: 'opalrsln',
	password: 'KWNjwniav418!',
	database: 'sekolah',
    port: 3306
})
export { db }