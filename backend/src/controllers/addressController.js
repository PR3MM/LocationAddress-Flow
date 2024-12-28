import Address from '../models/address.js';

const addressController = {
  getAllAddresses: async (req, res) => {
    try {
      const addresses = await find();
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createAddress: async (req, res) => {
    try {
      const newAddress = new Address(req.body);
      await newAddress.save();
      res.status(201).json(newAddress);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateAddress: async (req, res) => {
    try {
      const address = await findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!address) return res.status(404).json({ error: 'Address not found' });
      res.json(address);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const address = await findByIdAndDelete(req.params.id);
      if (!address) return res.status(404).json({ error: 'Address not found' });
      res.json({ message: 'Address deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  setDefaultAddress: async (req, res) => {
    try {
      await updateMany({}, { isDefault: false });
      
      const address = await findByIdAndUpdate(
        req.params.id,
        { isDefault: true },
        { new: true }
      );
      
      if (!address) return res.status(404).json({ error: 'Address not found' });
      res.json(address);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default addressController;