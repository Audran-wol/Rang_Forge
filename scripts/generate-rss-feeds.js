const fs = require('fs');
const path = require('path');

// Base URL of your website
const BASE_URL = 'https://rang-forge.netlify.app';

// Available countries (same as in your app)
const availableCountries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina',
  'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh',
  'Belarus', 'Belgium', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
  'Botswana', 'Brazil', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia',
  'Cameroon', 'Canada', 'Chad', 'Chile', 'China', 'Colombia', 'Congo',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia', 'Finland', 'France',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Honduras', 'Hong Kong',
  'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kuwait', 'Laos', 'Latvia', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico',
  'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
  'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Nigeria',
  'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Paraguay', 'Peru',
  'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
  'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka',
  'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tanzania', 'Thailand',
  'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela',
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
].filter(country => country !== 'undefined value');

// Function to format a date as RFC 822 format (required for RSS)
function formatRFC822(date) {
  return date.toUTCString();
}

// Create the main RSS feed for the entire site
function generateMainRssFeed() {
  const feedItems = availableCountries.map(country => {
    const countrySlug = country.toLowerCase().replace(/\s+/g, '_');
    return `
    <item>
      <title>Top GitHub Developers in ${country}</title>
      <link>${BASE_URL}/ranking/${countrySlug}</link>
      <guid>${BASE_URL}/ranking/${countrySlug}</guid>
      <description>Discover the most talented GitHub developers from ${country}. View comprehensive rankings based on followers, contributions, and community impact.</description>
      <pubDate>${formatRFC822(new Date())}</pubDate>
    </item>`;
  });

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>GitHub Developer Rankings | Rang Forge</title>
  <link>${BASE_URL}</link>
  <description>Explore GitHub rankings and discover top developers worldwide. Compare developers by country, contributions, and influence.</description>
  <language>en-us</language>
  <lastBuildDate>${formatRFC822(new Date())}</lastBuildDate>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${feedItems.join('')}
</channel>
</rss>`;

  fs.writeFileSync(path.join(__dirname, '../public/rss.xml'), rssFeed);
  console.log('Main RSS feed generated successfully!');
}

// Generate country-specific RSS feeds
async function generateCountryRssFeeds() {
  for (const country of availableCountries) {
    try {
      const countrySlug = country.toLowerCase().replace(/\s+/g, '_');
      const filePath = path.join(__dirname, `../country_files/${countrySlug}.json`);
      
      // Skip if file doesn't exist
      if (!fs.existsSync(filePath)) continue;
      
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Sort users by followers (most popular first)
      const sortedUsers = [...data].sort((a, b) => b.followers - a.followers);
      
      // Generate RSS items for top 50 users
      const feedItems = sortedUsers.slice(0, 50).map((user, index) => {
        const userName = user.name || user.login;
        const userDescription = user.bio || `GitHub developer from ${country}`;
        
        return `
    <item>
      <title>${userName} - Rank #${index + 1} GitHub Developer from ${country}</title>
      <link>${BASE_URL}/ranking/${countrySlug}/${user.login}</link>
      <guid>${BASE_URL}/ranking/${countrySlug}/${user.login}</guid>
      <description>${userDescription}. ${userName} has ${user.followers.toLocaleString()} followers and ${user.publicContributions.toLocaleString()} contributions on GitHub.</description>
      <author>info@rang-forge.app (Rang Forge)</author>
      <pubDate>${formatRFC822(new Date())}</pubDate>
      <category>GitHub Developers</category>
      <category>${country}</category>
    </item>`;
      });

      // Create RSS feed content
      const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Top GitHub Developers in ${country} | Rang Forge</title>
  <link>${BASE_URL}/ranking/${countrySlug}</link>
  <description>Discover the most talented GitHub developers from ${country}. Rankings based on followers, contributions, and community impact.</description>
  <language>en-us</language>
  <lastBuildDate>${formatRFC822(new Date())}</lastBuildDate>
  <atom:link href="${BASE_URL}/feeds/${countrySlug}.xml" rel="self" type="application/rss+xml" />
  ${feedItems.join('')}
</channel>
</rss>`;

      // Create feeds directory if it doesn't exist
      const feedsDir = path.join(__dirname, '../public/feeds');
      if (!fs.existsSync(feedsDir)) {
        fs.mkdirSync(feedsDir, { recursive: true });
      }

      // Write the RSS feed to a file
      fs.writeFileSync(path.join(feedsDir, `${countrySlug}.xml`), rssFeed);
      console.log(`RSS feed for ${country} generated successfully!`);
    } catch (error) {
      console.error(`Error generating RSS feed for ${country}:`, error.message);
    }
  }
}

// Run the generator
async function main() {
  try {
    // Create public directory if it doesn't exist
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    
    // Generate the main RSS feed
    generateMainRssFeed();
    
    // Generate country-specific RSS feeds
    await generateCountryRssFeeds();
    
    console.log('All RSS feeds generated successfully!');
  } catch (error) {
    console.error('Error generating RSS feeds:', error);
  }
}

main(); 