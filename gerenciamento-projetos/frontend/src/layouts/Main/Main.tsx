import { ReactNode } from "react";
import "./Main.css";

type MainProps = {
  content: ReactNode;
};

export function Main({ content }: MainProps) {
  return <main>{content}</main>;
}
