import Link from "next/link";
import React from "react";
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
export const PokemonsMoves = ({ moves }: { moves: any }) => {
  console.log("moves", moves);
  return (
    <div className="p-2 " id="moves">
      <div className="text-center font-bold">Other generations:</div>
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((generation) => (
          <GenerationLink key={generation} generation={generation} />
        ))}
      </div>
      <div></div>
    </div>
  );
};
