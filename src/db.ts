import { DataSource } from "typeorm";
import { Country } from "./entities/country.entity";

const db = new DataSource({
  type: "sqlite",
  database: "../db.sqlite",
  entities: [Country],
  synchronize: true,
  logging: false,
});

export default db;
