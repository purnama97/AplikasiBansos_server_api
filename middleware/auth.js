const jwt = require("jsonwebtoken");
const {user} = require("../models");

exports.auth = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(401).send({error:{"message": "Access denied!"}});

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({error:{"message": "Invalid token" }});
  }
};

exports.privilege = async (req,res,next) => {
    try
    {
      const {id}=req.user
      const User=await user.findOne({where:{id}})
          if(User.role===1){
              next()
          }else{
            res.status(401).send({error:{"message":"Access denied!"}})
          }
   }catch(err){
       res.status(500).send({error:{"message":"Internal server error!"}})
    }
};