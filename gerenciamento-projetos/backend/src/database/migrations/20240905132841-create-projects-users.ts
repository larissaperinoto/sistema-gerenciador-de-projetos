"use strict";
import { DataTypes, QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("ProjectsUsers", {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
        field: "user_id",
      },
      project_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Projects",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
        field: "project_id",
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("ProjecstUsers");
  },
};
