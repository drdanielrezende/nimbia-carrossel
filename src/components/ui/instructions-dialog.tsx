"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { MessageSquare, Edit3, Send, X, HelpCircle } from "lucide-react";
import { Button } from "./button";

interface InstructionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InstructionsDialog({ open, onOpenChange }: InstructionsDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay data-oc-overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          data-oc-dialog
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface border border-border p-6 shadow-2xl overflow-hidden focus:outline-none"
        >
          {/* Subtle backgrounds */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-6 relative">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                <HelpCircle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <Dialog.Title className="text-base font-bold tracking-tight">
                  Como criar seus carrosséis?
                </Dialog.Title>
                <Dialog.Description className="text-xs text-muted-foreground">
                  Aprenda a colaborar com seu assistente de IA em 3 passos
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

          <div className="space-y-6 relative my-2">
            {/* Step 1 */}
            <div className="flex gap-4 items-start group">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300">
                <MessageSquare className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-muted font-mono font-bold text-muted-foreground border border-border group-hover:border-accent/20 group-hover:text-accent transition-colors">1</span>
                  Peça ao Assistente no Chat
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Diga o que você precisa diretamente no chat de conversa do seu assistente de IA (ex: <span className="italic text-foreground/80 bg-muted/50 px-1 py-0.5 rounded">&quot;Crie um carrossel sobre prevenção de infarto&quot;</span>). Ele gerará a estrutura e os slides para você.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start group">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300">
                <Edit3 className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-muted font-mono font-bold text-muted-foreground border border-border group-hover:border-accent/20 group-hover:text-accent transition-colors">2</span>
                  Revise e Rascunhe Notas
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Abra o carrossel recém-criado na lista de painéis. À esquerda do visualizador, use a aba <strong className="text-foreground/90 font-semibold">&quot;Anotações para o Agente&quot;</strong> para descrever o que deseja mudar em cada slide.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-start group">
              <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300">
                <Send className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-muted font-mono font-bold text-muted-foreground border border-border group-hover:border-accent/20 group-hover:text-accent transition-colors">3</span>
                  Envie as Notas de Volta ao Chat
                </h4>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Clique no botão <strong className="text-foreground/90 font-semibold">&quot;Copiar para o Agente&quot;</strong> para copiar a formatação. Cole as anotações no chat e envie. O assistente de IA atualizará a visualização em tempo real!
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-8 border-t border-border pt-4">
            <Dialog.Close asChild>
              <Button variant="accent" size="sm" className="px-5 cursor-pointer">
                Entendi
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
