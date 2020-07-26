const { Penduduk } = require("../models");
const Joi = require("@hapi/joi");


exports.create = async(req, res) =>{

    try {

        const schema = Joi.object({
			nik: Joi.string().min(16).max(17).required(),
			nama: Joi.string().min(5).max(35).required(),
			tmpLhr: Joi.string().min(3).max(25).required(),
			tglLhr: Joi.date().required(),
			jnsKel: Joi.string().min(1).max(2).required(),
			provinsi: Joi.string().min(4).max(25).required(),
			kota: Joi.string().min(4).max(25).required(),
			kelurahan: Joi.string().min(4).max(35).required(),
			rw: Joi.string().min(2).max(4).required(),
			rt: Joi.string().min(2).max(4).required(),
			kodePos: Joi.string().min(5).max(5).required(),
			agama: Joi.string().min(5).max(10).required(),
			statusPernikahan: Joi.string().min(5).max(15).required(),
			pekerjaan: Joi.string().min(5).max(15).required(),
			kewarganegaraan: Joi.string().min(5).max(35).required(),
			golDarah: Joi.string().min(1).max(10).required(),
			thumbnail: Joi.string().min(5).max(20).required()
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const {nik} = req.body;
		const Cek = await Penduduk.findOne({where:{nik}});
		if(Cek){
			res.status(400).send({error:{message:"Nik is registered!"}});
		}else{
			const Penduduks = await Penduduk.create(req.body);
			res.status(200).send({
			message:"Success",
			   data:{Penduduk:Penduduks}
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
		const Penduduks = await Penduduk.findAll({
		  attributes: {
			exclude: ["id","createdAt","updatedAt"],
		  }
		});
		res.status(200).send({ 
			status:"Sukses",
			data: {Penduduk: Penduduks}
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
		const {nik} = req.params;
		const Penduduks = await Penduduk.findOne({
		  where:{nik},
		  attributes: {
			exclude: ["id","createdAt","updatedAt"],
		  }
		});
		res.status(200).send({ 
			status:"Sukses",
			data: {Penduduk: Penduduks}
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

        const schema = Joi.object({
			nik: Joi.string().min(16).max(17).required(),
			nama: Joi.string().min(5).max(35).required(),
			tmpLhr: Joi.string().min(3).max(25).required(),
			tglLhr: Joi.date().required(),
			jnsKel: Joi.string().min(1).max(2).required(),
			provinsi: Joi.string().min(4).max(25).required(),
			kota: Joi.string().min(4).max(25).required(),
			kelurahan: Joi.string().min(4).max(35).required(),
			rw: Joi.string().min(2).max(4).required(),
			rt: Joi.string().min(2).max(4).required(),
			kodePos: Joi.string().min(5).max(5).required(),
			agama: Joi.string().min(5).max(10).required(),
			statusPernikahan: Joi.string().min(5).max(15).required(),
			pekerjaan: Joi.string().min(5).max(15).required(),
			kewarganegaraan: Joi.string().min(5).max(35).required(),
			gol_darah: Joi.string().min(1).max(10).required(),
			thumbnail: Joi.string().min(5).max(20).required()
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const {id} = req.params;
		
		const Penduduk = await Penduduk.update(req.body,{where:{id}});
		const Penduduks = await Penduduk.findOne({
			attributes: {
				exclude: ["id","createdAt","updatedAt"],
			},
			where:{id},}
			);
		res.status(200).send({
			message:"Success",
			data:{"Penduduk":Penduduks}
		}) 
		
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
	  const Cek = await Penduduk.findOne({where:{id}});
	  if(!Cek){
		res.status(400).send({error:{message:"Data Not Found!"}});
	  }else{
		  const Penduduk = await Penduduk.destroy({
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