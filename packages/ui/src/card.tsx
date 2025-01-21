import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6  text-white bg-black rounded-xl bg-[#ededed]"
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <p className="text-white">{children}</p>
    </div>
  );
}
