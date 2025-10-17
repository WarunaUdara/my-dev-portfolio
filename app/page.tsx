import About from "./sections/About";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      

      
      <Hero />
      <About/>
      <TechStack/>
      
    </div>
  );
}