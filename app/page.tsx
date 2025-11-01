
import About from "./sections/About";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import GitHubActivity from "./sections/GitHubActivity";
import RevealingQuote from "./sections/RevealingQuote";
import Footer from "./sections/Footer";
import BucketList from "./sections/BucketList";


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      

      
      <Hero />
      <About/>
      <RevealingQuote/>
      <TechStack/>
      <GitHubActivity/>
      <BucketList/>
      <Footer/>
      
      
      
    </div>
  );
}