import type { Route } from "./+types/home";
import TwoStepAuthCode from "~/forms/auth/TwoStepAuthCode";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className={"centeredWrapper"}>
      <TwoStepAuthCode/>
    </div>
  );
}
