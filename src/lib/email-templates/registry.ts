import type React from "react";

export interface TemplateEntry {
  component: React.ComponentType<any>;
  subject: string | ((data: Record<string, unknown>) => string);
  displayName?: string;
  previewData?: Record<string, unknown>;
  to?: string;
}

export type TemplateRegistry = Record<string, TemplateEntry>;
