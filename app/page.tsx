
import About from "./sections/About";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import CurvedLoopImpl from "./sections/CurvedLoopImpl";
import GitHubActivity from "./sections/GitHubActivity";
import RevealingQuote from "./sections/RevealingQuote";


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      

      
      <Hero />
      <About/>
      <RevealingQuote/>
      <TechStack/>
      <CurvedLoopImpl/>
      <GitHubActivity/>
      
      
      
    </div>
  );
}