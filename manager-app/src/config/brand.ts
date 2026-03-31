// ========================= Brand Configuration =========================
// Modify these values to customize the application for your brand.
// This is the SINGLE source of truth for all brand-related settings.
// =======================================================================

export const BRAND = {
  name: "KClaw",
  displayName: "KClaw OpenClaw Manager",
  lower: "kclaw",
  logo: "/logo.svg",
  website: "https://kclaw.com",
  supportUrl: "https://github.com/frederderrickkastre-arch/kclaw-openclaw-releases/issues",
  docsUrl: "https://docs.kclaw.com",
} as const;

export const API_CONFIG = {
  defaultBaseUrl: "https://www.eden321.com/v1",
  defaultProviderName: "KClaw API",
  apiKeyPrefix: "sk-",
  apiKeyPlaceholder: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  registrationUrl: "https://www.eden321.com/register",
  pricingUrl: "https://www.eden321.com/pricing",
  docsUrl: "https://www.eden321.com/docs",
} as const;

export const SUPPORTED_MODELS = [
  { id: "gpt-5.4-mini", name: "GPT-5.4 Mini", provider: "OpenAI" },
  { id: "gpt-5.4-nano", name: "GPT-5.4 Nano", provider: "OpenAI" },
  { id: "gpt-5.4", name: "GPT-5.4", provider: "OpenAI" },
  { id: "gpt-5.4-pro", name: "GPT-5.4 Pro", provider: "OpenAI" },
  { id: "gpt-5.3-chat-latest", name: "GPT-5.3 Chat", provider: "OpenAI" },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", provider: "Anthropic" },
  { id: "claude-opus-4-6", name: "Claude Opus 4.6", provider: "Anthropic" },
  { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro", provider: "Google" },
  { id: "gemini-3.1-flash-lite-preview", name: "Gemini 3.1 Flash Lite", provider: "Google" },
  { id: "MiniMax-M2.7", name: "MiniMax M2.7", provider: "MiniMax" },
] as const;

export const DEFAULT_INSTANCE_CONFIG = {
  provider: {
    baseUrl: API_CONFIG.defaultBaseUrl,
    name: API_CONFIG.defaultProviderName,
    model: "gpt-5.4-mini",
  },
} as const;
