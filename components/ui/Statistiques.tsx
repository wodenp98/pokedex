import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Statistiques = (stats: any) => {
  return (
    <Table className="w-[350px] text-xs">
      <TableHeader>
        <TableRow>
          <TableHead>Statistique</TableHead>
          <TableHead>Statistique de base</TableHead>
          <TableHead>Min (lvl100)</TableHead>
          <TableHead className="text-right">Max (lvl100)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats.stats.map((stats: any) => (
          <TableRow key={stats.stat.frenchName}>
            <TableCell className="font-medium">
              {stats.stat.frenchName}
            </TableCell>
            <TableCell>{stats.base_stat}</TableCell>
            <TableCell>{stats.minStat}</TableCell>
            <TableCell className="text-right">{stats.maxStat}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
