const express = require("express");
const BarangMasukControllers = require("../controllers/BarangMasukControllers");
const BarangControllers = require("../controllers/BarangControllers");
const UserController = require("../controllers/UserControllers")

const Router = express.Router();

Router.post('/tes-login', UserController.tesLoginUser);
Router.post('/login', UserController.loginUser);
Router.post('/register', UserController.registerUser);

Router.get('/Barang', BarangControllers.getBarang);
Router.post('/insert-Barang', BarangControllers.insertBarang);
Router.get('/detail-barang/:id', BarangControllers.detailBarang);
Router.delete('/delete-barang/:id', BarangControllers.deleteBarang);
Router.delete('/edit-barang/:id', BarangControllers.editBarang);

Router.get('/barangmasuk', BarangMasukControllers.getBarangMasuk);
Router.post('/insert-barang-masuk', BarangMasukControllers.insertBarangMasuk);
Router.put('/edit-barang-masuk/:id', BarangMasukControllers.editBarangMasuk);
Router.delete('/delete-barang-masuk/:id', BarangMasukControllers.deleteBarangMasuk);
Router.delete('/detail-barang-masuk/:id', BarangMasukControllers.detailBarangMasuk);

module.exports = Router;