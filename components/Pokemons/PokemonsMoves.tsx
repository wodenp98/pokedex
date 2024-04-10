import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  // const movesLearnedWithMachines = moves.filter(
  //   (move: any) => move.data.machines.length > 0
  // );

  // console.log(moves);

  return (
    <div className="p-2 " id="moves">
      <div className="text-center font-bold">Other generations:</div>
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((generation) => (
          <GenerationLink key={generation} generation={generation} />
        ))}
      </div>
      <div>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Table className="w-[350px] text-xs">
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
                {/* {moves.map((move: any) => (
                  <TableRow key={move.move.name}>
                    <TableCell></TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
