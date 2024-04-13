import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

export const PokemonCt = ({ moves, type }: { moves: any; type: string }) => {
  const movesLearnedWithMachines = moves.filter((move: any) => {
    return move.data.machines.length > 0;
  });

  return (
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
            <TableCell>{move.data.power ? move.data.power : "—"}</TableCell>
            <TableCell>
              {move.data.accuracy ? move.data.accuracy : "—"}
            </TableCell>
            <TableCell>{move.data.pp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
