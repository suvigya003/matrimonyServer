const db=require('../../configs/dbService');

exports .login=(req,res)=>{
    const {email,password}=req.body;

    try{

    const query="SELECT * from users";
    ///////no resolve and reject
    db.query(query,(err,results)=>{
        if(err)reject(new Error(err.message));
        resolve(results);
    })
    //////data or results
    .then((data)=>{
        if(data.rows.length===0){
            res.status(400).json({
                error:"Emailid doesn't exist, kindly signup",
                ////// what and why userExists???
                userExists:false,
            });
        }else if(
            ///// password
            email!==data.rows[0].email||
            password!==data.rows[0].password
        ){
            res.status(400).json({
                error:"Emailid doesn't exist, kindly signup",
            });
        }
        ///// token
        // else{

        // }
        res.status(200).json({
            message:"Successfully logged in",
            /////
            // token:token,
        });
    
    }) //////.catch
    } catch(err){
        console.log(err);
        res.status(500).json({
            error:"Server Error",
        });
    };
};

exports.signUp=(req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    /////try needed???
    try{
        db.query(`select * from users where email='${email}';`)
        .then((data)=>{
            if(data.rows.length!==0){
                res.status(400).json({
                    error:"User already exists",
                    userExists:true,
                });
            }else if(!firstName || !lastName || !email || !password){
                res.status(400).json({
                    error:"Enter all fields",
                });
            }else{
                const user={
                    firstName, lastName, email, password
                };
                db.query(`insert into users (firstName, lastName, email, password) values('${user.firstName}','${user.lastName}','${user.email}','${user.password}')`)
                .then((data)=>{
                    /////token
                    //const token.....
                    res.status(200).json({
                        message:"Successfully Registered!!!",
                        /////token:token,
                    });
                })
                .catch((err)=>{
                    res.status(500).json({
                        error:"Internal Server Error",
                    });
                });
            }
        })
        .catch((err)=>{
            res.status(500).json({
                error:"Server Error",
            })
        })
    }catch{
        console.log(error);
    }
};