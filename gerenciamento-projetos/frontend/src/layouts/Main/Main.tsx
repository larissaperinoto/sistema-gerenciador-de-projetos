import { ReactNode } from "react";
import { Header } from "../../components/Header/Header";
import "./Main.css";

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
