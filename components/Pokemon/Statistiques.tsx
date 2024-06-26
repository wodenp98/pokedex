import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { backgroundColorTypes } from "@/utils/colorsBackground";
import { colorTypes } from "../colors";
import { StatsArray } from "@/utils/type";

export const Statistiques = ({
  stats,
  type,
}: {
  stats: StatsArray[];
  type: string;
}) => {
  return (
    <Card
      className={`rounded-lg w-[350px] md:w-[500px] border-0 ${
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
              <TableHead className="font-bold  text-black">
                Statistique
              </TableHead>
              <TableHead className="font-bold text-center text-black">
                Statistique de base
              </TableHead>
              <TableHead className="font-bold text-center text-black">
                Min (lvl100)
              </TableHead>
              <TableHead className="font-bold text-center text-black">
                Max (lvl100)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stats) => (
              <TableRow key={stats.name}>
                <TableCell className="font-medium bg-white">
                  {stats.name}
                </TableCell>
                <TableCell className="text-center bg-white">
                  {stats.base_stat}
                </TableCell>
                <TableCell className="text-center bg-white ">
                  {stats.minStat}
                </TableCell>
                <TableCell className="text-center bg-white ">
                  {stats.maxStat}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
