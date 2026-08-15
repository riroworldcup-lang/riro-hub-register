import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Preview,
  Section,
  Hr,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  competition?: string;
  registrationNumber?: string;
  teamName?: string;
  teamSize?: string;
}

const main = {
  backgroundColor: "#0B1020",
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
};

const container = {
  backgroundColor: "#0E1526",
  border: "1px solid rgba(201, 209, 217, 0.14)",
  borderRadius: "6px",
  padding: "32px",
  maxWidth: "600px",
};

const heading = {
  color: "#C89B3C",
  fontFamily: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
  fontSize: "28px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "-0.02em",
  margin: "0 0 20px",
};

const text = {
  color: "#F5F7FA",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const meta = {
  color: "#9BA7B8",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 8px",
};

const metaValue = {
  color: "#F5F7FA",
  fontWeight: 600,
};

const button = {
  backgroundColor: "#C89B3C",
  color: "#02040A",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  padding: "14px 28px",
  textDecoration: "none",
  display: "inline-block",
  marginTop: "8px",
};

const hr = {
  borderColor: "rgba(201, 209, 217, 0.14)",
  margin: "28px 0",
};

const footer = {
  color: "#9BA7B8",
  fontSize: "12px",
  lineHeight: "1.5",
};

const Email = ({
  name,
  competition,
  registrationNumber,
  teamName,
  teamSize,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      {name
        ? `RIRO WORLD CUP 2026 — Registration confirmed for ${name}`
        : "RIRO WORLD CUP 2026 — Registration confirmed"}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>RIRO WORLD CUP 2026</Heading>
        <Text style={text}>
          {name ? `Hi ${name},` : "Hi there,"}
        </Text>
        <Text style={text}>
          Your team registration for the RIRO WORLD CUP 2026 has been received and confirmed.
          Welcome to the championship.
        </Text>

        <Section>
          <Text style={meta}>
            Registration Number: <span style={metaValue}>{registrationNumber || "—"}</span>
          </Text>
          <Text style={meta}>
            Competition: <span style={metaValue}>{competition || "—"}</span>
          </Text>
          <Text style={meta}>
            Team / Club: <span style={metaValue}>{teamName || "—"}</span>
          </Text>
          <Text style={meta}>
            Team Size: <span style={metaValue}>{teamSize || "—"}</span>
          </Text>
        </Section>

        <Button href="https://riroworldcup.lovable.app/dashboard" style={button}>
          View Dashboard
        </Button>

        <Hr style={hr} />

        <Text style={footer}>
          Event dates: 14 – 17 November 2026 • Mira-Bhayander, Maharashtra, India
          <br />
          <br />
          This is an automated confirmation. Please carry your school / college ID card at the entry gate.
          For queries, reply to this email or contact us at info@riroworldcup.in.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: "RIRO WORLD CUP 2026 — Registration Confirmed",
  displayName: "Registration Confirmation",
  previewData: {
    name: "Aarav Sharma",
    competition: "Robo Race",
    registrationNumber: "RIRO-WC26-12345ABC",
    teamName: "Team Phoenix",
    teamSize: "3",
  },
} satisfies TemplateEntry;
