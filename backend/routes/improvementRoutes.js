const express = require('express');
const router = express.Router();

const controller = require('../controllers/improvementController');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.delete('/:id', controller.remove);
router.put('/:id', controller.update);

module.exports = router;
