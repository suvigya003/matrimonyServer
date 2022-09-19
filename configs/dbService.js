const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

conn.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db" + conn.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query="SELECT * from names";

        conn.query(query,(err,results)=>{
            if(err)reject(new Error(err.message));
            resolve(results);
        })
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

async insertNewName(name){
    try{
        const response = await new Promise((resolve, reject) => {
            const query="insert into names values";
    
            conn.query(query,(err,result)=>{
                if(err)reject(new Error(err.message));
                resolve(result.insertId);
            })
          });
    
          return response;
    }catch{
        console.log(error);
    }
}

    async deleteRowById(id){
        try{
            id=parseInt(id,10);
            const response = await new Promise((resolve, reject) => {
                const query="DELETE from names where id=?";
        
                conn.query(query,[id],(err,result)=>{
                    if(err)reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
              });
              return response === 1 ? true:false;
    
        }catch(error){
            console.log(error);
            return false;
        }
        
    }

    async editRowById(id,name){
        try{
            id=parseInt(id,10);
            const response = await new Promise((resolve, reject) => {
                const query="UPDATE names set name=? where id=?";
        
                conn.query(query,[name,id],(err,result)=>{
                    if(err)reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
              });
              return response === 1 ? true:false;
    
        }catch(error){
            console.log(error);
            return false;
        }
        
    }
}

module.exports = DbService;
