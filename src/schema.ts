import { buildSchema } from "type-graphql";
import CountryResolver from "./resolvers/country.resolvers";

export default buildSchema({
  resolvers: [CountryResolver],
});
