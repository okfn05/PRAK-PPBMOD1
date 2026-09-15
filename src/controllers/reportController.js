import { CustomerModel } from "../models/customerModel.js";

export const ReportController = {

  async getTotalCustomers(req, res) {
    try {
      const total = await CustomerModel.getTotal();

      res.json({
        total_customers: total
      });

    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }

};