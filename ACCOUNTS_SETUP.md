# Setting Up Facebook Accounts

This document explains how to set up your Facebook account credentials for both development and production environments.

## Understanding accounts.json

The `accounts.json` file contains sensitive information such as:
- Facebook App IDs and secrets
- Access tokens for Facebook accounts and pages
- Other account-related information

This file is listed in `.gitignore` to prevent it from being committed to your repository, which is a security best practice.

## Setting Up accounts.json

### File Structure

Create an `accounts.json` file in the root directory of the project with the following structure:

```json
{
  "accounts": [
    {
      "id": "your_account_id",
      "name": "Your Account Name",
      "appId": "your_app_id",
      "appSecret": "your_app_secret",
      "shortLivedToken": "your_token",
      "longLivedToken": "your_long_lived_token",
      "longLivedTokenExpiry": "2023-12-31T00:00:00.000Z",
      "pages": [
        {
          "id": "your_page_id",
          "name": "Your Page Name",
          "access_token": "your_page_token"
        }
      ]
    }
  ],
  "currentAccountId": "your_account_id",
  "lastUpdated": "2023-06-01T00:00:00.000Z"
}
```

### For Development

1. Create the `accounts.json` file in the root directory of the project
2. Add your Facebook account credentials to this file
3. The application will automatically read from this file

### For Production

For production environments, you need to ensure the `accounts.json` file is present on your production server:

1. Create the `accounts.json` file on your production server (do not commit it to your repository)
2. Place it in the root directory of your deployed application
3. Make sure the file has the correct permissions for the application to read and write to it
4. The application will automatically use this file in production

## Deployment Considerations

When deploying to a hosting platform:

1. **Vercel/Netlify/Similar Platforms**: You'll need to upload the `accounts.json` file after deployment, as these platforms typically don't allow direct file system access for serverless functions. Consider using a custom server setup instead.

2. **Traditional Hosting (VPS, Dedicated Server)**: Simply place the `accounts.json` file in the root directory of your application.

3. **Docker**: If using Docker, you can mount the `accounts.json` file as a volume to ensure persistence.

## Security Considerations

1. Never commit sensitive information to your repository
2. Restrict file system access to the `accounts.json` file
3. Regularly rotate your access tokens and secrets
4. Use the minimum required permissions for your Facebook app
5. Consider encrypting the contents of the `accounts.json` file for additional security

## Troubleshooting

If you encounter issues with account loading:

1. Check that the `accounts.json` file exists in the root directory
2. Verify that the file has the correct permissions
3. Ensure the file contains valid JSON
4. Check the application logs for any errors related to account loading
5. Verify that your tokens are valid and not expired
6. Ensure your Facebook app has the necessary permissions 