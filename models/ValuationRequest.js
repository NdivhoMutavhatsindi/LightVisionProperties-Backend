import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ValuationRequest = sequelize.define(
  "valuation_request",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    propertyAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    propertyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estimatedSize: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "contacted", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "valuation_requests",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);
