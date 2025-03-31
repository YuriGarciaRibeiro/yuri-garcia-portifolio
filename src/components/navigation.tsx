"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  // Função para realizar o scroll suave
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    const section = document.getElementById(sectionId);
    if (section) {
      // Scroll suave para a seção
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Atualiza a URL com o hash (opcional)
      window.history.pushState({}, '', `#${sectionId}`);
    }
  };

  // Verifica o hash na URL ao carregar a página
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        // Pequeno timeout para garantir que a página esteja totalmente carregada
        setTimeout(() => {
          section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="flex gap-6">
      <Button variant="link" className="text-[#a0a0a0] hover:text-white">
        <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>
          About
        </a>
      </Button>
      
      <Button variant="link" className="text-[#a0a0a0] hover:text-white">
        <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>
          Skills
        </a>
      </Button>
      
      <Button variant="link" className="text-[#a0a0a0] hover:text-white">
        <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')}>
          Projects
        </a>
      </Button>
      
      <Button variant="link" className="text-[#a0a0a0] hover:text-white">
        <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')}>
          Professional Experience
        </a>
      </Button>
      
      <Button variant="link" className="text-[#a0a0a0] hover:text-white">
        <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
          Contact
        </a>
      </Button>
    </div>
  );
}