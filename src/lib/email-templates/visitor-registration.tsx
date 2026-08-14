import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Preview,
  Section,
  Hr,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  fullName?: string;
  contactNumber?: string;
  schoolCollegeName?: string;
  standard?: string;
  division?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  fatherName?: string;
  fatherMobile?: string;
  motherName?: string;
  motherMobile?: string;
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
  fontSize: "24px",
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
  fullName,
  contactNumber,
  schoolCollegeName,
  standard,
  division,
  addressLine1,
  addressLine2,
  addressLine3,
  addressLine4,
  fatherName,
  fatherMobile,
  motherName,
  motherMobile,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New visitor registration for RIRO WORLD CUP 2026</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Visitor Registration</Heading>
        <Text style={text}>A new visitor has registered for RIRO WORLD CUP 2026.</Text>

        <Section>
          <Text style={meta}>
            Full Name: <span style={metaValue}>{fullName || "—"}</span>
          </Text>
          <Text style={meta}>
            Contact Number: <span style={metaValue}>{contactNumber || "—"}</span>
          </Text>
          <Text style={meta}>
            School / College: <span style={metaValue}>{schoolCollegeName || "—"}</span>
          </Text>
          <Text style={meta}>
            Standard / Division: <span style={metaValue}>{[standard, division].filter(Boolean).join(" / ") || "—"}</span>
          </Text>
          <Text style={meta}>
            Address: <span style={metaValue}>{[addressLine1, addressLine2, addressLine3, addressLine4].filter(Boolean).join(", ") || "—"}</span>
          </Text>
          <Text style={meta}>
            Father: <span style={metaValue}>{[fatherName, fatherMobile].filter(Boolean).join(" / ") || "—"}</span>
          </Text>
          <Text style={meta}>
            Mother: <span style={metaValue}>{[motherName, motherMobile].filter(Boolean).join(" / ") || "—"}</span>
          </Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          Event dates: 14 – 18 November 2026 • Mira-Bhayander, Maharashtra, India
          <br />
          <br />
          This is an automated notification from the RIRO WORLD CUP 2026 registration system.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: "RIRO WORLD CUP 2026 — New Visitor Registration",
  displayName: "Visitor Registration Notification",
  previewData: {
    fullName: "Priya Patel",
    contactNumber: "+91 98765 43210",
    schoolCollegeName: "Royal College",
    standard: "10",
    division: "A",
    addressLine1: "123 Main Road",
    addressLine2: "Mira Road",
    addressLine3: "Thane",
    addressLine4: "Maharashtra",
    fatherName: "Rajesh Patel",
    fatherMobile: "+91 98765 43211",
    motherName: "Sunita Patel",
    motherMobile: "+91 98765 43212",
  },
} satisfies TemplateEntry;
