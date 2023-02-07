const express = require("express");
const BarangMasukControllers = require("../controllers/BarangMasukControllers");
const BarangControllers = require("../controllers/BarangControllers");

const Router = express.Router();

Router.post('/insertBarang', BarangControllers.insertBarang);
Router.get('/Barang', BarangControllers.getBarang);

Router.get('/barangmasuk', BarangMasukControllers.getBarangMasuk);
Router.post('/insertbarangmasuk', BarangMasukControllers.insertBarangMasuk);
Router.put('/editbarangmasuk/:id', BarangMasukControllers.editBarangMasuk);
Router.delete('/deletebarangmasuk/:id', BarangMasukControllers.deleteBarangMasuk);

module.exports = Router;