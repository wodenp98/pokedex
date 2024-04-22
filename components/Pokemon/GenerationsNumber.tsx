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

export const GenerationsNumber = () => {
  return (
    <div id="moves">
      <div className="flex items-center gap-2">
        <p className="font-bold">Génération : </p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((generation) => (
          <GenerationLink key={generation} generation={generation} />
        ))}
      </div>
    </div>
  );
};
