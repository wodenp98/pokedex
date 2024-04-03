// import { colorTypes } from "@/utils/helpers";
import { getFrenchFirstType, getFrenchSecondType } from "@/utils/helpers";
import React from "react";

const colorTypes = {
  feu: "bg-[#E72324]",
  eau: "bg-[#2481EF]",
  plante: "bg-[#3da224]",
  électrik: "bg-[#FAC100]",
  sol: "bg-[#92501B]",
  roche: "bg-[#b0aa82]",
  fée: "bg-[#EF70EF]",
  poison: "bg-[#923FCC]",
  insecte: "bg-[#92A212]",
  dragon: "bg-[#4F60E2]",
  psy: "bg-[#ef3f7a]",
  vol: "bg-[#82BAEF]",
  combat: "bg-[#FF8100]",
  normal: "bg-[#A0A2A0]",
  spectre: "bg-[#703F70]",
  glace: "bg-[#3DD9FF]",
  ténèbres: "bg-[#4F3F3D]",
  acier: "bg-[#60A2B9]",
};

export const CardType = async ({
  firstTypeUrl,
  secondTypeUrl,
  name,
  id,
}: any) => {
  const firstTypeFrench = await getFrenchFirstType(firstTypeUrl);
  const secondTypeFrench = await getFrenchSecondType(secondTypeUrl);

  return (
    <div className="flex gap-1 h-8">
      <div
        className={`rounded-md w-1/3 font-bold flex justify-center items-center ${
          colorTypes[
            secondTypeFrench.name.toLowerCase() as keyof typeof colorTypes
          ]
        }`}
      >
        N°{String(id).padStart(4, "0")}
      </div>
      <div
        className={`rounded-md capitalize w-2/3 font-bold flex justify-center items-center ${
          colorTypes[
            firstTypeFrench.name.toLowerCase() as keyof typeof colorTypes
          ]
        }`}
      >
        {name}
      </div>
    </div>
  );
};
