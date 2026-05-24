import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Agent = sequelize.define(
  "Agent",
  {
    agentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: "agent_id",
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebookUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "facebook_url",
    },
    instagramUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "instagram_url",
    },
    whatsappUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "whatsapp_url",
    },
    twitterUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "twitter_url",
    },
    linkedinUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "linkedin_url",
    },
    profileImage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "profile_image",
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
  },
  {
    tableName: "agents",
    timestamps: false,
  },
);
