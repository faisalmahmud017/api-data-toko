const express = require("express");
const BarangControllers = require("../controllers/BarangControllers");

const Router = express.Router();

Router.get('/barangmasuk', BarangControllers.getBarangMasuk);
Router.post('/insertbarangmasuk', BarangControllers.insertBarangMasuk);
Router.put('/editbarang/:id', BarangControllers.editBarangMasuk);
Router.delete('/deletebarang/:id', BarangControllers.deleteBarangMasuk);

module.exports = Router;