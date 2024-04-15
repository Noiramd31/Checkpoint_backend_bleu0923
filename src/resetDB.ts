import db from "./db";
import { Country } from "./entities/country.entity";
import { Continent } from "./entities/continent.entity";

async function clearDB() {
  await db.initialize();
  await db.dropDatabase();
  await db.synchronize();
}

async function main() {
  await clearDB();
  const continent1 = db.getRepository(Country).create({
    name: "Europe",
  });
  const continent2 = db.getRepository(Country).create({
    name: "Amérique du Sud",
  });
  await db.getRepository(Continent).save(continent1);
  await db.getRepository(Continent).save(continent2);
  const country1 = db.getRepository(Country).create({
    code: "FR",
    name: "France",
    emoji: "🇫🇷",
    continent: continent1,
  });
  const country2 = db.getRepository(Country).create({
    code: "BR",
    name: "Brésil",
    emoji: "🇧🇷",
    continent: continent2,
  });
  await db.getRepository(Country).save(country1);
  await db.getRepository(Country).save(country2);

  console.log("Les pays et les continents ont été enregistrés avec succès !");
}

main();
