import { Repository } from "typeorm";
import db from "../db";
import { Country, NewCountryInput } from "../entities/country.entity";
import { Continent, NewContinentInput } from "../entities/continent.entity";

export default class ContinentService {
  db: Repository<Continent>;
  constructor() {
    this.db = db.getRepository(Continent);
  }

  async findContinentById(id: number) {
    try {
      return await this.db.findOneBy({ id });
    } catch (e) {
      console.error((e as Error).message);
      return null;
    }
  }
}
