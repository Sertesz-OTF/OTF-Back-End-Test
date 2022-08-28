const express = require('express');
const router = express.Router();
const axios = require('axios');
const crud = require('./crud');

router.get('/', crud.ListRegisters);

router.post('/create', crud.Create);

router.delete('/delete/:id', crud.Delete);

router.get('/update/:id', crud.GetRegister);

router.patch('/update/:id', crud.Update);


module.exports = router;