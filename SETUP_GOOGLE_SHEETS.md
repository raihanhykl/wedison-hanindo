# 🚀 Quick Setup Google Sheets Integration

## ⚠️ Internal Server Error? 

Jika Anda mendapat "internal server error", kemungkinan:
1. **Environment variable belum di-set** (paling umum)
2. **Google Apps Script belum di-deploy**

---

## 📋 Quick Fix (5 menit)

### Step 1: Setup Google Sheets & Apps Script

1. **Buka Google Sheets** → Buat spreadsheet baru
2. **Buat header** di baris pertama:
   ```
   Timestamp | Nama | Nomor WhatsApp | Kota | Program | Model
   ```
3. **Extensions** → **Apps Script**
4. **Paste code ini:**

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const SPREADSHEET_ID = '14KNjfxAX77Ue2lqxavjYGoMLhzVYMKyw42Br3Hc8X-U';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Helper function untuk capitalize first letter
    const capitalize = (str) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    
    const timestamp = new Date();
    const rowData = [
      timestamp,
      capitalize(data.name || ''),      // Nama (capitalized)
      data.phone || '',
      capitalize(data.location || ''),  // Kota (capitalized)
      data.program || '',
      capitalize(data.model || '')       // Model (capitalized)
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data berhasil disimpan' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. **Ganti `SPREADSHEET_ID`** dengan ID dari URL sheets Anda
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Contoh: URL `https://docs.google.com/spreadsheets/d/1abc123xyz/edit`
   - Maka ID adalah: `1abc123xyz`

### Step 2: Deploy Google Apps Script

1. **Deploy** → **New deployment**
2. **Type**: Web app
3. **Execute as**: Me
4. **Who has access**: **Anyone** ⚠️ (PENTING!)
5. **Deploy** → Copy Web App URL yang muncul

### Step 3: Set Environment Variable

Buat file `.env.local` di root project (sama level dengan `package.json`):

```env
NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Ganti `YOUR_SCRIPT_ID`** dengan URL dari Step 2.

**Contoh:**
```env
NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/AKfycbx123abc456/exec
```

### Step 4: Restart Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## ✅ Test

1. Buka: `http://localhost:3000/012026/general`
2. Scroll ke Lead Form section
3. Isi form dan submit
4. Cek Google Sheets - data harus muncul!

---

## 🔍 Troubleshooting

### Error: "Server configuration error"
- ✅ Pastikan file `.env.local` ada di root project
- ✅ Pastikan variable name: `NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL`
- ✅ Restart dev server setelah menambah `.env.local`

### Error: "Failed to save data"
- ✅ Pastikan Google Apps Script sudah di-deploy
- ✅ Pastikan "Who has access" = **Anyone**
- ✅ Cek Apps Script execution logs

### Data tidak muncul di Sheets
- ✅ Cek Apps Script logs: **Executions** di sidebar
- ✅ Pastikan SPREADSHEET_ID benar
- ✅ Pastikan sheet tidak hidden/locked

---

## 📖 Dokumentasi Lengkap

Lihat: `docs/GOOGLE_SHEETS_SETUP.md` untuk detail lengkap.
