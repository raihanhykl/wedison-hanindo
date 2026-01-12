# 📊 Google Sheets Integration Setup

Panduan lengkap untuk mengintegrasikan Lead Form dengan Google Sheets.

## 🎯 Metode: Google Apps Script Web App

Metode ini gratis, mudah, dan tidak memerlukan API keys.

---

## 📋 Step 1: Buat Google Sheets

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Beri nama header di baris pertama:
   ```
   Timestamp | Nama | Nomor WhatsApp | Kota | Program | Model
   ```
4. Atau format yang Anda inginkan

**Contoh struktur:**
| Timestamp | Nama | Nomor WhatsApp | Kota | Program | Model |
|-----------|------|----------------|------|---------|-------|
|           |      |                |      |         |       |

---

## 📝 Step 2: Buat Google Apps Script

1. Di Google Sheets, klik **Extensions** → **Apps Script**
2. Hapus code default dan paste code berikut:

```javascript
function doPost(e) {
  try {
    // Parse data dari request
    const data = JSON.parse(e.postData.contents);
    
    // Buka spreadsheet (ganti SPREADSHEET_ID dengan ID dari URL sheets Anda)
    // URL format: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
    const SPREADSHEET_ID = '14KNjfxAX77Ue2lqxavjYGoMLhzVYMKyw42Br3Hc8X-U';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Helper function untuk capitalize first letter
    const capitalize = (str) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    
    // Data yang akan ditambahkan
    const timestamp = new Date();
    const rowData = [
      timestamp,                           // Timestamp
      capitalize(data.name || ''),         // Nama (capitalized)
      data.phone || '',                    // Nomor WhatsApp
      capitalize(data.location || ''),      // Kota (capitalized)
      data.program || '',                  // Program
      capitalize(data.model || '')         // Model (capitalized)
    ];
    
    // Tambahkan row baru
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'Data berhasil disimpan' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function untuk test (optional)
function doGet(e) {
  return ContentService
    .createTextOutput('Google Sheets API is working!')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. **Ganti `YOUR_SPREADSHEET_ID_HERE`** dengan ID spreadsheet Anda
   - ID bisa dilihat dari URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Contoh: Jika URL adalah `https://docs.google.com/spreadsheets/d/1abc123xyz456/edit`, maka ID adalah `1abc123xyz456`

---

## 🔐 Step 3: Deploy sebagai Web App

1. Di Apps Script editor, klik **Deploy** → **New deployment**
2. Pilih type: **Web app**
3. Settings:
   - **Description**: Lead Form Integration (opsional)
   - **Execute as**: **Me** (user account Anda)
   - **Who has access**: **Anyone** (penting untuk allow external requests)
4. Klik **Deploy**
5. **Copy Web App URL** yang muncul
   - Format: `https://script.google.com/macros/s/AKfycby.../exec`
6. Klik **Authorize access** jika diminta
   - Pilih akun Google Anda
   - Klik **Advanced** → **Go to [Project Name] (unsafe)**
   - Klik **Allow**

---

## 🔧 Step 4: Update Environment Variable

1. Tambahkan Web App URL ke environment variable:

**File: `.env.local`** (untuk local development)
```
NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Untuk Production (Cloudflare Pages):**
- Tambahkan di Cloudflare Dashboard → Pages → Settings → Environment Variables
- Variable: `NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL`
- Value: Web App URL dari Step 3

---

## ✅ Step 5: Test Integration

1. Jalankan localhost: `npm run dev`
2. Buka landing page: `http://localhost:3000/012026/general`
3. Scroll ke Lead Form section
4. Isi form dan submit
5. Cek Google Sheets - data harus muncul di row baru

---

## 🛠️ Troubleshooting

### Error: "Script function not found"
- Pastikan function name adalah `doPost`
- Pastikan deployment menggunakan latest version (klik "Manage deployments" → "Edit" → "New version")

### Error: "Access denied"
- Pastikan "Who has access" di deployment settings adalah **Anyone**
- Redeploy setelah mengubah settings

### Data tidak muncul di Sheets
- Cek Apps Script execution logs: **Executions** di sidebar Apps Script
- Pastikan SPREADSHEET_ID benar
- Pastikan sheet aktif (bukan hidden)

### CORS Error
- Google Apps Script Web App sudah handle CORS otomatis
- Pastikan menggunakan `doPost` untuk POST requests

---

## 📝 Customisasi Format Data

Jika ingin mengubah format atau menambah kolom:

1. **Update header di Google Sheets** (tambahkan kolom baru)
2. **Update `rowData` array di Apps Script** sesuai urutan kolom
3. **Update interface di LeadFormSection.tsx** jika ada field baru

Contoh untuk menambah kolom "Source":
```javascript
const rowData = [
  timestamp,
  data.name || '',
  data.phone || '',
  data.location || '',
  data.program || '',
  data.model || '',
  'Landing Page - General'  // Source column
];
```

---

## 🔒 Security Notes

1. **Web App URL bersifat publik** - jangan simpan data sensitif
2. **Rate Limiting**: Google Apps Script memiliki limit ~20 requests/detik
3. **Quota**: Free tier memiliki limit harian (tapi cukup untuk lead form normal)

---

## 🚀 Next Steps

Setelah setup selesai:
- ✅ Test dengan beberapa submission
- ✅ Setup email notification (opsional - bisa ditambahkan di Apps Script)
- ✅ Monitor data di Google Sheets
- ✅ Setup Google Data Studio untuk dashboard (opsional)
