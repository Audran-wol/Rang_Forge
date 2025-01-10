# GitHub Top Users Explorer

A modern web application built with Next.js that allows you to discover and connect with top GitHub users across different countries. The platform provides an interactive way to explore GitHub's most influential developers, their contributions, and connect with the global developer community.

![Project Preview](public/lopop.png)

## 🌟 Features

- **Global Developer Rankings**: Explore top GitHub users ranked by followers across different countries
- **Interactive Search**: Find developers by name or location
- **Country-based Filtering**: View top developers from specific countries
- **Real-time Updates**: Data is regularly updated to provide the latest rankings
- **Responsive Design**: Seamless experience across all devices
- **Dark/Light Mode**: Choose your preferred theme

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/)
  - [Shadcn/ui](https://ui.shadcn.com/)
- **Data Visualization**: 
  - [D3.js](https://d3js.org/)
  - [ECharts](https://echarts.apache.org/)
- **Maps**: [Mapbox GL](https://www.mapbox.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Data Fetching**: [Axios](https://axios-http.com/)

## 🛠️ Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Project Structure

```
├── app/                  # Next.js app directory
├── components/          # React components
│   ├── layout/         # Layout components
│   └── ui/             # UI components
├── lib/                # Utility functions
├── public/             # Static assets
└── country_files/      # Country-specific data
```

## 🌍 Key Features

- **Code Collaboration**: Connect with skilled developers and collaborate on innovative projects
- **Global Network**: Access a worldwide community of developers ranked by their contributions
- **Cross-Cultural Exchange**: Learn from developers across different countries and coding cultures
- **Project Discovery**: Find and connect with developers working on exciting open-source projects
- **Career Growth**: Boost your visibility in the developer community
- **Knowledge Sharing**: Exchange ideas and best practices with top-ranked developers

## 🔧 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 📄 License

Private Repository - All Rights Reserved

## 🙏 Acknowledgments

- GitHub API for providing the data
- Raw github user content
