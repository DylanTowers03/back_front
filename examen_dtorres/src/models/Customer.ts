// customer.model.ts
import { Model, DataTypes } from 'sequelize';
import { database } from '../database/db';
import { TypeCustomer } from './TypeCustomer';


export class Customer extends Model {
  public name!: string;
  public lastname!: string;
  public address!: string;
  public typecustomer_id!: number;
  public password!: string;
  public isDeleted!: boolean; // Campo para soft delete

}

export interface CustomerI {
  name: string;
  lastname: string;
  address: string;
  typecustomer_id: number;
  password: string;
  isDeleted: boolean; // Campo para soft delete
}

Customer.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  typecustomer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TypeCustomer,
      key: 'id'
    }
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize: database,
  tableName: 'customers',
  timestamps: false
});

// Definir la relación
Customer.belongsTo(TypeCustomer, { foreignKey: 'typecustomer_id' });
TypeCustomer.hasMany(Customer, { foreignKey: 'typecustomer_id' });