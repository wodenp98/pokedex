import React from "react";
import Link from "next/link";
import { center } from "~/styled-system/patterns";
import { css } from "~/styled-system/css";

export const Footer = () => {
  return (
    <div className={css({ ml: "40", my: "8" })}>
      <p className={css({ color: "gray.9" })}>
        @Created by <Link href="https://github.com/Wodenp98">Wodenp98</Link>
      </p>
    </div>
  );
};
