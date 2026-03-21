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

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You've been invited to join TeachKit</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Text style={logoText}>✨ TeachKit</Text>
        </Section>
        <Heading style={h1}>You've been invited!</Heading>
        <Text style={text}>
          You've been invited to join{' '}
          <Link href={siteUrl} style={link}>
            <strong>TeachKit</strong>
          </Link>
          . Click the button below to accept the invitation and start creating lesson materials.
        </Text>
        <Section style={buttonSection}>
          <Button style={button} href={confirmationUrl}>
            Accept Invitation
          </Button>
        </Section>
        <Text style={footer}>
          If you weren't expecting this invitation, you can safely ignore this email.
        </Text>
        <Text style={footerBrand}>The TeachKit Team</Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

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
