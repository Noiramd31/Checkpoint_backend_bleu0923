import db from "./db";
import { Country } from "./entities/country.entity";

async function clearDB() {
  await db.initialize();
  await db.dropDatabase();
  await db.synchronize();
}

async function main() {
  await clearDB();
  const country1 = db.getRepository(Country).create({
    code: "FR",
    name: "France",
    emoji: "🇫🇷",
    continent: "Europe",
  });
  const country2 = db.getRepository(Country).create({
    code: "BR",
    name: "Brésil",
    emoji: "🇧🇷",
    continent: "Amérique du Sud",
  });

  await db.getRepository(Country).save(country1);
  await db.getRepository(Country).save(country2);

  console.log("Les pays ont été enregistrés avec succès !");
}

main();
