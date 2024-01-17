import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { db } from '../db/db.config';
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

// Inisialisasi koneksi database
db.connect((err: Error | null) => {
  if (err) throw err;
  console.log('Database connected');
});

//Create Siswa
app.post('/siswa', async (c) => {
  try {

    //Isi valuenya disini
    const nama        :string="Ken Sanjaya";
    const kelas       :string="XIISIJAC";
    const alamat      :string="Babakan Solomon";
    const jeniskelamin:string="L"; 

    //Send datanya lewat POSTMAN
    const results = await new Promise((resolve, reject) => {
      db.query('INSERT INTO siswa (nama, kelas, alamat, jeniskelamin) VALUES (?, ?, ?, ?)', [nama, kelas, alamat, jeniskelamin], (err: Error | null, results: any) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    return c.json(results);
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

// Read Siswa
app.get('/siswa', async (c) => {
  const page = Number(c.req.query('page')) || 1
  const size = Number(c.req.query('size')) || 10
  const skip : number = (page - 1) * size
  try {
      
      const results = await new Promise((resolve, reject) => {
      db.query(`SELECT nis, nama, kelas, alamat, jeniskelamin, created_at, updated_at FROM siswa LIMIT ${size} OFFSET ${skip}`, (err: Error | null, results: any) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    return c.json(results);
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

//Update Siswa
// app.put('/siswa/:id', async (c) => {
//   try {
//     const id           = ;  // Ambil id dari parameter URL
//     const nama         = ;  // Ganti dengan properti yang sesuai dari request body
//     const kelas        = ;
//     const alamat       = ;
//     const jeniskelamin = ;


//     const results = await new Promise((resolve, reject) => {
//       db.query('UPDATE siswa SET nama=?, kelas=?, alamat=?, jeniskelamin=? WHERE id=?', [nama, kelas, alamat, jeniskelamin, id], (err: Error | null, results: any) => {
//         if (err) reject(err);
//         resolve(results);
//       });
//     });

//     return c.json(results);
//   } catch (err) {
//     return c.json({ error: (err as Error).message }, 500);
//   }
// });


//BasicAuth Users
// app.use('/users/*', basicAuths ({
//   username: "Ruslan",
//   password: "opalrsln"
// }))

//Create Users
app.post('/users', async (c) => {
  try {
    //Isi valuenya disini
    const name     :string ="Aceng";
    const email    :string ="acengfikri@gmail.com";
    const password :string ="fikriaceng";

    //Send datanya lewat POSTMAN
    const results = await new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err: Error | null, results: any) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    return c.json(results);
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

//Read Users
app.get('/users', async (c) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query('SELECT id,name,email FROM users', (err: Error | null, results: any) => {
        //INSERT INTO `users` (`name`, `email`,`password`) VALUES ( 'Yousap', 'Yousap@gmail.com', 'youtube');
        if (err) reject(err);
        resolve(results);
      });
    });

    return c.json(results);
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});