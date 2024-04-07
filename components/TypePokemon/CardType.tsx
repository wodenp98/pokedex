import { getFrenchFirstType, getFrenchSecondType } from "@/utils/helpers";
import React from "react";
import { colorTypes } from "@/utils/helpers";

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
