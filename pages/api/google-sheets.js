import { google } from 'googleapis';
import credentials from './credentials.json' // Service account JSON file

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = '13sXSzFHeb_3L_-144I-alDc3NolXxaN5WVpm2oyYMYg'; // Replace with your Google Sheet ID

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, age, preferences, imageUrl } = req.body;
      const sheets = google.sheets({ version: 'v4', auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:D', // Columns for Name, Age, Preferences, Image URL
        valueInputOption: 'RAW',
        resource: {
          values: [[name, age, preferences, imageUrl]],
        },
      });

      res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add data to Google Sheets' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
