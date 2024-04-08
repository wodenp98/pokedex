import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFrenchName } from "@/utils/helpers";

function GenerationLink({ generation }: { generation: number }) {
  const romanNumerals = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  const romanNumeral = romanNumerals[generation - 1];

  return (
    <>
      <Link className="block" href={`?generation=${generation}#moves`}>
        {romanNumeral}
      </Link>
      {generation !== 9 && <span>-</span>}
    </>
  );
}

export const PokemonsMoves = async ({ moves }: { moves: any }) => {
  // moves.map((move: any) => {
  //   console.log("❤️", move);
  // });
  return (
    <div className="p-2 " id="moves">
      <div className="text-center font-bold">Other generations:</div>
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((generation) => (
          <GenerationLink key={generation} generation={generation} />
        ))}
      </div>
      <div>
        {/* <Table className="w-[350px] text-xs">
          <TableHeader>
            <TableRow>
              <TableHead>Numéro</TableHead>
              <TableHead>Capacité</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Puissance</TableHead>
              <TableHead>Précision</TableHead>
              <TableHead>PP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {moves.map((move: any) => (
              <TableRow key={move}>
                <TableCell>{move}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </div>
    </div>
  );
};
