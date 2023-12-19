import { ReactNode } from "react";

type NodeHorizonLineProps = {
  children: ReactNode;
};

export function NodeHorizonLine(props: NodeHorizonLineProps) {
  return (
    <div className="flex items-center mb-6">
      <span className="border-b border-slate-300 grow mx-6"></span>
      {props.children}
      <span className="border-b border-slate-300 grow mx-6"></span>
    </div>
  );
}
