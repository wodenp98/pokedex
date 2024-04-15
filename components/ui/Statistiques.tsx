import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "./card";
import { backgroundColorTypes, colorTypes } from "@/utils/helpers";

export const Statistiques = ({ stats, type }: { stats: any; type: any }) => {
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
              <TableHead className="font-bold text-black">
                Statistique
              </TableHead>
              <TableHead className="font-bold text-black">
                Statistique de base
              </TableHead>
              <TableHead className="font-bold text-black">
                Min (lvl100)
              </TableHead>
              <TableHead className="font-bold text-black">
                Max (lvl100)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((stats: any) => (
              <TableRow key={stats.stat.frenchName}>
                <TableCell className="font-medium bg-white">
                  {stats.stat.frenchName}
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
