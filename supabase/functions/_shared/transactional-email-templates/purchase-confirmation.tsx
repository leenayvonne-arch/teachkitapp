/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'TeachKit'

interface PurchaseConfirmationProps {
  customerName?: string
  productName?: string
}

const PurchaseConfirmationEmail = ({ customerName, productName }: PurchaseConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your TeachKit purchase is confirmed — download ready!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Text style={logoText}>✨ {SITE_NAME}</Text>
        </Section>
        <Heading style={h1}>
          {customerName ? `Thank you, ${customerName}!` : 'Purchase confirmed!'}
        </Heading>
        <Text style={text}>
          Your purchase of <strong>{productName || 'your resource'}</strong> was successful. Your download is ready and waiting for you.
        </Text>
        <Section style={buttonSection}>
          <Button style={button} href="https://teachkitapp.com/dashboard/account">
            Go to My Purchases
          </Button>
        </Section>
        <Text style={text}>
          You can download your resource anytime from your account. If you have any questions, don't hesitate to reach out.
        </Text>
        <Text style={footerBrand}>Happy teaching! — The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PurchaseConfirmationEmail,
  subject: (data: Record<string, any>) =>
    `Your TeachKit purchase: ${data?.productName || 'Resource'}`,
  displayName: 'Purchase confirmation',
  previewData: { customerName: 'Sarah', productName: 'Math Worksheet Mega Pack' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }
const container = { padding: '40px 25px' }
const logoSection = { marginBottom: '24px' }
const logoText = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(239, 84%, 67%)', margin: '0' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(220, 26%, 9%)', margin: '0 0 16px' }
const text = { fontSize: '15px', color: 'hsl(220, 9%, 46%)', lineHeight: '1.6', margin: '0 0 20px' }
const buttonSection = { margin: '28px 0' }
const button = { backgroundColor: 'hsl(239, 84%, 67%)', color: '#ffffff', fontSize: '15px', fontWeight: '600' as const, borderRadius: '12px', padding: '14px 28px', textDecoration: 'none' }
const footerBrand = { fontSize: '13px', color: 'hsl(220, 9%, 46%)', margin: '30px 0 0', fontWeight: '500' as const }
