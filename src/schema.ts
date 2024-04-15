import { buildSchema } from "type-graphql";
import CountryResolver from "./resolvers/country.resolvers";
import ContinentResolver from "./resolvers/continent.resolvers";

export default buildSchema({
  resolvers: [CountryResolver, ContinentResolver],
});
