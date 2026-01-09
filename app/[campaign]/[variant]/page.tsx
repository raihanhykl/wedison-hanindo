import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCampaignConfig, getAllCampaignPaths } from '@/lib/campaigns'
import LandingPageClient from './LandingPageClient'

interface PageProps {
  params: Promise<{
    campaign: string
    variant: string
  }>
}

// Generate static params for all campaigns
export async function generateStaticParams() {
  return getAllCampaignPaths()
}

// Generate metadata for each campaign
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { campaign, variant } = await params
  const config = getCampaignConfig(campaign, variant)
  
  if (!config) {
    return {
      title: 'Wedison - Motor Listrik',
    }
  }

  return {
    title: config.metadata.title,
    description: config.metadata.description,
    keywords: config.metadata.keywords,
    openGraph: {
      title: config.metadata.title,
      description: config.metadata.description,
      type: 'website',
      locale: 'id_ID',
    },
  }
}

export default async function LandingPage({ params }: PageProps) {
  const { campaign, variant } = await params
  const config = getCampaignConfig(campaign, variant)

  if (!config) {
    notFound()
  }

  return <LandingPageClient campaign={campaign} variant={variant} config={config} />
}
