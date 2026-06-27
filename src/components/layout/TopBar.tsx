"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  editable?: boolean;
  onTitleChange?: (newTitle: string) => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
}

export function TopBar({
  title,
  showBack,
  editable,
  onTitleChange,
  onSettingsClick,
  onHelpClick,
}: TopBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [logoError, setLogoError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLogoError(false);
    img.onerror = () => setLogoError(true);
    img.src = "/uploads/nimbia-logo.png";
  }, []);

  const startEditing = () => {
    setEditValue(title || "");
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== title) {
      onTitleChange?.(trimmed);
    } else {
      setEditValue(title || "");
    }
    setIsEditing(false);
  };

  return (
    <header className="h-14 border-b border-border bg-surface flex items-center px-4 gap-3 shrink-0">
      {showBack && (
        <Link href="/">
          <Button variant="ghost" size="icon" aria-label="Voltar ao painel">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      )}
      <div className="flex items-center gap-2 min-w-0">
        {/* Logo — maior e clicável para nimbia.com.br */}
        <a
          href="https://nimbia.com.br"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nimbia — abrir site"
          className="shrink-0 opacity-90 hover:opacity-100 transition-opacity"
        >
          {logoError ? (
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-accent to-rose-600 bg-clip-text text-transparent flex items-center gap-1.5 select-none">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Nimbia
            </span>
          ) : (
            <img
              src="/uploads/nimbia-logo.png"
              alt="Nimbia"
              className="h-9 object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </a>

        {/* Separator when there's a page title */}
        {title && (
          <span className="text-border select-none">|</span>
        )}

        {isEditing && editable ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") {
                setEditValue(title || "");
                setIsEditing(false);
              }
            }}
            className="font-semibold text-sm bg-transparent border-b-2 border-accent outline-none py-0.5 min-w-[120px]"
          />
        ) : title ? (
          <span
            className={`font-semibold text-sm truncate ${editable ? "cursor-pointer hover:text-accent transition-colors" : ""}`}
            onClick={() => editable && startEditing()}
            title={editable ? "Clique para renomear" : undefined}
          >
            {title}
          </span>
        ) : null}
      </div>

      <div className="flex-1" />

      {/* Right-side actions */}
      <div className="flex items-center gap-1">
        {onSettingsClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            aria-label="Configurações"
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onHelpClick}
          aria-label="Sobre / Ajuda"
          title="Sobre"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
