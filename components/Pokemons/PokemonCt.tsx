import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { backgroundColorTypes, colorTypes } from "@/utils/helpers";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export const PokemonCt = ({ moves, type }: { moves: any; type: string }) => {
  const movesLearnedWithMachines = moves
    .filter((move: any) => {
      return move.data.machines.length > 0;
    })
    .sort((a: any, b: any) => {
      if (a.data.machines.name < b.data.machines.name) return -1;
      if (a.data.machines.name > b.data.machines.name) return 1;
      return 0;
    });

  return (
    <Card
      className={`rounded-lg border-0 ${
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
            {movesLearnedWithMachines.map((move: any) => (
              <TableRow key={move.data.id}>
                <TableCell className="text-center">
                  {move.data.machines.name}
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
