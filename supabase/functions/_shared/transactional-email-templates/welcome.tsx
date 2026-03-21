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
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'TeachKit'
const SITE_URL = 'https://teachkitapp.com'

interface WelcomeEmailProps {
  name?: string
}

const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to TeachKit — let's create something amazing</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Text style={logoText}>✨ TeachKit</Text>
        </Section>
        <Heading style={h1}>
          {name ? `Welcome aboard, ${name}!` : 'Welcome aboard!'}
        </Heading>
        <Text style={text}>
          Your email has been verified and your account is ready to go. We're thrilled to have you on board!
        </Text>
        <Text style={text}>
          Here's what you can do with{' '}
          <Link href={SITE_URL} style={link}>
            <strong>TeachKit</strong>
          </Link>
          :
        </Text>
        <Text style={listItem}>📝 <strong>Create lesson plans</strong> — Generate structured, standards-aligned lesson plans in seconds</Text>
        <Text style={listItem}>📄 <strong>Generate worksheets</strong> — Build custom worksheets tailored to your students</Text>
        <Text style={listItem}>❓ <strong>Build quizzes</strong> — Create engaging quizzes with multiple question types</Text>
        <Text style={listItem}>🎯 <strong>Make exit tickets</strong> — Quick assessments to check student understanding</Text>
        <Section style={buttonSection}>
          <Button style={button} href={`${SITE_URL}/dashboard`}>
            Get Started
          </Button>
        </Section>
        <Text style={footer}>
          If you have any questions, just reply to this email — we're here to help!
        </Text>
        <Text style={footerBrand}>The {SITE_NAME} Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomeEmail,
  subject: 'Welcome to TeachKit!',
  displayName: 'Welcome email',
  previewData: { name: 'Sarah' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Outfit', 'Inter', Arial, sans-serif" }
const container = { padding: '40px 25px' }
const logoSection = { marginBottom: '24px' }
const logoText = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(239, 84%, 67%)', margin: '0' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(220, 26%, 9%)', margin: '0 0 16px' }
const text = { fontSize: '15px', color: 'hsl(220, 9%, 46%)', lineHeight: '1.6', margin: '0 0 20px' }
const link = { color: 'hsl(239, 84%, 67%)', textDecoration: 'underline' }
const listItem = { fontSize: '15px', color: 'hsl(220, 9%, 46%)', lineHeight: '1.6', margin: '0 0 10px', paddingLeft: '4px' }
const buttonSection = { margin: '28px 0' }
const button = { backgroundColor: 'hsl(239, 84%, 67%)', color: '#ffffff', fontSize: '15px', fontWeight: '600' as const, borderRadius: '12px', padding: '14px 28px', textDecoration: 'none' }
const footer = { fontSize: '13px', color: '#999999', margin: '30px 0 4px' }
const footerBrand = { fontSize: '13px', color: 'hsl(220, 9%, 46%)', margin: '0', fontWeight: '500' as const }
