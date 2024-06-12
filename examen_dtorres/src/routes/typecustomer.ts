import { Request, Response, Application, Router } from "express";

import { TypeCustomerController } from '../controller/typecustomer.controller';

export class TypeCustomerRoutes {
    public typecustomerController: TypeCustomerController =  new TypeCustomerController();

    public routes(app: Application): void {
        app.route("/typecustomers/test").get(this.typecustomerController.test)
        app.route("/typecustomers").get(this.typecustomerController.getAllTypeCustomers)
        app.route("/typecustomers/:id").get(this.typecustomerController.getOneTypeCustomer)
        app.route('/typecustomers').post(this.typecustomerController.createTypeCustomer)
        app.route('/typecustomers').patch(this.typecustomerController.updateTypeCustomer)
        app.route('/typecustomers/:id').delete(this.typecustomerController.deleteTypeCustomer)
        app.route('/typecustomers/:id').patch(this.typecustomerController.deleteSoftTypeCustomer)
    }
}
