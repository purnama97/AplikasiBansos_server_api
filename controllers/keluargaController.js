const { Keluarga, Membentuk, Penduduk } = require("../models");
const Joi = require("@hapi/joi");

const Anggota = async (daftar) => {
	await Membentuk.create(daftar);
}

exports.create = async(req, res) =>{
 try {

        const schema = Joi.object({
			noKk: Joi.string().min(16).max(17).required(),
			provinsi: Joi.string().min(4).max(25).required(),
			kota: Joi.string().min(4).max(25).required(),
			kecamatan: Joi.string().min(4).max(35).required(),
			kelurahan: Joi.string().min(4).max(35).required(),
			dusun: Joi.string().min(4).max(35).required(),
			rw: Joi.string().min(2).max(4).required(),
			rt: Joi.string().min(2).max(4).required(),
			kodePos: Joi.string().min(5).max(5).required(),
			pendudukId:Joi.number().required(),
			hubungan: Joi.string().min(5).max(16).required(),
        });
        
        const { error } = schema.validate(req.body);
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const {noKk} = req.body;
		const Cek = await Keluarga.findOne({where:{noKk}});
		if(!Cek){
			res.status(400).send({error:{message:"No Kk is registered!"}});
		}else{
			const createKeluarga = {
				'noKk': req.body.noKk,
				'provinsi': req.body.provinsi,
				'kota': req.body.kota,
				'kecamatan': req.body.kecamatan,
				'kelurahan': req.body.kelurahan,
				'dusun': req.body.dusun,
				'rw': req.body.rw,
				'rt': req.body.rt,
				'kodePos':req.body.kodePos 
			}
			
			const Keluargas = await Keluarga.create(createKeluarga);
			const daftar = {
				'keluargaId':Keluargas.id,
				'pendudukId':req.body.pendudukId,
				'hubungan':req.body.hubungan
			}
			console.log(daftar)
			await Anggota(daftar);
			
			const Created = await Keluarga.findOne({
			  include:{
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
			  },
			  attributes: {
				exclude: ["id","createdAt","updatedAt"],
			  },
			  where:{	
				  'id':Keluargas.id,
			  },
			});
			res.status(200).send({
			message:"Success",
			   data:{Keluarga:Created}
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
		const Keluargas = await Keluarga.findAll({
		  include:{
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
		  },
		  attributes: {
			exclude: ["id","createdAt","updatedAt"],
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
		const {noKk} = req.params;
		const Keluargas = await Keluarga.findAll({
		  include:{
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
		  },
		  attributes: {
			exclude: ["id","createdAt","updatedAt"],
		  },
		  where:{
			  noKk,
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

exports.update = async(req, res) =>{
 try {
		const id = req.params.id;
        const schema = Joi.object({
			noKk: Joi.string().min(16).max(17).required(),
			provinsi: Joi.string().min(4).max(25).required(),
			kota: Joi.string().min(4).max(25).required(),
			kecamatan: Joi.string().min(4).max(35).required(),
			kelurahan: Joi.string().min(4).max(35).required(),
			dusun: Joi.string().min(4).max(35).required(),
			rw: Joi.string().min(2).max(4).required(),
			rt: Joi.string().min(2).max(4).required(),
			kodePos: Joi.string().min(5).max(5).required(),
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const {noKk} = req.body;
		const Cek = await Keluarga.findOne({where:{noKk}});
		if(Cek){
			const Keluargas = await Keluarga.update(req.body,{where:{"id":id}});
			const Updated = await Keluarga.findOne({
			  include:{
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
			  },
			  attributes: {
				exclude: ["id","createdAt","updatedAt"],
			  },
			  where:{	
				  'id':id,
			  },
			});
			res.status(200).send({
			message:"Success",
			   data:{Keluarga:Updated}
			}) 
			
		}else{
			res.status(400).send({error:{message:"No Kk not is registered!"}});
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
	  const Cek = await Keluarga.findOne({where:{id}});
	  if(!Cek){
		res.status(400).send({error:{message:"Data Not Found!"}});
	  }else{
		  const Keluargas = await Keluarga.destroy({
			  where: {
				id,
			  }
			}) 
			res.status(200).send({status:"Success",data:{id}})
	  }
   }catch(error){
	  console.log(error)
      //res.send(500,{"error":"Internal Server Error"});
   }
 }


