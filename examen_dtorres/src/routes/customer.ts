import { Request, Response, Application, Router } from "express";

import { CustomerController } from '../controller/customer.controller';

export class CustomerRoutes {
    public customerController: CustomerController =  new CustomerController();

    public routes(app: Application): void {
        app.route("/customers/test").get(this.customerController.test)
        app.route("/customers").get(this.customerController.getAllCustomer)
        app.route("/customers/:id").get(this.customerController.getOneCustomer)
        app.route('/customers').post(this.customerController.createCustomer)
        app.route('/customers/:id').patch(this.customerController.updateCustomer)
        app.route('/customers/:id').delete(this.customerController.deleteCustomer)
        app.route('/customers/:id').patch(this.customerController.deleteSoftCustomer)
    }
}
