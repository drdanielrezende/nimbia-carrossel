"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface NotesPanelProps {
  carouselId: string;
}

export function NotesPanel({ carouselId }: NotesPanelProps) {
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  // Carregar notas do localStorage quando montar o componente
  useEffect(() => {
    const savedNotes = localStorage.getItem(`carousel-notes-${carouselId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [carouselId]);

  // Salvar no localStorage sempre que mudar
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNotes(val);
    localStorage.setItem(`carousel-notes-${carouselId}`, val);
  };

  const handleCopy = useCallback(() => {
    if (!notes.trim()) return;
    
    // Adicionar um contexto básico para o Agente entender facilmente do que se trata
    const textToCopy = `Anotações para o Carrossel (ID: ${carouselId}):\n\n${notes}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [notes, carouselId]);

  return (
    <div className="h-full flex flex-col bg-surface">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-sm font-semibold">Anotações para o Agente</h2>
          <p className="text-xs text-muted-foreground">
            Rascunhe as edições e copie para o Agente
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 overflow-hidden relative gap-4">
        <textarea
          className="flex-1 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Ex:&#10;- Slide 1: Mudar a palavra X para Y.&#10;- Slide 3: Trocar a imagem por uma de estetoscópio..."
          value={notes}
          onChange={handleNotesChange}
        />
        
        <div className="flex justify-end shrink-0">
          <button
            onClick={handleCopy}
            disabled={!notes.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-md hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copiado!" : "Copiar para o Agente"}
          </button>
        </div>
      </div>
    </div>
  );
}
