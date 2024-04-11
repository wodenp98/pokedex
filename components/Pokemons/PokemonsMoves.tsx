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
import { getFrenchName, getVersion } from "@/utils/helpers";
import { version } from "os";

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

export const PokemonsMoves = async ({
  moves,
  generation,
}: {
  moves: any;
  generation: string;
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

  // const movesWithLevels = movesLearnedByLevel.map((move) => {
  //   const levelsByVersion = move.version_group_details.reduce((acc, detail) => {
  //     console.log("detail", detail);
  //     acc[detail.version_group.name] = detail.level_learned_at;
  //     return acc;
  //   }, {});
  //   return { move, levelsByVersion };
  // });

  // console.log("moves", movesWithLevels);

  const firstLetters = versions.map((version: any) => {
    const splitVersion = version.split("-");
    const firstLetters = splitVersion.map((element: string) =>
      element.charAt(0)
    );
    return firstLetters.join("");
  });

  const movesLearnedWithMachines = moves.filter((move: any) => {
    return move.data.machines.length > 0;
  });

  return (
    <div className="p-2 " id="moves">
      <div className="text-center font-bold">Other generations:</div>
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((generation) => (
          <GenerationLink key={generation} generation={generation} />
        ))}
      </div>
      <div>
        <h1>Capacités apprises</h1>
        <Tabs defaultValue="level" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="level">Par montée en niveau</TabsTrigger>
            <TabsTrigger value="machines">Par CT / CS</TabsTrigger>
          </TabsList>
          <TabsContent value="level">
            <Table className="w-[350px] text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Puissance</TableHead>
                  <TableHead>Précision</TableHead>
                  <TableHead>PP</TableHead>
                  {firstLetters.map((version) => (
                    <TableHead className="uppercase" key={version}>
                      {version}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {movesLearnedByLevel.map((move: any) => {
                  return (
                    <TableRow key={move.move.name}>
                      <TableCell>{move.move.name}</TableCell>
                      <TableCell>{move.data.type.name}</TableCell>
                      <TableCell>{move.data.damage_class.name}</TableCell>
                      <TableCell>{move.data.power}</TableCell>
                      <TableCell>{move.data.accuracy}</TableCell>
                      <TableCell>{move.data.pp}</TableCell>
                      {versions.map((version) => {
                        // Find the details for this version
                        const versionDetails =
                          move.version_group_details.filter(
                            (details: any) =>
                              details.version_group.name === version
                          );

                        const levels = versionDetails
                          .map((detail: any) => detail.level_learned_at)
                          .join(", ");
                        // If details exist, return the level learned at. Otherwise, return a placeholder
                        return (
                          <TableCell key={version}>{levels || "N/A"}</TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="machines">
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
                {movesLearnedWithMachines.map((move: any) => (
                  <TableRow key={move.data.id}>
                    <TableCell>{move.data.machines.name}</TableCell>
                    <TableCell>{move.data.name}</TableCell>
                    <TableCell>{move.data.type.name}</TableCell>
                    <TableCell>{move.data.damage_class.name}</TableCell>
                    <TableCell>{move.data.power}</TableCell>
                    <TableCell>{move.data.accuracy}</TableCell>
                    <TableCell>{move.data.pp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
