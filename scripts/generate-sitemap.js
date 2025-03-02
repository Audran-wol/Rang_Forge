const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

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

// Get all user data for generating user-specific sitemap entries
async function getUsersFromCountryFiles() {
  const countryFiles = path.join(__dirname, '../country_files');
  const allUsers = [];
  
  // Process each country that has a JSON file
  for (const country of availableCountries) {
    try {
      const countrySlug = country.toLowerCase().replace(/\s+/g, '_');
      const filePath = path.join(countryFiles, `${countrySlug}.json`);
      
      // Skip if file doesn't exist
      if (!fs.existsSync(filePath)) continue;
      
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Add users with country info
      data.forEach(user => {
        allUsers.push({
          login: user.login,
          country: countrySlug
        });
      });
    } catch (error) {
      console.error(`Error processing ${country}:`, error.message);
    }
  }
  
  return allUsers;
}

// Generate the sitemap XML
async function generateSitemap() {
  // Define static pages
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: 1.0 },
    { url: '/ranking', changefreq: 'daily', priority: 0.9 },
    { url: '/about', changefreq: 'monthly', priority: 0.5 },
    { url: '/contact', changefreq: 'monthly', priority: 0.3 },
  ];
  
  // Add country pages
  const countryPages = availableCountries.map(country => {
    const countrySlug = country.toLowerCase().replace(/\s+/g, '_');
    return {
      url: `/ranking/${countrySlug}`,
      changefreq: 'daily',
      priority: 0.8
    };
  });
  
  // Add user pages
  const users = await getUsersFromCountryFiles();
  const userPages = users.map(user => ({
    url: `/ranking/${user.country}/${user.login.toLowerCase()}`,
    changefreq: 'weekly',
    priority: 0.6
  }));
  
  // Combine all pages
  const allPages = [...staticPages, ...countryPages, ...userPages];
  
  // Create XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  `).join('')}
</urlset>`;
  
  // Format and write sitemap.xml to public directory
  try {
    const formattedSitemap = await prettier.format(sitemap, { parser: 'html' });
    fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), formattedSitemap);
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Generate robots.txt file
function generateRobotsTxt() {
  const robotsTxt = `# robots.txt for Rang Forge
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml
`;

  fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsTxt);
  console.log('robots.txt generated successfully!');
}

// Run the generators
async function main() {
  try {
    // Create public directory if it doesn't exist
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    
    await generateSitemap();
    generateRobotsTxt();
    console.log('SEO files generation completed successfully!');
  } catch (error) {
    console.error('Error generating SEO files:', error);
  }
}

main(); 