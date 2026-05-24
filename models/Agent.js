import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Agent = sequelize.define(
  "Agent",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    facebookLink: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "facebook_link",
    },
    instagramLink: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "instagram_link",
    },
    linkedinLink: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "linkedin_link",
    },
    listingsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "listings_count",
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "experience_years",
    },
  },
  {
    tableName: "agents",
    timestamps: false,
  }
);
