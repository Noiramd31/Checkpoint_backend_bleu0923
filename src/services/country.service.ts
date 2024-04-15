import { Repository } from "typeorm";
import db from "../db";
import { Country, NewCountryInput } from "../entities/country.entity";
import { Continent } from "../entities/continent.entity";
import ContinentService from "./continent.service";

export default class CountryService {
  db: Repository<Country>;
  constructor() {
    this.db = db.getRepository(Country);
  }

  async findCountryByCode(code: string) {
    try {
      return await this.db.findOneBy({ code });
    } catch (e) {
      console.error((e as Error).message);
      return null;
    }
  }

  async findCountryByName(name: string) {
    try {
      return await this.db.findOneBy({ name });
    } catch (e) {
      console.error((e as Error).message);
      return null;
    }
  }

  async createCountry({ code, name, emoji, continentId }: NewCountryInput) {
    try {
      const continent = await new ContinentService().findContinentById(
        continentId
      );
      if (!continent) {
        console.error("Continent not found!");
        return null;
      }
      const newCountry = this.db.create({
        code,
        name,
        emoji,
        continent,
      });
      return await this.db.save(newCountry);
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}
