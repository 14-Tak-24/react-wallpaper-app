# GitHub Secrets Configuration Guide

This guide will help you configure the required GitHub secrets for your CI/CD workflows to function properly.

## 🔑 Required Secrets

### Vercel Secrets (Required)

Your workflows require the following Vercel-related secrets:

1. **`VERCEL_TOKEN`** - Your Vercel authentication token
2. **`VERCEL_ORG_ID`** - Your Vercel organization ID
3. **`VERCEL_PROJECT_ID`** - Your Vercel project ID

### Codecov Secret (Optional)

1. **`CODECOV_TOKEN`** - Your Codecov token for coverage reports (optional but recommended)

## 📋 Step-by-Step Setup

### 1. Get Vercel Token

1. Log in to [Vercel](https://vercel.com)
2. Go to **Settings** → **Tokens**
3. Click **Create Token**
4. Give it a name (e.g., "GitHub Actions")
5. Select the scope (typically "Full Account" or specific scopes you need)
6. Copy the generated token

### 2. Get Vercel Organization ID

1. Log in to [Vercel](https://vercel.com)
2. Go to your **Settings** → **General**
3. Scroll down to find your **Organization ID**
4. Copy the ID (it looks like: `team_xxxxxxxxxxxx`)

### 3. Get Vercel Project ID

1. Log in to [Vercel](https://vercel.com)
2. Navigate to your specific project
3. Go to **Settings** → **General**
4. Scroll down to find **Project ID**
5. Copy the ID (it looks like: `prj_xxxxxxxxxxxx`)

### 4. Get Codecov Token (Optional)

1. Log in to [Codecov](https://codecov.io)
2. Navigate to your repository
3. Go to **Settings** → **Repository Token**
4. Copy the token (if available)

## 🔧 Adding Secrets to GitHub

### Method 1: Via GitHub Web UI

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret one by one:
   - Name: `VERCEL_TOKEN`, Value: [your Vercel token]
   - Name: `VERCEL_ORG_ID`, Value: [your organization ID]
   - Name: `VERCEL_PROJECT_ID`, Value: [your project ID]
   - Name: `CODECOV_TOKEN`, Value: [your Codecov token] (optional)

### Method 2: Via GitHub CLI

If you have the GitHub CLI installed:

```bash
# Navigate to your repository
cd /Users/AkshuN/Desktop/archives/react-app

# Add secrets
gh secret set VERCEL_TOKEN
gh secret set VERCEL_ORG_ID
gh secret set VERCEL_PROJECT_ID
gh secret set CODECOV_TOKEN  # optional
```

## ✅ Verification

After adding the secrets, you can verify they're set correctly:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You should see all your secrets listed
3. The values should be hidden (shown as `****`)

## 🚀 Testing the Workflows

Once secrets are configured, test your workflows:

### Test CI Workflow
1. Make a small change to a file
2. Commit and push to `main` or `develop` branch
3. Go to **Actions** tab in GitHub
4. Check if the CI workflow runs successfully

### Test Staging Deployment
1. Push to `develop` branch
2. Check if staging deployment triggers
3. Verify the preview URL in Vercel dashboard

### Test PR Preview
1. Create a new branch
2. Make changes and create a PR to `main`
3. Check if preview deployment triggers
4. Look for the preview URL in the PR comments

### Test Production Deployment
1. Merge changes to `main` branch
2. Check if production deployment triggers
3. Verify the live site is updated

## 🔒 Security Best Practices

- **Never commit secrets to your repository**
- **Use different tokens for different environments** if possible
- **Rotate tokens regularly** (especially if compromised)
- **Limit token scopes** to only what's needed
- **Monitor token usage** in Vercel dashboard
- **Revoke unused tokens** immediately

## 🐛 Troubleshooting

### "Resource not accessible by integration" Error
- Verify your Vercel token has the correct permissions
- Check that the token hasn't expired
- Ensure the GitHub Actions integration has proper access

### "Project not found" Error
- Verify your `VERCEL_PROJECT_ID` is correct
- Check that the project exists in your Vercel account
- Ensure the project is linked to the correct organization

### Workflow Fails at Deployment Step
- Check that all three Vercel secrets are set correctly
- Verify the token has deployment permissions
- Check the workflow logs for specific error messages

### Coverage Reports Not Uploading
- Verify `CODECOV_TOKEN` is set (if using Codecov)
- Check that the coverage file is being generated
- Ensure the coverage file path in workflow is correct

## 📝 Additional Notes

- **Vercel Free Tier**: The workflows work with Vercel's free tier
- **Rate Limits**: Be aware of Vercel's API rate limits for high-volume deployments
- **Branch Protection**: Consider enabling branch protection rules for `main` branch
- **Environment Secrets**: For additional security, use environment-specific secrets instead of repository secrets

## 🎯 Next Steps

After configuring secrets:

1. **Commit and push** your current changes to test the workflows
2. **Monitor the first few workflow runs** to ensure everything works
3. **Set up branch protection** rules to require CI checks before merging
4. **Configure notifications** for workflow failures
5. **Document your deployment process** for team members

For more information, refer to:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Codecov Documentation](https://docs.codecov.com/)