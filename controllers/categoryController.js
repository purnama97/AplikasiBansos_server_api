const { Category } = require("../models");
const Joi = require("@hapi/joi");


exports.create = async(req, res) =>{
    try {

        const schema = Joi.object({
			name: Joi.string().min(2).max(17).required(),
			keterangan: Joi.string().max(35).required(),
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const {name} = req.body;
		const Cek = await Category.findOne({where:{name}});
		if(Cek){
			res.status(400).send({error:{message:"Nama Category Telah Ada!"}});
		}else{
			const Created = await Category.create(req.body);
			
			res.status(200).send({
			message:"Success",
			   data:{Category:Created}
			}) 
		}
		
    }catch(error){
        res.send({ 
			status:500,
			message:"Internal Server Error"
		});
		console.log(error)
    }
}

exports.read = async(req,res) => {
	try {
		const Categories = await Category.findAll();
		res.status(200).send({ 
			status:"Sukses",
			data: {Category: Categories}
		});
	} catch (error) {
		console.log(error);
		res.send({ 
		status:500,
		message:"Internal Server Essrror"
		});
	}
}


exports.search = async(req,res) => {
	try {
		const {name} = req.params;
		const Categories = await Category.findOne({
			where:{
				name
			}
		});
		res.status(200).send({ 
			status:"Sukses",
			data: {Category: Categories}
		});
	} catch (error) {
		res.send({ 
		status:500,
		message:"Internal Server Esrror"
		});
	}
}

exports.update = async(req, res) =>{ 
   try {
		const {id} = req.params;
        const schema = Joi.object({
			name: Joi.string().min(2).max(17).required(),
			keterangan: Joi.string().max(35).required()
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const Cek = await Category.findOne({where:{id}});
		if(!Cek){
			res.status(400).send({error:{message:"Category Tidak Ada!"}});
		}else{
			const Categories = await Category.update(req.body,{where:{id}});
			
			const Updated = await Category.findOne({
				where:{
					id,
				}
			});
			res.status(200).send({
			message:"Success",
			   data:{Category:Updated}
			}) 
		}
		
    }catch(error){
        res.send({ 
			status:500,
			message:"Internal Server Error"
		});
		console.log(error)
    }
}


exports.delete = async(req, res) => {
  try {
	  const {id} = req.params;
	  const Cek = await Category.findOne({where:{id}});
	  if(!Cek){
		res.status(400).send({error:{message:"Data Not Found!"}});
	  }else{
		  const Categories = await Category.destroy({
			  where: {
				id,
			  }
			}) 
			res.status(200).send({status:"Success",data:{id}})
	  }
   }catch(error){
      res.send(500,{"error":"Internal Server Error"});
   }
 }