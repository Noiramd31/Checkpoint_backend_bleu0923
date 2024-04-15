import { Resolver, Arg, Query, Int, Mutation } from "type-graphql";
import { GraphQLError } from "graphql";
import { Country, Message, NewCountryInput } from "../entities/country.entity";
import CountryService from "../services/country.service";
import { Like } from "typeorm";

@Resolver(Country)
class CountryResolver {
  @Query(() => [Country])
  async allCountries() {
    return await Country.find({
      order: { id: "desc" },
      relations: {
        continent: true,
      },
    });
  }

  @Query(() => Country)
  async countryByCode(@Arg("countryCode", () => String) code: string) {
    const country = await Country.findOneBy({ code });
    if (!country) {
      throw new GraphQLError("Not Found");
    }
    return country;
  }

  @Mutation(() => Message)
  async createCountry(
    @Arg("newCountry", { validate: true }) newCountry: NewCountryInput
  ) {
    const alreadyRegistered = Boolean(
      await new CountryService().findCountryByName(newCountry.name)
    );
    if (alreadyRegistered) {
      return { success: false, message: "Already Registered" };
    } else {
      try {
        await new CountryService().createCountry(newCountry);
        return { success: true, message: "Account Created !" };
      } catch (e) {
        console.error((e as Error).message);
      }
    }
  }
}

export default CountryResolver;
