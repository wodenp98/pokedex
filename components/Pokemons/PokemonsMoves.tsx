import Link from "next/link";
import React from "react";
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
import {
  backgroundColorTypes,
  colorTypes,
  getFrenchFirstType,
  getFrenchName,
  getVersion,
} from "@/utils/helpers";
import Image from "next/image";

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
      <Link
        className="block text-lg font-normal"
        href={`?generation=${generation}#moves`}
      >
        {romanNumeral}
      </Link>
      {generation !== 9 && <span>-</span>}
    </>
  );
}

export const PokemonsMoves = async ({
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

  const movesLearnedWithMachines = moves.filter((move: any) => {
    return move.data.machines.length > 0;
  });

  return (
    <Card
      className={`flex flex-col items-center justify-center rounded-lg border p-1 text-card-foreground shadow-sm ${
        backgroundColorTypes[
          type.toLowerCase() as keyof typeof backgroundColorTypes
        ]
      }`}
      id="moves"
    >
      <CardContent>
        <Tabs
          defaultValue="level"
          className="flex items-center justify-center flex-col"
        >
          <TabsList className="">
            <TabsTrigger value="level">Par montée en niveau</TabsTrigger>
            <TabsTrigger value="machines" className={`disabled:bg-black`}>
              Par CT / CS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="level">
            <Table
              className={` ${
                colorTypes[type.toLowerCase() as keyof typeof colorTypes]
              } `}
            >
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Nom</TableHead>
                  <TableHead className="text-black">Type</TableHead>
                  <TableHead className="text-black">Catégorie</TableHead>
                  <TableHead className="text-black">Puissance</TableHead>
                  <TableHead className="text-black">Précision</TableHead>
                  <TableHead className="text-black">PP</TableHead>
                  {firstLetters.map((version) => (
                    <TableHead
                      className="uppercase text-center text-black"
                      key={version}
                    >
                      {version}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {movesLearnedByLevel.map(async (move: any) => {
                  const moveName = await getFrenchFirstType(move.data.type.url);
                  return (
                    <TableRow key={move.move.name}>
                      <TableCell>{move.move.name}</TableCell>
                      <TableCell className="w-16 h-6 p-0.5">
                        <Image
                          src={`/assets/pokemonTypes/${moveName.name.toLowerCase()}.png`}
                          alt={moveName.name}
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
                      <TableCell className="text-center">
                        {move.data.pp}
                      </TableCell>
                      {versions.map((version) => {
                        const versionDetails =
                          move.version_group_details.filter(
                            (details: any) =>
                              details.version_group.name === version
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
          </TabsContent>
          <TabsContent value="machines">
            <Table className="">
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
                    <TableCell>{move.move.name}</TableCell>
                    <TableCell>{move.data.type.name}</TableCell>
                    <TableCell>{move.data.damage_class.name}</TableCell>
                    <TableCell>
                      {move.data.power ? move.data.power : "—"}
                    </TableCell>
                    <TableCell>
                      {move.data.accuracy ? move.data.accuracy : "—"}
                    </TableCell>
                    <TableCell>{move.data.pp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="p-0 w-full flex justify-end pr-4">
        <div className="flex items-center gap-2">
          <p className="font-bold">Génération : </p>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((generation) => (
            <GenerationLink key={generation} generation={generation} />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};
