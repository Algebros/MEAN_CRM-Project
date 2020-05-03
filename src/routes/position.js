const router = require('express').Router();
const controller = require('../controllers/position');

router.get('/:category', controller.getByCategoryId);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;