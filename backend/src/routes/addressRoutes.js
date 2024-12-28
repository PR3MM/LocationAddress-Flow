import express from 'express';
const router = express.Router();

import addressController from '../controllers/addressController.js';

router.get('/', addressController.getAllAddresses);
router.post('/', addressController.createAddress);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);
router.put('/:id/default', addressController.setDefaultAddress);

export default router;
