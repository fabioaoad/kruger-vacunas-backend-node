const { Router} = require('express');


const {
} = require('../middlewares')

const { vacunasTipoGet
} = require("../controllers/vacunasTipos");

const {
} = require("../helpers/db-validators");

const router = Router();

router.get('/',vacunasTipoGet);


module.exports = router;
