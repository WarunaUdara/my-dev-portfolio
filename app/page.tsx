import { Curve } from "ogl";
import About from "./sections/About";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import CurvedLoopImpl from "./sections/CurvedLoopImpl";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      

      
      <Hero />
      <About/>
      <TechStack/>
      <CurvedLoopImpl/>
      
      
    </div>
  );
}