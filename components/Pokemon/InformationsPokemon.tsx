/* eslint-disable react/no-unescaped-entities */
import {
  getPokemonData,
  getInformationsForPokemon,
  getPokemonMoves,
} from "@/utils/apiCall";
import { backgroundColorTypes } from "@/utils/colorsBackground";
import React from "react";
import { CardType } from "../TypePokemon/CardType";
import { TypePokemon } from "../TypePokemon/TypePokemon";
import { colorTypes } from "../colors";
import { Icons } from "../icons";
import { getPokedexInFrench } from "@/utils/helpers";
import Image from "next/image";

export const InformationsPokemon = async ({ id }: { id: number }) => {
  const pokemonData = await getPokemonData(id);
  const informationsPokemon = await getInformationsForPokemon(
    pokemonData.pokedex_id
  );

  const baseExp = await getPokemonMoves(pokemonData.pokedex_id);

  const pokedex = await getPokedexInFrench(informationsPokemon.pokedex_numbers);

  return (
    <div
      className={`rounded-lg w-[350px] border-0 ${
        backgroundColorTypes[
          pokemonData.types[0].name.toLowerCase() as keyof typeof backgroundColorTypes
        ]
      }`}
    >
      <div className="pt-1 px-1">
        {pokemonData.types.length > 1 ? (
          <CardType
            firstType={pokemonData.types[0].name}
            secondType={pokemonData.types[1].name}
            name={pokemonData.name.fr}
            id={pokemonData.pokedex_id}
          />
        ) : (
          <CardType
            firstType={pokemonData.types[0].name}
            secondType={pokemonData.types[0].name}
            name={pokemonData.name.fr}
            id={pokemonData.pokedex_id}
          />
        )}
      </div>

      <div className="flex items-center justify-center p-1">
        <div className="w-full flex items-center justify-center bg-white rounded">
          <Image
            src={pokemonData.sprites.regular}
            alt={pokemonData.name.fr}
            width={280}
            height={250}
            quality={100}
          />
        </div>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 p-2`}
        >
          Nom anglais
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {pokemonData.name.en}
        </p>
      </div>
      <div className="flex flex-col gap-1 w-full items-center p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded flex items-center justify-center w-full p-2`}
        >
          Numéros de Pokédex
        </p>

        <div className="bg-white w-full p-4 rounded">
          <div className="grid grid-cols-3 gap-2 text-center">
            {pokedex.map((pokedexNumber) => (
              <div key={pokedexNumber.name}>
                <div>
                  <h3 className="font-bold capitalize text-sm">
                    {pokedexNumber.name.replace(/-/g, " ")}
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
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 p-2`}
        >
          Types
        </p>
        <div className="bg-white rounded w-3/5 flex items-center justify-center p-2">
          {pokemonData.types.map((type) => (
            <div key={type.name}>
              <TypePokemon name={type.name} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 p-2`}
        >
          Catégorie
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {pokemonData.category}
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 p-2`}
        >
          Taille
        </p>
        <p className=" bg-white rounded w-3/5 p-2">{pokemonData.height}</p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 p-2`}
        >
          Poids
        </p>
        <p className=" bg-white rounded w-3/5 p-2">{pokemonData.weight}</p>
      </div>
      <div className="flex gap-0.5 w-full items-stretch p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 py-4 pl-2`}
        >
          Talents
        </p>

        <div className="capitalize bg-white rounded l w-3/5 py-1 pl-2 flex flex-col justify-center">
          {pokemonData.talents.map((talent) => (
            <div key={talent.name}>
              <p>{talent.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-0.5 w-full items-stretch p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 p-2`}
        >
          Groupes d'Oeuf
        </p>
        <div className="capitalize bg-white rounded w-3/5 p-2 flex flex-col justify-center">
          {!pokemonData.egg_groups ? (
            <p>Inconnu</p>
          ) : (
            pokemonData.egg_groups.map((egg) => (
              <div key={egg}>
                <p>{egg}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
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
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 p-2`}
        >
          Base Exp.
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {baseExp.base_experience} exp.
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 p-2`}
        >
          Taux de capture
        </p>
        <p className="capitalize  bg-white rounded w-3/5 py-5 pl-2">
          {pokemonData.catch_rate}
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
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
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 p-2`}
        >
          Exp. niv.100
        </p>
        <p className="capitalize  bg-white rounded w-3/5 p-2">
          {pokemonData.level_100} exp.
        </p>
      </div>
      <div className="flex gap-0.5 w-full items-center p-1">
        <p
          className={`${
            colorTypes[
              pokemonData.types[0].name.toLowerCase() as keyof typeof colorTypes
            ]
          } font-bold rounded w-2/5 py-4 pl-2`}
        >
          Sexe
        </p>
        <div className="capitalize  bg-white rounded w-3/5 py-1 pl-2 flex flex-col">
          <p className="text-pink-500 flex items-center">
            {pokemonData.sexe === null ? 0 : pokemonData.sexe.female}%
            <Icons.femaleGender className="h-4 w-4" />
          </p>
          <p className="text-blue-500 flex items-center">
            {pokemonData.sexe === null ? 0 : pokemonData.sexe.male}%{" "}
            <Icons.maleGender className="h-4 w-4" />
          </p>
        </div>
      </div>
    </div>
  );
};
