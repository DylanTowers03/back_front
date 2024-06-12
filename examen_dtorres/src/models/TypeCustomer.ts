import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TypeCustomer extends Model {
  public name!: string;
  public isDeleted!: boolean; // Campo para soft delete
}

export interface TypeCustomerI {
    name: string;
    isDeleted: boolean;
}

TypeCustomer.init(
  {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: "type_customers",
    sequelize: database,
    timestamps: false
  }
);
