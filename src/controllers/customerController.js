import { CustomerModel } from "../models/customerModel.js";

export const CustomerController = {

  // GET semua customer + searching + pagination
  async getAll(req, res) {
    try {
      const { name } = req.query;

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      if (page < 1 || limit < 1) {
        return res.status(400).json({
          error: "Page dan limit harus lebih besar dari 0"
        });
      }

      const customers = await CustomerModel.getAll(
        name,
        page,
        limit
      );

      res.json(customers);

    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  },


  // GET customer berdasarkan ID
  async getById(req, res) {
    try {
      const customer = await CustomerModel.getById(req.params.id);

      res.json(customer);

    } catch (err) {
      res.status(404).json({
        error: err.message
      });
    }
  },


  // POST customer
  async create(req, res) {
    try {
      const { name, email, phone, address } = req.body;

      // Validasi email
      if (!email || !email.includes("@")) {
        return res.status(400).json({
          error: "Email harus memiliki karakter @"
        });
      }

      // Validasi nomor telepon
      if (!phone || phone.length < 10) {
        return res.status(400).json({
          error: "Nomor telepon harus diisi minimal 10 karakter"
        });
      }

      const customer = await CustomerModel.create({
        name,
        email,
        phone,
        address
      });

      res.status(201).json(customer);

    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },


  // PUT customer
  async update(req, res) {
    try {
      const { name, email, phone, address } = req.body;

      // Validasi email
      if (!email || !email.includes("@")) {
        return res.status(400).json({
          error: "Email harus memiliki karakter @"
        });
      }

      // Validasi nomor telepon
      if (!phone || phone.length < 10) {
        return res.status(400).json({
          error: "Nomor telepon harus diisi minimal 10 karakter"
        });
      }

      const customer = await CustomerModel.update(
        req.params.id,
        {
          name,
          email,
          phone,
          address
        }
      );

      res.json(customer);

    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  },


  // DELETE customer
  async remove(req, res) {
    try {
      await CustomerModel.remove(req.params.id);

      res.json({
        message: "Customer deleted successfully"
      });

    } catch (err) {
      res.status(400).json({
        error: err.message
      });
    }
  }

};
