import {  Request, Response } from 'express';
import { where } from 'sequelize';
import bcrypt from 'bcrypt';

import { Customer, CustomerI } from '../models/Customer';

export class CustomerController {


    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para Customer')
        } catch (error) {

        }
    }

    public async getAllCustomer(req: Request, res:Response){
        try {
            const customer: CustomerI[] = await Customer.findAll(
               {
                    where: {isDeleted: false}
                } 
            ) // select * from customers;
            res.status(200).json({customer})
        } catch (error) {

        }
    }

    public async getOneCustomer(req: Request, res: Response) {
        try {
            const {id}=req.params;
            const customer: CustomerI | null = await Customer.findOne({where:{id,isDeleted:false}})

            if (customer){
                res.status(200).json({customer})
            } else return  res.status(300).json({mensaje: "El Customer no existe"})

        } catch (error) {
            console.error("Error en getAllCustomer:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
        
    }

    public async createCustomer(req: Request, res: Response){
        const { name, lastname, address, typecustomer_id, password} = req.body;
    
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            let body: CustomerI={ 
                name, 
                lastname, 
                address, 
                typecustomer_id, 
                password:hashedPassword,
                isDeleted:false
            };

            const customer: CustomerI = await Customer.create({ ...body });
            res.status(200).json({customer});
        } catch (error) {
            console.error("Error en createCliente:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    public async updateCustomer(req: Request, res: Response){
        const { id: pk } = req.params;
        const { name, lastname, address, typecustomer_id, password} = req.body;
    
        try {
            
            const customerExist: CustomerI | null = await Customer.findByPk(pk);
            if (!customerExist) return res.status(500).json({ msg: "El Customer no existe" });

            let hashedPassword = customerExist.password;

            if (password) {
                hashedPassword = await bcrypt.hash(password,10);
            } 
            
            let body: CustomerI = {
                
                name,
                lastname,
                address,
                typecustomer_id,
                password:hashedPassword,
                isDeleted:false
            };
            
            
            await Customer.update(body, {
                where: { id: pk }
            });
            const customer: CustomerI | null = await Customer.findByPk(pk);
            if (customer) {
                return res.status(200).json({ customer });
            }
        } catch (error) {
            console.error("Error en updateCustomer:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

        
    }
    public async deleteCustomer (req: Request, res:Response){
        const { id } = req.params;

        try {
            const customerExist: CustomerI | null = await Customer.findByPk(id);
            if(!customerExist) return res.status(500).json({msg:"El Customer No existe"})
            await Customer.destroy(
                {
                    where: {id,isDeleted:false}
                }
            )
            res.status(200).json({msg:"Customer Eliminado",customerExist})
        } catch (error) {
            console.error("Error en deleteCustomer:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    } 
    
    public async  deleteSoftCustomer(req: Request, res:Response){
        const { id } = req.params;
        try {
            const customer = await Customer.findByPk(id);
            if (!customer) {
              return res.status(404).json({ message: 'Customer not found' });
            }
        
            customer.isDeleted = true;
            await customer.save();
        
            res.json({ message: 'Customer deleted successfully' });
          } catch (error) {
            res.status(500).json({ message: 'Error deleting customer', error });
          }
    }
}
