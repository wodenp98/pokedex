import Link from "next/link";
import React from "react";
function GenerationLink({ generation }: { generation: number }) {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const romanNumeral = romanNumerals[generation - 1];

  return (
    <>
      <Link className="block" href={`?generation=${generation}#moves`}>
        {romanNumeral}
      </Link>
      {generation !== 8 && <span>-</span>}
    </>
  );
}
export const PokemonsMoves = () => {
  return (
    <div className="p-2" id="moves">
      <div className="text-center font-bold">Other generations:</div>
      <div className="flex justify-center space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((generation) => (
          <GenerationLink key={generation} generation={generation} />
        ))}
      </div>
      {/* <PokemonsMoves generation={generation} /> */}
    </div>
  );
};
