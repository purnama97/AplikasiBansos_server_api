const { Penduduk, Membentuk, Keluarga, Mendapatkan, Bansos } = require("../models");
const Joi = require("@hapi/joi");


exports.read = async(req,res) => {
	try {
		const Keluargas = await Keluarga.findAll({
		  include:[{
			model: Membentuk,  
			as:"Anggota",
				include:{
					model:Penduduk,
					attributes:{
						exclude: ["id", "createdAt", "updatedAt"],
					},
				},
				attributes:{
					exclude: ["id","KeluargaId", "pendudukId","keluargaId", "PendudukId", "createdAt", "updatedAt"],
				},
			},{
			model: Mendapatkan,
			as:"Bantuan",
			include:{
				model:Bansos,
				attributes:{
					exclude: ["createdAt", "updatedAt","categoryId","CategoryId"]
				},
			},
			attributes:{
				exclude: [ "id","keluargaId", "bansoId","BansoId", "createdAt", "updatedAt", "KeluargaId"]
			},
		  }],
		  attributes:{
			exclude: ["id","createdAt", "updatedAt"]
		  }
		});
		res.status(200).send({ 
			status:"Sukses",
			data: {Keluarga: Keluargas}
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
		const Bansoss = await Keluarga.findAll({
		  include:[{
			model: Membentuk,  
			as:"Anggota",
				include:{
					model:Penduduk,
					attributes:{
						exclude: ["id", "createdAt", "updatedAt"],
					},
					where:{
						nik
					}
				},
				attributes:{
					exclude: ["id","KeluargaId", "pendudukId","keluargaId", "PendudukId", "createdAt", "updatedAt"],
				},
			},{
			model: Mendapatkan,
			as:"Bantuan",
			include:{
				model:Bansos,
				attributes:{
					exclude: ["createdAt", "updatedAt","categoryId","CategoryId"]
				},
			},
			attributes:{
				exclude: [ "id","keluargaId", "bansoId","BansoId", "createdAt", "updatedAt", "KeluargaId"]
			},
		  }],
		  attributes:{
			exclude: ["id","createdAt", "updatedAt"]
		  }
		});
		res.status(200).send({ 
			status:"Sukses",
			data: {Keluarga: Bansoss}
		});
	} catch (error) {
		console.log(error);
		res.send({ 
		status:500,
		message:"Internal Server Essrror"
		});
	}
}

exports.create = async(req, res) =>{
 try {

        const schema = Joi.object({
			keluargaId:Joi.number().required(),
			bansoId:Joi.number().required(),
			status: Joi.number().required()
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const keluargaId = req.body.keluargaId;
			const Cek = await Keluarga.findOne({where:{'id':keluargaId}});
		if(!Cek){
			res.status(400).send({error:{message:"Keluarga tidak ditemukan"}});
		}else{
			const Mendapatkans = await Mendapatkan.create(req.body);
			
			const Bansoss = await Keluarga.findOne({
			  include:[{
				model: Membentuk,  
				as:"Anggota",
					include:{
						model:Penduduk,
						attributes:{
							exclude: ["id", "createdAt", "updatedAt"],
						},
					},
					attributes:{
						exclude: ["id","KeluargaId", "pendudukId","keluargaId", "PendudukId", "createdAt", "updatedAt"],
					},
				},{
				model: Mendapatkan,
				as:"Bantuan",
				include:{
					model:Bansos,
					attributes:{
						exclude: ["createdAt", "updatedAt","categoryId","CategoryId"]
					},
				},
				attributes:{
					exclude: [ "id","keluargaId", "bansoId","BansoId", "createdAt", "updatedAt", "KeluargaId"]
				},
				where:{
					"id":Mendapatkans.id
				},
			  }],
			  attributes:{
				exclude: ["id","createdAt", "updatedAt"]
			  }
			});
			res.status(200).send({ 
				status:"Sukses",
				data: {Keluarga: Bansoss}
			});
		}
		
    }catch(error){
        res.send({ 
			status:500,
			message:"Internal Server Error"
		});
		console.log(error)
    }
}

exports.update = async(req, res) =>{
 try {
        const schema = Joi.object({
			keluargaId:Joi.number().required(),
			bansoId:Joi.number().required(),
			status: Joi.number().required()
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const keluargaId = req.body.keluargaId;
		const Cek = await Keluarga.findOne({where:{'id':keluargaId}});
		if(!Cek){
			res.status(400).send({error:{message:"Keluarga tidak ditemukan"}});
		}else{
			const {id} = req.params;
			const Mendapatkans = await Mendapatkan.update(req.body,{where:{id}});
			
			const Bansoss = await Keluarga.findOne({
			  include:[{
				model: Membentuk,  
				as:"Anggota",
					include:{
						model:Penduduk,
						attributes:{
							exclude: ["id", "createdAt", "updatedAt"],
						},
					},
					attributes:{
						exclude: ["id","KeluargaId", "pendudukId","keluargaId", "PendudukId", "createdAt", "updatedAt"],
					},
				},{
				model: Mendapatkan,
				as:"Bantuan",
				include:{
					model:Bansos,
					attributes:{
						exclude: ["createdAt", "updatedAt","categoryId","CategoryId"]
					},
				},
				attributes:{
					exclude: [ "id","keluargaId", "bansoId","BansoId", "createdAt", "updatedAt", "KeluargaId"]
				},
				where:{
					"keluargaId":req.body.keluargaId,
				},
			  }],
			  attributes:{
				exclude: ["id","createdAt", "updatedAt"]
			  }
			});
			res.status(200).send({ 
				status:"Sukses",
				data: {Keluarga: Bansoss}
			});
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
	  const Cek = await Mendapatkan.findOne({where:{id}});
	  if(!Cek){
		res.status(400).send({error:{message:"Data Not Found!"}});
	  }else{
		  const Mendapatkans = await Mendapatkan.destroy({
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


