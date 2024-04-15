import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Length } from "class-validator";
import { Country } from "./country.entity";

@Entity()
@ObjectType()
export class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Country, (country) => country.name)
  countries: Country[];
}
@InputType()
export class NewContinentInput {
  @Field()
  @Length(2, 30, {
    message: "Le nom du continent doit contenir entre 2 et 30 caractères",
  })
  name: string;
}
