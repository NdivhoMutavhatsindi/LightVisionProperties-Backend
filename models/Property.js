import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Property = sequelize.define(
  "Property",
  {
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "agent_id",
    },
    neighborhoodId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "neighborhood_id",
    },
    propertyTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "property_type_id",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "sale",
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    garages: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    kitchens: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lounges: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    propertySize: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "property_size",
    },
    landSize: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "land_size",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "postal_code",
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "available",
    },
    mainImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "main_image",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "properties",
    timestamps: false,
  }
);
