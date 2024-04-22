/* eslint-disable react/no-unescaped-entities */
import {
  getPokemonData,
  getInformationsForPokemon,
  getFrenchFirstType,
  getAbilitiesForPokemon,
  getEggsForPokemon,
  getPokemonGrowthRate,
  getPokemonGender,
} from "@/utils/apiCall";
import { backgroundColorTypes } from "@/utils/colorsBackground";
import React from "react";
import { CardType } from "../TypePokemon/CardType";
import { TypePokemon } from "../TypePokemon/TypePokemon";
import { colorTypes } from "../colors";
import { Icons } from "../icons";
import { getFrenchName } from "@/utils/helpers";
import Image from "next/image";

export const InformationsPokemon = async ({ id }: { id: number }) => {
  const pokemonData = await getPokemonData(id);
  const informationsPokemon = await getInformationsForPokemon(pokemonData.id);

  const typeFrench = await getFrenchFirstType(pokemonData.types[0].type.url);
  const pokemonAbilities = await getAbilitiesForPokemon(pokemonData.abilities);
  const pokemonEggs = await getEggsForPokemon(informationsPokemon.egg_groups);

  const pokemonGrowthRate = await getPokemonGrowthRate(
    informationsPokemon.growth_rate.url
  );
  const pokemonFrenchName = await getFrenchName(informationsPokemon);

  const pokemonGender = await getPokemonGender(informationsPokemon.gender_rate);
  return (
    <div
      className={`rounded-lg w-[350px] border-0 ${
        backgroundColorTypes[
          typeFrench.name.toLowerCase() as keyof typeof backgroundColorTypes
        ]
      }`}
    >
      <div className="pt-1 px-1">
        {pokemonData.types.length > 1 ? (
          <CardType
            firstTypeUrl={pokemonData.types[0].type.url}
            secondTypeUrl={pokemonData.types[1].type.url}
            name={pokemonFrenchName.name}
            id={pokemonData.id}
          />
        ) : (
          <CardType
            firstTypeUrl={pokemonData.types[0].type.url}
            secondTypeUrl={pokemonData.types[0].type.url}
            name={pokemonFrenchName.name}
            id={pokemonData.id}
          />
        )}
      </div>
      <div className="flex items-center justify-center p-1">
        <div className="w-full flex items-center justify-center bg-white rounded">
          <Image
            src={pokemonData.sprites.other?.["official-artwork"]?.front_default}
            alt={pokemonData.name}
            width={280}
            height={250}
            quality={100}
          />
        </div>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Nom anglais
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {pokemonData.name}
        </p>
      </div>
      <div className="flex flex-col gap-1 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-full p-2`}
        >
          Numéros de Pokédex
        </p>

        <div className="bg-white w-full p-4 rounded">
          <div className="grid grid-cols-3 gap-2 text-center">
            {informationsPokemon.pokedex_numbers.map((pokedexNumber: any) => (
              <div key={pokedexNumber.pokedex.name}>
                <div>
                  <h3 className="font-bold capitalize text-sm">
                    {pokedexNumber.pokedex.name.replace(/-/g, " ")}
                  </h3>
                  <p className="text-sm">{pokedexNumber.entry_number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Types
        </p>
        <div className="bg-white rounded w-3/5 flex items-center justify-center p-2">
          {pokemonData.types.map((type: any) => (
            <div key={type.type.name}>
              <TypePokemon url={type.type.url} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Catégorie
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {
            informationsPokemon.genera.find(
              (gen: any) =>
                gen.language.name === "fr" || gen.language.name === "en"
            ).genus
          }
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Taille
        </p>
        <p className=" bg-white rounded w-3/5 p-2">
          {pokemonData.height / 10} m
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Poids
        </p>
        <p className=" bg-white rounded w-3/5 p-2">
          {pokemonData.weight / 10} kg
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-stretch p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 py-4 pl-2`}
        >
          Talents
        </p>

        <div className="capitalize bg-white rounded l w-3/5 py-1 pl-2 flex flex-col justify-center">
          {pokemonAbilities.map((ability: any) => (
            <div key={ability.ability.name}>
              <p>{ability.ability.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-0.5 w-full items-stretch p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Groupes d'Oeuf
        </p>
        <div className="capitalize bg-white rounded w-3/5 p-2 flex flex-col justify-center">
          {pokemonEggs.map((egg: any) => (
            <div key={egg.name}>
              <p>{egg.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Eclosion
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {informationsPokemon.hatch_counter} cycles
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Base Exp.
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {pokemonData.base_experience} exp.
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Taux de capture
        </p>
        <p className="capitalize  bg-white rounded w-3/5 py-5 pl-2">
          {informationsPokemon.capture_rate}
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Bonheur
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {informationsPokemon.base_happiness}
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 p-2`}
        >
          Exp. niv.100
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {pokemonGrowthRate} exp.
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[typeFrench.name.toLowerCase() as keyof typeof colorTypes]
          } font-bold rounded w-2/5 py-4 pl-2`}
        >
          Sexe
        </p>
        <div className="capitalize  bg-white rounded w-3/5 py-1 pl-2 flex flex-col">
          <p className="text-pink-500 flex items-center">
            {pokemonGender.female}% <Icons.femaleGender className="h-4 w-4" />
          </p>
          <p className="text-blue-500 flex items-center">
            {pokemonGender.male}% <Icons.maleGender className="h-4 w-4" />
          </p>
        </div>
      </div>
    </div>
  );
};