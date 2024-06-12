import { Request, Response } from 'express';
import { TypeCustomer, TypeCustomerI } from '../models/TypeCustomer'; // Importa el modelo de TypeCustomer

export class TypeCustomerController {

    public async test(req: Request, res: Response){
        try {
            res.send('Hola, método test para TypeCustomer');
        } catch (error) {
            // Manejar el error
        }
    }

    public async getAllTypeCustomers(req: Request, res: Response){
        try {
            const typeCustomers: TypeCustomerI[] = await TypeCustomer.findAll(
                {
                    where: {isDeleted: false}
                } 
            ); // Obtener todos los TypeCustomers
            res.status(200).json({ typeCustomers });
        } catch (error) {
            // Manejar el error
        }
    }

    public async getOneTypeCustomer(req: Request, res: Response) {
        try {
            const {id}=req.params;
            const typeCustomer: TypeCustomerI | null = await TypeCustomer.findOne({where:{id,isDeleted:false}})

            if (typeCustomer){
                res.status(200).json({typeCustomer})
            } else return  res.status(300).json({mensaje: "El TyperCustomer no existe"})

        } catch (error) {
            console.error("Error en getOneTyperCustomer:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
        
    }
    public async createTypeCustomer(req: Request, res: Response){
        const { name} = req.body;
    
        try {
            const typeCustomer: TypeCustomerI = await TypeCustomer.create({ name, isDeleted:false});
            res.status(200).json({ typeCustomer });
        } catch (error) {
            // Manejar el error
        }
    }
    public async updateTypeCustomer(req: Request, res: Response){
        const { id: pk } = req.params;
        const { name} = req.body;
    
        try {
            let body: TypeCustomerI = {
                name,
                isDeleted:false
            };
    
            const typeCustomerExist: TypeCustomerI | null = await TypeCustomer.findByPk(pk);
    
            if (!typeCustomerExist) return res.status(500).json({ msg: "El Tipo de Customer no existe" });
    
            await TypeCustomer.update(body, {
                where: { id: pk }
            });
        } catch (error) {
            console.error("Error en updateCustomer:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    
        const typeCustomer: TypeCustomerI | null = await TypeCustomer.findByPk(pk);
        if (typeCustomer) return res.status(200).json({ typeCustomer });
    }
    
    public async deleteTypeCustomer (req: Request, res:Response){
        const { id } = req.params;

        try {
            const typeCustomerExist: TypeCustomerI | null = await TypeCustomer.findByPk(id);
            if(!typeCustomerExist) return res.status(500).json({msg:"El TypeCustomer No existe"})
            await TypeCustomer.destroy(
                {
                    where: {id,isDeleted:false}
                }
            )
            res.status(200).json({msg:"Customer Eliminado",typeCustomerExist})
        } catch (error) {
            console.error("Error en deleteCustomer:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    } 
    
    public async deleteSoftTypeCustomer(req:Request, res:Response){
        const {id}= req.params;
        try {
            const typeCustomer = await TypeCustomer.findByPk(id);
            if (!typeCustomer) {
              return res.status(404).json({ message: 'TypeCustomer not found' });
            }
        
            typeCustomer.isDeleted = true;
            await typeCustomer.save();
        
            res.json({ message: 'TypeCustomer deleted successfully' });
          } catch (error) {
            res.status(500).json({ message: 'Error deleting typeCustomer', error });
          }
    }
}
