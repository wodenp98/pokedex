import Link from "next/link";
import React from "react";
export const PokemonsMoves = () => {
  return (
    <div className="p-2">
      <div className="text-center font-bold">Other generations:</div>
      <div className="flex justify-center space-x-1">
        <Link className="block" href={`?generation=${1}#moves`}>
          <p id="moves">I</p>
        </Link>
        <span>-</span>
        <Link className="block" href="#">
          II
        </Link>
        <span>-</span>
        <Link className="block" href="#">
          III
        </Link>
        <span>-</span>
        <Link className="block" href="#">
          IV
        </Link>
        <span>-</span>
        <Link className="block" href="#">
          V
        </Link>
        <span>-</span>
        <Link className="block" href="#">
          VI
        </Link>
        <span>-</span>
        <Link className="block" href="#">
          VII
        </Link>
        <span>-</span>
        <Link className="block" href="#">
          VIII
        </Link>
      </div>
      {/* <PokemonsMoves generation={generation} /> */}
    </div>
  );
};
