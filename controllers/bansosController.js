const { Bansos, Category } = require("../models");
const Joi = require("@hapi/joi");


exports.create = async(req, res) =>{
    try {

        const schema = Joi.object({
			name: Joi.string().min(2).max(17).required(),
			description: Joi.string().max(35).required(),
			categoryId: Joi.number().required()
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const {name} = req.body;
		const Cek = await Bansos.findOne({where:{name}});
		if(Cek){
			res.status(400).send({error:{message:"Nama Bansos Telah Ada!"}});
		}else{
			const Bansoss = await Bansos.create(req.body);
			
			const Created = await Bansos.findOne({
				include:{
					model:Category,
					as:'Category',
					attributes:{
						exclude:["createdAt","updatedAt"],
					},
				},
				attributes:{
					exclude:["CategoryId","categoryId","createdAt","updatedAt"],
				},
				where:{"id":Bansoss.id}
			});
			res.status(200).send({
			message:"Success",
			   data:{Bansos:Created}
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
		const Bansoss = await Bansos.findAll({
			include:{
				model:Category,
				as:'Category',
				attributes:{
					exclude:["createdAt","updatedAt"],
				},
			 },
			attributes:{
				exclude:["CategoryId","categoryId","createdAt","updatedAt"],
			},
		});
		res.status(200).send({ 
			status:"Sukses",
			data: {Bansos: Bansoss}
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
		const Bansoss = await Bansos.findOne({
			include:{
				model:Category,
				as:'Category',
				attributes:{
					exclude:["createdAt","updatedAt"],
				},
			 },
			attributes:{
				exclude:["CategoryId","categoryId","createdAt","updatedAt"],
			},
			where:{
				name,
			}
		});
		res.status(200).send({ 
			status:"Sukses",
			data: {Bansos: Bansoss}
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
			description: Joi.string().max(35).required(),
			categoryId: Joi.number().required()
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const Cek = await Bansos.findOne({where:{id}});
		if(!Cek){
			res.status(400).send({error:{message:"Bansos Tidak Ada!"}});
		}else{
			const Bansoss = await Bansos.update(req.body,{where:{id}});
			
			const Updated = await Bansos.findOne({
				include:{
					model:Category,
					as:'Category',
					attributes:{
						exclude:["createdAt","updatedAt"],
					},
				},
				attributes:{
					exclude:["CategoryId","categoryId","createdAt","updatedAt"],
				},
			});
			res.status(200).send({
			message:"Success",
			   data:{Bansos:Updated}
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
	  const Cek = await Bansos.findOne({where:{id}});
	  if(!Cek){
		res.status(400).send({error:{message:"Data Not Found!"}});
	  }else{
		  const Bansoss = await Bansos.destroy({
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