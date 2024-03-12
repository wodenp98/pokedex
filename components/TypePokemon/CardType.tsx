import React from "react";
import { colorTypes } from "@/utils/helpers";

export const CardType = ({ typeId, typeName, name, id }: any) => {
  return (
    <div className="flex gap-1">
      <div
        className={`rounded-md ${
          colorTypes[typeId as keyof typeof colorTypes]
        }`}
      >
        N°{String(id).padStart(4, "0")}
      </div>
      <div
        className={`rounded-md capitalize ${
          colorTypes[typeName as keyof typeof colorTypes]
        }`}
      >
        {name}
      </div>
    </div>
  );
};
