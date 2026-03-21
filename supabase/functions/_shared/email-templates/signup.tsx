/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to TeachKit — confirm your email to get started</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Text style={logoText}>✨ TeachKit</Text>
        </Section>
        <Heading style={h1}>Welcome aboard!</Heading>
        <Text style={text}>
          Thanks for signing up for{' '}
          <Link href={siteUrl} style={link}>
            <strong>TeachKit</strong>
          </Link>
          ! We're excited to help you create amazing lesson materials.
        </Text>
        <Text style={text}>
          Please confirm your email address (
          <Link href={`mailto:${recipient}`} style={link}>
            {recipient}
          </Link>
          ) to get started:
        </Text>
        <Section style={buttonSection}>
          <Button style={button} href={confirmationUrl}>
            Verify My Email
          </Button>
        </Section>
        <Text style={footer}>
          If you didn't create an account, you can safely ignore this email.
        </Text>
        <Text style={footerBrand}>The TeachKit Team</Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }
const container = { padding: '40px 25px' }
const logoSection = { marginBottom: '24px' }
const logoText = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(239, 84%, 67%)', margin: '0' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(220, 26%, 9%)', margin: '0 0 16px' }
const text = { fontSize: '15px', color: 'hsl(220, 9%, 46%)', lineHeight: '1.6', margin: '0 0 20px' }
const link = { color: 'hsl(239, 84%, 67%)', textDecoration: 'underline' }
const buttonSection = { margin: '28px 0' }
const button = { backgroundColor: 'hsl(239, 84%, 67%)', color: '#ffffff', fontSize: '15px', fontWeight: '600' as const, borderRadius: '12px', padding: '14px 28px', textDecoration: 'none' }
const footer = { fontSize: '13px', color: '#999999', margin: '30px 0 4px' }
const footerBrand = { fontSize: '13px', color: 'hsl(220, 9%, 46%)', margin: '0', fontWeight: '500' as const }
