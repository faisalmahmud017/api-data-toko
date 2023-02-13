const express = require("express");
const BarangMasukControllers = require("../controllers/BarangMasukControllers");
const BarangControllers = require("../controllers/BarangControllers");
const UserController = require("../controllers/UserControllers")

const Router = express.Router();

Router.post('/login', UserController.loginUser);

Router.post('/insertBarang', BarangControllers.insertBarang);
Router.get('/Barang', BarangControllers.getBarang);
Router.get('/detailbarang/:id', BarangControllers.detailBarang);
Router.delete('/deletebarang/:id', BarangControllers.deleteBarang);
Router.delete('/editbarang/:id', BarangControllers.editBarang);

Router.get('/barangmasuk', BarangMasukControllers.getBarangMasuk);
Router.post('/insertbarangmasuk', BarangMasukControllers.insertBarangMasuk);
Router.put('/editbarangmasuk/:id', BarangMasukControllers.editBarangMasuk);
Router.delete('/deletebarangmasuk/:id', BarangMasukControllers.deleteBarangMasuk);
Router.delete('/detailbarangmasuk/:id', BarangMasukControllers.detailBarangMasuk);

module.exports = Router;