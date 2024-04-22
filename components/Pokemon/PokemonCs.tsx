import React from "react";
import { colorTypes } from "../colors";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { backgroundColorTypes } from "@/utils/colorsBackground";
import { getVersion } from "@/utils/helpers";

export const PokemonCs = ({
  moves,
  generation,
  type,
}: {
  moves: any;
  generation: string;
  type: string;
}) => {
  const movesLearnedByLevel = moves
    .filter((move: any) => {
      return move.version_group_details.some(
        (detail: any) => detail.level_learned_at !== 0
      );
    })
    .sort((a: any, b: any) => {
      return (
        a.version_group_details[a.version_group_details.length - 1]
          .level_learned_at -
        b.version_group_details[b.version_group_details.length - 1]
          .level_learned_at
      );
    });

  const versions = getVersion(generation);

  const firstLetters = versions.map((version: any) => {
    const splitVersion = version.split("-");
    const firstLetters = splitVersion.map((element: string) =>
      element.charAt(0)
    );
    return firstLetters.join("");
  });
  return (
    <Card
      className={`rounded-lg w-[350px] md:w-[700px] border-0 ${
        backgroundColorTypes[
          type.toLowerCase() as keyof typeof backgroundColorTypes
        ]
      }`}
    >
      <CardContent className="p-1">
        <Table className="rounded-md">
          <TableHeader>
            <TableRow
              className={`${
                colorTypes[type.toLowerCase() as keyof typeof colorTypes]
              } 
              `}
            >
              <TableHead className="text-black font-bold">Nom</TableHead>
              <TableHead className="text-black font-bold">Type</TableHead>
              <TableHead className="text-black font-bold">Catégorie</TableHead>
              <TableHead className="text-black font-bold">Puissance</TableHead>
              <TableHead className="text-black font-bold ">Précision</TableHead>
              <TableHead className="text-black font-bold">PP</TableHead>
              {firstLetters.map((version) => (
                <TableHead
                  className="uppercase text-center font-bold text-black"
                  key={version}
                >
                  {version}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {movesLearnedByLevel.map((move: any) => {
              return (
                <TableRow key={move.move.name}>
                  <TableCell>{move.move.name}</TableCell>
                  <TableCell className="w-16 h-6 p-0.5">
                    <Image
                      src={`/assets/pokemonTypes/${move.data.type.toLowerCase()}.png`}
                      alt={move.data.type}
                      width={100}
                      height={100}
                      quality={100}
                    />
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <Image
                      src={`/assets/pokemonStatus/${move.data.damage_class.name}.png`}
                      alt={move.data.damage_class.name}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    {move.data.power ? move.data.power : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    {move.data.accuracy ? move.data.accuracy : "—"}
                  </TableCell>
                  <TableCell className="text-center">{move.data.pp}</TableCell>
                  {versions.map((version) => {
                    const versionDetails = move.version_group_details.filter(
                      (details: any) => details.version_group.name === version
                    );

                    const levels = versionDetails
                      .map((detail: any) => detail.level_learned_at)
                      .join(" - ");
                    return (
                      <TableCell key={version} className="text-center">
                        {levels || "N/A"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
