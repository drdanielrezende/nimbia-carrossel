"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Globe, X } from "lucide-react";
import { Button } from "./button";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay data-oc-overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          data-oc-dialog
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface border border-border p-6 shadow-2xl overflow-hidden focus:outline-none"
        >
          {/* Subtle backgrounds */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6 relative">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center border border-border shrink-0 bg-surface">
                <img
                  src="/uploads/nimbia-avatar.png"
                  alt="Nimbia Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <Dialog.Title className="text-base font-bold tracking-tight">
                  Sobre a Nimbia
                </Dialog.Title>
                <Dialog.Description className="text-xs text-muted-foreground">
                  Tecnologia e IA de médico para médico
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none cursor-pointer"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground relative my-2">
            <p>
              A proposta da Nimbia não é tratar tecnologia como promessa mágica. É construir repertório: entender o suficiente para escolher melhor, testar com segurança e levar para a rotina do consultório somente o que faz sentido.
            </p>
            <p>
              Construída a partir da experiência prática do <strong>Dr. Daniel Rezende</strong> (médico ortopedista), a Nimbia traduz a tecnologia e a Inteligência Artificial para profissionais de saúde que buscam clareza, segurança e autonomia.
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-border relative">
            <a
              href="https://nimbia.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="accent" className="w-full justify-center gap-2 cursor-pointer">
                <Globe className="h-4 w-4" />
                Conhecer Nimbia (nimbia.com.br)
              </Button>
            </a>
            
            <a
              href="https://instagram.com/nimbia.med"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="outline" className="w-full justify-center gap-2 cursor-pointer">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Seguir no Instagram (@nimbia.med)
              </Button>
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
