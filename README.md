# Facebook Lead Forms Manager

A modern web application for efficiently managing and downloading Facebook lead form data.

## Features

- Connect to multiple Facebook accounts
- View and select pages associated with each account
- Browse lead forms for each page
- Filter leads by date range (today, yesterday, all, custom)
- Download leads in Excel or CSV format
- Preview leads with pagination
- Modern, responsive UI built with Next.js and Tailwind CSS

## Deployment to Vercel

### Prerequisites

- A Vercel account
- A GitHub account (with this repository)

### Deployment Steps

1. Fork or clone this repository to your GitHub account
2. Log in to your Vercel account
3. Click "New Project"
4. Import your GitHub repository
5. Configure the following environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_FACEBOOK_API_VERSION`: v19.0 (or your preferred version)
   - `NEXT_PUBLIC_APP_URL`: Your Vercel app URL (e.g., https://leadmanager.vercel.app)

6. Deploy the application
7. After deployment, you'll need to upload your `accounts.json` file to the root directory (see [Account Setup](#account-setup) below)

### Post-Deployment Configuration

After deployment, you'll need to:

1. Set up your Facebook accounts in the `accounts.json` file
2. Upload the `accounts.json` file to your production server
3. Ensure the file has the correct permissions

## Account Setup

This application uses Facebook account credentials to access lead form data. These credentials are stored in an `accounts.json` file that is not committed to the repository for security reasons.

### Creating the accounts.json File

1. Create an `accounts.json` file in the root directory of the project
2. Add your Facebook account credentials to this file

For detailed instructions on setting up the `accounts.json` file, see [ACCOUNTS_SETUP.md](./ACCOUNTS_SETUP.md).

### For Development

The application will automatically read from the `accounts.json` file in the root directory.

### For Production

For production environments, you need to ensure the `accounts.json` file is present on your production server. See [ACCOUNTS_SETUP.md](./ACCOUNTS_SETUP.md) for detailed deployment instructions.

## Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start the production server
npm start
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Facebook Graph API

## License

MIT
