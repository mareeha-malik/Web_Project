import { Main } from "next/document";
import Hero from "./Components/ui/Hero";
import Products from "./Components/ui/Products";
import Testimonial from "./Components/ui/Testimonial";
import Footer from "./Components/ui/Footer";
import Mob_Nav from "./Components/ui/Mob_Nav";

export default function Home() {
  return(
    <main>
      <Hero/>
      <Products/>
      <Testimonial/>
      <Mob_Nav/>
    </main>
  );
  }
