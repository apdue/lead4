import fs from 'fs';
import path from 'path';

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
}

export interface Account {
  id: string;
  name: string;
  appId: string;
  appSecret: string;
  shortLivedToken: string;
  longLivedToken: string;
  longLivedTokenExpiry: string;
  pages: FacebookPage[];
}

export interface AccountsData {
  accounts: Account[];
  currentAccountId: string;
  lastUpdated: string;
}

// In-memory storage for caching
let inMemoryAccountsData: AccountsData | null = null;

const accountsFilePath = path.join(process.cwd(), 'accounts.json');

// Read accounts from JSON file
export function getAccountsData(): AccountsData {
  // If we have in-memory data, use that
  if (inMemoryAccountsData) {
    return inMemoryAccountsData;
  }
  
  try {
    // Always try to read from file first
    if (fs.existsSync(accountsFilePath)) {
      const fileData = fs.readFileSync(accountsFilePath, 'utf8');
      const data = JSON.parse(fileData) as AccountsData;
      
      // Cache in memory
      inMemoryAccountsData = data;
      
      return data;
    }
    
    // If file doesn't exist, create a default one
    const defaultData = {
      accounts: [],
      currentAccountId: '',
      lastUpdated: new Date().toISOString()
    };
    
    // Save the default data to file
    fs.writeFileSync(accountsFilePath, JSON.stringify(defaultData, null, 2), 'utf8');
    
    // Cache in memory
    inMemoryAccountsData = defaultData;
    
    return defaultData;
  } catch (error) {
    console.error('Error reading accounts data:', error);
    
    // Return default structure if all methods fail
    const defaultData = {
      accounts: [],
      currentAccountId: '',
      lastUpdated: new Date().toISOString()
    };
    
    return defaultData;
  }
}

// Save accounts to JSON file and memory
export function saveAccountsData(data: AccountsData): void {
  // Update in-memory data
  inMemoryAccountsData = data;
  
  try {
    // Always write to file
    fs.writeFileSync(accountsFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving accounts data:', error);
  }
}

// Get current account
export function getCurrentAccount(): Account | null {
  const data = getAccountsData();
  if (!data.currentAccountId && data.accounts.length > 0) {
    // Set first account as current if none is set
    data.currentAccountId = data.accounts[0].id;
    saveAccountsData(data);
  }
  
  return data.accounts.find(account => account.id === data.currentAccountId) || null;
}

// Get account by ID
export function getAccountById(accountId: string): Account | null {
  const data = getAccountsData();
  return data.accounts.find(account => account.id === accountId) || null;
}

// Set current account
export function setCurrentAccount(accountId: string): boolean {
  const data = getAccountsData();
  const accountExists = data.accounts.some(account => account.id === accountId);
  
  if (accountExists) {
    data.currentAccountId = accountId;
    saveAccountsData(data);
    return true;
  }
  
  return false;
}

// Update account tokens
export function updateAccountTokens(
  accountId: string, 
  updates: Partial<Account>
): Account | null {
  const data = getAccountsData();
  const accountIndex = data.accounts.findIndex(account => account.id === accountId);
  
  if (accountIndex === -1) {
    return null;
  }
  
  // Update the account
  data.accounts[accountIndex] = {
    ...data.accounts[accountIndex],
    ...updates,
  };
  
  data.lastUpdated = new Date().toISOString();
  saveAccountsData(data);
  
  return data.accounts[accountIndex];
}

// Add or update page for an account
export function updateAccountPage(
  accountId: string,
  page: FacebookPage
): Account | null {
  const data = getAccountsData();
  const accountIndex = data.accounts.findIndex(account => account.id === accountId);
  
  if (accountIndex === -1) {
    return null;
  }
  
  const account = data.accounts[accountIndex];
  const pageIndex = account.pages.findIndex(p => p.id === page.id);
  
  if (pageIndex === -1) {
    // Add new page
    account.pages.push(page);
  } else {
    // Update existing page
    account.pages[pageIndex] = page;
  }
  
  data.lastUpdated = new Date().toISOString();
  saveAccountsData(data);
  
  return account;
} 