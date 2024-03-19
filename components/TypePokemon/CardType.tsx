import { colorTypes } from "@/utils/helpers";
import React from "react";

async function getFrenchFirstType(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  const nameFrench = data.names.find(
    (name: any) => name.language.name === "fr"
  );

  return nameFrench;
}

async function getFrenchSecondType(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  const nameFrench = data.names.find(
    (name: any) => name.language.name === "fr"
  );

  return nameFrench;
}

export const CardType = async ({
  firstTypeUrl,
  secondTypeUrl,
  name,
  id,
}: any) => {
  const firstTypeFrench = await getFrenchFirstType(firstTypeUrl);
  const secondTypeFrench = await getFrenchSecondType(secondTypeUrl);

  return (
    <div className="flex gap-1">
      <div
        className={`rounded-md ${
          colorTypes[
            secondTypeFrench.name.toLowerCase() as keyof typeof colorTypes
          ]
        }`}
      >
        N°{String(id).padStart(4, "0")}
      </div>
      <div
        className={`rounded-md capitalize ${
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
