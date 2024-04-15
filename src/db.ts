import { DataSource } from "typeorm";
import { Country } from "./entities/country.entity";
import { Continent } from "./entities/continent.entity";

const db = new DataSource({
  type: "sqlite",
  database: "../db.sqlite",
  entities: [Country, Continent],
  synchronize: true,
  logging: false,
});

export default db;
