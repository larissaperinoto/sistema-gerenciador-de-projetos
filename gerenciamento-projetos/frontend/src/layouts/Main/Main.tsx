import { ReactNode } from "react";
import "./Main.css";
import { Header } from "../../components/Header/Header";

type MainProps = {
  content: ReactNode;
};

export function Main({ content }: MainProps) {
  return (
    <main>
      <Header />
      {content}
    </main>
  );
}
