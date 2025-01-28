import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { GitHubUser } from '../types'

interface Props {
  params: { 
    country: string
    username: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, username } = params
  
  // Fetch user data
  const user = await getUserData(country, username)
  if (!user) return {}

  return {
    title: `${user.name || user.login} - Top GitHub Contributor from ${country}`,
    description: `View ${user.name || user.login}'s GitHub profile, contributions, and rankings. ${user.name || user.login} has ${user.followers} followers and ${user.publicContributions} public contributions.`,
    openGraph: {
      title: `${user.name || user.login} - GitHub Contributor Profile`,
      description: `GitHub profile of ${user.name || user.login} from ${country} with ${user.followers} followers and ${user.publicContributions} public contributions`,
      images: [{
        url: user.avatarUrl,
        width: 200,
        height: 200,
        alt: `${user.name || user.login}'s GitHub avatar`
      }]
    },
    twitter: {
      card: 'summary',
      title: `${user.name || user.login} - GitHub Contributor Profile`,
      description: `GitHub profile of ${user.name || user.login} from ${country}`,
      images: [user.avatarUrl]
    }
  }
}

async function getUserData(country: string, username: string): Promise<GitHubUser | null> {
  try {
    const formattedCountry = country.toLowerCase().replace(/\s+/g, '_')
    const response = await fetch(`https://raw.githubusercontent.com/gayanvoice/top-github-users/main/cache/${formattedCountry}.json`)
    
    if (!response.ok) return null
    
    const data = await response.json()
    const user = data.users.find((u: any) => u.login.toLowerCase() === username.toLowerCase())
    
    if (!user) return null
    
    return {
      login: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatarUrl,
      location: user.location || country,
      followers: parseInt(user.followers) || 0,
      publicContributions: parseInt(user.publicContributions) || 0,
      privateContributions: parseInt(user.privateContributions) || 0
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

export default function UserProfilePage({ params }: Props) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: params.username,
            url: `https://rank-forge.netlify.app/ranking/${params.country}/${params.username}`,
            image: `https://avatars.githubusercontent.com/${params.username}`,
            sameAs: `https://github.com/${params.username}`,
            description: `GitHub profile of ${params.username} from ${params.country}`,
            knowsAbout: ["Software Development", "Open Source"],
            memberOf: {
              "@type": "Organization",
              name: "GitHub"
            }
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          {params.username} - GitHub Profile
        </h1>
        {/* Add more profile details here */}
      </div>
    </div>
  )
}
