"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Palette,
  X,
  Users,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColorPicker } from "./ColorPicker";
import { FontSelector } from "./FontSelector";
import { LogoUpload } from "./LogoUpload";
import type { BrandConfig } from "@/types/brand";
import { DEFAULT_BRAND } from "@/types/brand";

interface BrandSetupProps {
  open: boolean;
  onComplete: () => void;
  initialBrand?: BrandConfig;
}

const STYLE_OPTIONS = [
  "minimalista",
  "ousado",
  "divertido",
  "corporativo",
  "luxo",
  "vintage",
  "moderno",
  "elegante",
  "criativo",
  "profissional",
];

const AUDIENCE_SUGGESTIONS = [
  "Pacientes leigos curiosos sobre saúde",
  "Profissionais de saúde e médicos",
  "Pacientes com doenças crônicas",
  "Pais e mães preocupados com a família",
  "Jovens adultos interessados em bem-estar",
  "Idosos e cuidadores",
];

const TONE_OPTIONS = [
  {
    key: "educativo",
    emoji: "🎓",
    label: "Educativo",
    description: "Explica de forma clara e didática",
  },
  {
    key: "empático",
    emoji: "🤝",
    label: "Empático",
    description: "Acolhedor, humano e próximo do paciente",
  },
  {
    key: "profissional",
    emoji: "💼",
    label: "Profissional",
    description: "Técnico, preciso e confiável",
  },
  {
    key: "descontraído",
    emoji: "😄",
    label: "Descontraído",
    description: "Leve e bem-humorado sem perder seriedade",
  },
  {
    key: "científico",
    emoji: "🔬",
    label: "Científico",
    description: "Baseado em evidências e dados",
  },
  {
    key: "inspirador",
    emoji: "💡",
    label: "Inspirador",
    description: "Motiva e engaja a audiência",
  },
];

const STEPS = [
  "Nome da Marca",
  "Público-Alvo",
  "Tom de Voz",
  "Cores",
  "Fontes",
  "Foto de Perfil",
  "Logo",
  "Estilo Visual",
];

export function BrandSetup({ open, onComplete, initialBrand }: BrandSetupProps) {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState<BrandConfig>(
    initialBrand || DEFAULT_BRAND
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialBrand) setBrand(initialBrand);
  }, [initialBrand]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      await fetch("/api/brand", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brand),
      });
      onComplete();
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }, [brand, onComplete]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onComplete();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onComplete]);

  const toggleTone = (key: string) => {
    const tones = brand.toneOfVoice || [];
    const updated = tones.includes(key)
      ? tones.filter((t) => t !== key)
      : [...tones, key];
    setBrand({ ...brand, toneOfVoice: updated });
  };

  if (!open) return null;

  return (
    <div
      className="oc-fade fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onComplete(); }}
    >
      <div className="oc-enter-pop bg-surface rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              {step === 1 ? (
                <Users className="h-5 w-5 text-accent" />
              ) : step === 2 ? (
                <MessageSquare className="h-5 w-5 text-accent" />
              ) : (
                <Palette className="h-5 w-5 text-accent" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold">Configure Sua Marca</h2>
              <p className="text-xs text-muted-foreground">
                Passo {step + 1} de {STEPS.length}: {STEPS[step]}
              </p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="flex gap-1 mt-4">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 min-h-[280px]">
          {/* Step 0 — Nome da Marca */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Qual é o seu nome completo?
                </label>
                <Input
                  value={brand.name}
                  onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                  placeholder="Dr. João Silva"
                  className="mt-2 text-lg h-12"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm font-medium">Especialidade</label>
                <Input
                  value={brand.specialty || ""}
                  onChange={(e) => setBrand({ ...brand, specialty: e.target.value })}
                  placeholder="Cardiologista, Dermatologista..."
                  className="mt-2 h-10"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  @ Instagram / TikTok
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">@</span>
                  <Input
                    value={(brand.handle || "").replace(/^@/, "")}
                    onChange={(e) =>
                      setBrand({ ...brand, handle: "@" + e.target.value.replace(/^@/, "") })
                    }
                    placeholder="drjoaosilva"
                    className="pl-7 h-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Aparece nos slides do formato Twitter e Microblog
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">CRM</label>
                  <Input
                    value={brand.crm || ""}
                    onChange={(e) => setBrand({ ...brand, crm: e.target.value })}
                    placeholder="12345/SP"
                    className="mt-2 h-10"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">RQE <span className="text-muted-foreground">(opcional)</span></label>
                  <Input
                    value={brand.rqe || ""}
                    onChange={(e) => setBrand({ ...brand, rqe: e.target.value })}
                    placeholder="12345"
                    className="mt-2 h-10"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Esses dados são obrigatórios pelo CFM e serão incluídos nas legendas de todos os posts.
              </p>
            </div>
          )}

          {/* Step 1 — Público-Alvo */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Para quem você cria conteúdo?
                </label>
                <p className="text-xs text-muted-foreground mt-1 mb-2">
                  Descreva seu público ou clique em uma sugestão abaixo
                </p>
                <textarea
                  value={brand.targetAudience || ""}
                  onChange={(e) =>
                    setBrand({ ...brand, targetAudience: e.target.value })
                  }
                  placeholder="Ex: Pacientes com dor crônica acima de 40 anos que buscam informações sobre tratamentos menos invasivos"
                  className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Sugestões rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {AUDIENCE_SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      onClick={() =>
                        setBrand({ ...brand, targetAudience: sug })
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                        brand.targetAudience === sug
                          ? "bg-accent text-accent-foreground border-accent"
                          : "bg-transparent text-foreground border-border hover:border-muted-foreground"
                      }`}
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Tom de Voz */}
          {step === 2 && (
            <div>
              <label className="text-sm font-medium">
                Qual é o tom de voz dos seus posts?
              </label>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                Selecione um ou mais que combinam com você
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TONE_OPTIONS.map((tone) => {
                  const selected = (brand.toneOfVoice || []).includes(tone.key);
                  return (
                    <button
                      key={tone.key}
                      onClick={() => toggleTone(tone.key)}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                        selected
                          ? "border-accent bg-accent/8 shadow-sm"
                          : "border-border hover:border-muted-foreground bg-transparent"
                      }`}
                    >
                      <span className="text-xl leading-none mt-0.5">{tone.emoji}</span>
                      <div>
                        <p className={`text-sm font-semibold ${selected ? "text-accent" : ""}`}>
                          {tone.label}
                        </p>
                        <p className="text-xs text-muted-foreground leading-snug">
                          {tone.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3 — Cores */}
          {step === 3 && (
            <div className="space-y-3">
              <ColorPicker
                label="Primária"
                value={brand.colors.primary}
                onChange={(v) =>
                  setBrand({ ...brand, colors: { ...brand.colors, primary: v } })
                }
              />
              <ColorPicker
                label="Secundária"
                value={brand.colors.secondary}
                onChange={(v) =>
                  setBrand({ ...brand, colors: { ...brand.colors, secondary: v } })
                }
              />
              <ColorPicker
                label="Destaque"
                value={brand.colors.accent}
                onChange={(v) =>
                  setBrand({ ...brand, colors: { ...brand.colors, accent: v } })
                }
              />
              <ColorPicker
                label="Fundo"
                value={brand.colors.background}
                onChange={(v) =>
                  setBrand({ ...brand, colors: { ...brand.colors, background: v } })
                }
              />
              <ColorPicker
                label="Superfície"
                value={brand.colors.surface}
                onChange={(v) =>
                  setBrand({ ...brand, colors: { ...brand.colors, surface: v } })
                }
              />
            </div>
          )}

          {/* Step 4 — Fontes */}
          {step === 4 && (
            <div className="space-y-4">
              <FontSelector
                label="Fonte de Título"
                value={brand.fonts.heading}
                onChange={(v) =>
                  setBrand({ ...brand, fonts: { ...brand.fonts, heading: v } })
                }
              />
              <FontSelector
                label="Fonte de Texto"
                value={brand.fonts.body}
                onChange={(v) =>
                  setBrand({ ...brand, fonts: { ...brand.fonts, body: v } })
                }
              />
            </div>
          )}

          {/* Step 5 — Foto de Perfil (Avatar) */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Sua foto de perfil</label>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  Aparece no header dos slides formato Twitter e Microblog
                </p>
                {/* Avatar preview */}
                {brand.avatarPath && (
                  <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-muted/50 border border-border">
                    <img
                      src={brand.avatarPath}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                    />
                    <div>
                      <p className="text-sm font-semibold">{brand.name}</p>
                      <p className="text-xs text-muted-foreground">{brand.handle || "@seu.perfil"}</p>
                    </div>
                  </div>
                )}
                <LogoUpload
                  value={brand.avatarPath || null}
                  onChange={(path) => setBrand({ ...brand, avatarPath: path })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  @ Instagram / TikTok
                </label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">@</span>
                  <Input
                    value={(brand.handle || "").replace(/^@/, "")}
                    onChange={(e) =>
                      setBrand({ ...brand, handle: "@" + e.target.value.replace(/^@/, "") })
                    }
                    placeholder="drjoaosilva"
                    className="pl-7 h-10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6 — Logo */}
          {step === 6 && (
            <LogoUpload
              value={brand.logoPath}
              onChange={(path) => setBrand({ ...brand, logoPath: path })}
            />
          )}

          {/* Step 7 — Estilo Visual */}
          {step === 7 && (
            <div>
              <label className="text-sm font-medium">
                Escolha o estilo da sua marca
              </label>
              <p className="text-xs text-muted-foreground mt-1 mb-3">
                Selecione palavras-chave que descrevem sua identidade visual
              </p>
              <div className="flex flex-wrap gap-2">
                {STYLE_OPTIONS.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      const keywords = brand.styleKeywords.includes(keyword)
                        ? brand.styleKeywords.filter((k) => k !== keyword)
                        : [...brand.styleKeywords, keyword];
                      setBrand({ ...brand, styleKeywords: keywords });
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                      brand.styleKeywords.includes(keyword)
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-transparent text-foreground border-border hover:border-muted-foreground"
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={step === 0 && !brand.name.trim()}
            >
              Avançar
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="accent"
              onClick={handleSave}
              disabled={saving || !brand.name.trim()}
            >
              {saving ? (
                "Salvando..."
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Concluir
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
