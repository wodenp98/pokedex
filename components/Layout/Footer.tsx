import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="ml-40 mb-2 absolute bottom-0">
      <p className="text-gray-400">
        @Created by <Link href="https://github.com/Wodenp98">Wodenp98</Link>
      </p>
    </div>
  );
};
