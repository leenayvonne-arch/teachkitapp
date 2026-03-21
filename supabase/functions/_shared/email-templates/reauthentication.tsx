/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your TeachKit verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Text style={logoText}>✨ TeachKit</Text>
        </Section>
        <Heading style={h1}>Verify your identity</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          This code will expire shortly. If you didn't request this, you can safely ignore this email.
        </Text>
        <Text style={footerBrand}>The TeachKit Team</Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }
const container = { padding: '40px 25px' }
const logoSection = { marginBottom: '24px' }
const logoText = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(239, 84%, 67%)', margin: '0' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(220, 26%, 9%)', margin: '0 0 16px' }
const text = { fontSize: '15px', color: 'hsl(220, 9%, 46%)', lineHeight: '1.6', margin: '0 0 20px' }
const codeStyle = { fontFamily: 'Courier, monospace', fontSize: '28px', fontWeight: 'bold' as const, color: 'hsl(239, 84%, 67%)', margin: '0 0 30px', letterSpacing: '4px' }
const footer = { fontSize: '13px', color: '#999999', margin: '30px 0 4px' }
const footerBrand = { fontSize: '13px', color: 'hsl(220, 9%, 46%)', margin: '0', fontWeight: '500' as const }
