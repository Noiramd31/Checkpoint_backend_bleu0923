import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, Int, InputType, ID } from "type-graphql";
import { Length } from "class-validator";
import { Continent } from "./continent.entity";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  emoji: string;

  @Field(() => Continent)
  @ManyToOne(() => Continent, (continent) => continent.countries)
  continent: Continent;
}
@InputType()
export class NewCountryInput {
  @Field()
  @Length(2, 2, { message: "Le code doit contenir 2 caratères" })
  code: string;
  @Field()
  @Length(2, 30, { message: "Le nom doit contenir entre 2 et 30 caractères" })
  name: string;
  @Field()
  @Length(2, 2, { message: "L'emoji doit contenir 2 caratères" })
  emoji: string;
  @Field(() => ID)
  continentId: number;
}

@ObjectType()
export class Message {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
