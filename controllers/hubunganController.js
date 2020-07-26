const { Keluarga, Penduduk, Membentuk } = require("../models");
const Joi = require("@hapi/joi");

exports.create = async(req, res) =>{
 try {

        const schema = Joi.object({
			pendudukId:Joi.number().required(),
			hubungan: Joi.string().min(4).max(16).required()
        });
        
        const { error } = schema.validate(req.body);
      
        if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });
		
		const {id} = req.params;
		const pendudukId = req.body.pendudukId;
		const Cek = await Penduduk.findOne({where:{'id':pendudukId}});
		if(!Cek){
			res.status(400).send({error:{message:"Penduduk tidak ditemukan"}});
		}else{
			const hubungan = {
				"keluargaId":req.params.id,
				"pendudukId":req.body.pendudukId,
				"hubungan":req.body.hubungan
			};
			const Membentuks = await Membentuk.create(hubungan);
			
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
				  id,
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

exports.delete = async(req, res) => {
  try {
	  const {id} = req.params;
	  const Cek = await Membentuk.findOne({where:{id}});
	  if(!Cek){
		res.status(400).send({error:{message:"Data Not Found!"}});
	  }else{
		  const Hubungans = await Membentuk.destroy({
			  where: {
				id,
			  }
			}) 
			res.status(200).send({status:"Success",data:{id}})
	  }
   }catch(error){
	   console.log(error)
      res.send(500,{"error":"Internal Server Error"});
   }
 }



