const express = require("express");
const router = express.Router();
const {auth, privilege} = require("../middleware/auth");
//const { upload } = require("../middleware/upload");
const {
  login,
  register
} = require("../controllers/authController");

const {
  read: getPenduduk,
  create:createPenduduk,
  search:searchPenduduk,
  update:updatePenduduk,
  delete:deletePenduduk,
  } = require("../controllers/pendudukController")
  
const {
  read: getKk,
  create: createKk,
  search: searchKk,
  update: updateKk,
  delete: deleteKk,
  } = require("../controllers/keluargaController")

const {
  create: createHub,
  delete: deleteHub,
  } = require("../controllers/hubunganController")
  
const {
  create: createProgram,
  read: readProgram,
  search: searchProgram,
  update: updateProgram,
  delete: deleteProgram,
  } = require("../controllers/bansosController")

const {
  create: createCategory,
  read: readCategory,
  search: searchCategory,
  update: updateCategory,
  delete: deleteCategory,
  } = require("../controllers/categoryController")

  
const {
  create: createBansos,
  read: readBansos,
  search: searchBansos,
  update: updateBansos,
  delete: deleteBansos,
  } = require("../controllers/mendapatkanController")
  
//Penduduk
router.get("/penduduks", auth, getPenduduk)
router.get("/penduduk/:nik", auth, searchPenduduk)
router.post("/penduduk", auth, privilege, createPenduduk)
router.patch("/penduduk/:id", auth, privilege, updatePenduduk)
router.delete("/penduduk/:id", auth, privilege, deletePenduduk)

//Keluarga
router.get("/keluargas", auth, getKk)
router.get("/keluarga/:noKk", auth, searchKk)
router.post("/keluarga", auth, privilege, createKk)
router.patch("/keluarga/:id", auth, privilege, updateKk)
router.delete("/keluarga/:id", auth, privilege, deleteKk)

//Hubungan
router.post("/hubungan/:id", auth, privilege, createHub)
router.delete("/hubungan/:id", auth, privilege, deleteHub)

//Bansos
router.post("/program", auth, privilege, createProgram)
router.get("/programs", readProgram)
router.get("/program/:name", searchProgram)
router.patch("/program/:id", auth, privilege, updateProgram)
router.delete("/program/:id", auth, privilege, deleteProgram)

//Category
router.post("/category", auth, privilege, createCategory)
router.get("/category", readCategory)
router.get("/category/:name", auth, searchCategory)
router.patch("/category/:id", auth, privilege, updateCategory)
router.delete("/category/:id", auth, privilege, deleteCategory)


//Bansos
router.post("/bansos", auth, privilege, createBansos)
router.get("/bansos", auth, readBansos)
router.get("/bansos/:nik", searchBansos)
router.patch("/bansos/:id", auth, privilege, updateBansos)
router.delete("/bansos/:id", auth, privilege, deleteBansos)

//Authentication
router.post("/login", login)
router.post("/register", register)

module.exports = router;

