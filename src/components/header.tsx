import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

const navItems = [
  { nane: "Home", href: "#home" },
  { name: "Five Day Forecast", href: "#forecast" },
  { name: "Polution", href: "#polution" },
  { name: "Time Machine", href: "#timemachine" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300 bg-panel/80",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between min-h-[60px]">
        <a
          href="#home"
          className="text-2xl font-bold text-primary flex items-center"
        >
          <a className="relative z-10">
            Weather<span>4U</span>
          </a>
        </a>
        <div className=" md:flex space-x-8">
          {navItems.map((item, key) => (
            <a
              href={item.href}
              key={key}
              className="text-primary text-xl hover:text-purple-950 transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
