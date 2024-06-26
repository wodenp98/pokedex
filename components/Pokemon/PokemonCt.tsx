import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { backgroundColorTypes } from "@/utils/colorsBackground";
import { colorTypes } from "../colors";
import { Move } from "@/utils/type";

export const PokemonCt = ({ moves, type }: { moves: Move[]; type: string }) => {
  const movesLearnedWithMachines = moves
    .filter((move) => {
      return move.data.machines.length > 0;
    })
    .sort((a, b) => {
      if (a.data.machines[0].name < b.data.machines[0].name) return -1;
      if (a.data.machines[0].name > b.data.machines[0].name) return 1;
      return 0;
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
              <TableHead className="text-black font-bold">Numéro</TableHead>
              <TableHead className="text-black font-bold">Capacité</TableHead>
              <TableHead className="text-black font-bold">Type</TableHead>
              <TableHead className="text-black font-bold">Catégorie</TableHead>
              <TableHead className="text-black font-bold">Puissance</TableHead>
              <TableHead className="text-black font-bold">Précision</TableHead>
              <TableHead className="text-black font-bold">PP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {movesLearnedWithMachines.map((move) => (
              <TableRow key={move.data.id}>
                <TableCell className="text-center">
                  {move.data.machines[0].name}
                </TableCell>
                <TableCell className="text-center">{move.move.name}</TableCell>
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
                <TableCell className="text-center ">
                  {move.data.power ? move.data.power : "—"}
                </TableCell>
                <TableCell className="text-center ">
                  {move.data.accuracy ? move.data.accuracy : "—"}
                </TableCell>
                <TableCell className="text-center ">{move.data.pp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
