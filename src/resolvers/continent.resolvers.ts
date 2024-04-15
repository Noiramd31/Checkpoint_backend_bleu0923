import { Resolver, Arg, Query, Int, Mutation } from "type-graphql";
import { Continent } from "../entities/continent.entity";
import { Country } from "../entities/country.entity";

@Resolver(Continent)
class ContinentResolver {
  @Query(() => [Continent])
  async allContinents() {
    return await Continent.find({ order: { id: "desc" } });
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continentID", () => Int) continentID: number
  ) {
    return await Country.find({
      where: { continent: { id: continentID } },
      order: { id: "DESC" },
      relations: ["continent"],
    });
  }
}
export default ContinentResolver;
