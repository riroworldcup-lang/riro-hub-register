import { template as registrationConfirmation } from "./registration-confirmation";
import { template as visitorRegistration } from "./visitor-registration";
import type { TemplateRegistry } from "./registry";

export const TEMPLATES: TemplateRegistry = {
  "registration-confirmation": registrationConfirmation,
  "visitor-registration": visitorRegistration,
};

export * from "./registry";
