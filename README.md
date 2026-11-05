# COMET Morocco - Website

Website for COMET Morocco, a manufacturer of aerial work platforms (nacelles élévatrices) since 1960.

## Technologies

This project is built with:

- **Vite** - Build tool and dev server
- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Router** - Routing
- **Supabase** - Backend and database

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
   ```
   
   Get your free API key from [web3forms.com](https://web3forms.com)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── integrations/   # Third-party integrations (Supabase)
├── supabase/
│   └── migrations/     # Database migrations (if needed)
└── public/             # Static assets
```

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

See `DEPLOYMENT.md` for detailed deployment instructions.

## Features

- Responsive design
- Contact form with database storage
- WhatsApp floating button
- Product catalog
- Sector-specific information
- Multi-page navigation

## Contact Form

The contact form uses **Web3Forms** to send emails directly to your inbox. No backend or database required!

- Get your API key from [web3forms.com](https://web3forms.com)
- Add it to your `.env` file as `VITE_WEB3FORMS_ACCESS_KEY`
- Form submissions will be sent directly to your email

See `WEB3FORMS_SETUP.md` and `VERCEL_SETUP.md` for detailed setup instructions.

Form submissions are stored in the Supabase `contact_submissions` table. View submissions in the Supabase Dashboard → Table Editor.

## License

Private project - All rights reserved
