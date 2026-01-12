# 🔄 Cara Update Google Apps Script untuk Capitalize

## ⚠️ Penting: Data Lama Tidak Akan Berubah

Data yang sudah masuk sebelum update **tidak akan berubah**. Hanya data **baru** yang masuk setelah update yang akan ter-capitalize.

---

## 📋 Langkah Update Google Apps Script

### Step 1: Buka Google Apps Script

1. Buka Google Sheets Anda: https://docs.google.com/spreadsheets/d/14KNjfxAX77Ue2lqxavjYGoMLhzVYMKyw42Br3Hc8X-U/edit
2. Klik **Extensions** → **Apps Script**

### Step 2: Copy Code Baru

Copy **SEMUA** code dari file `GOOGLE_APPS_SCRIPT_CODE.js` di project ini, atau copy code di bawah ini:

```javascript
function doPost(e) {
  try {
    // Parse data dari request
    const data = JSON.parse(e.postData.contents);
    
    // Buka spreadsheet
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

### Step 3: Replace Code di Apps Script

1. **Hapus semua code lama** di Apps Script editor
2. **Paste code baru** yang sudah di-copy
3. **Save** (Ctrl+S atau Cmd+S)

### Step 4: Deploy Ulang (PENTING!)

1. Klik **Deploy** → **Manage deployments**
2. Klik **Edit** (pencil icon) pada deployment yang aktif
3. Klik **New version** (penting! jangan skip ini)
4. Klik **Deploy**
5. **Jangan ubah Web App URL** - tetap gunakan yang sama

### Step 5: Test

1. Submit form baru di landing page
2. Cek Google Sheets
3. Data baru harus ter-capitalize:
   - Nama: "test" → "Test"
   - Kota: "jakarta" → "Jakarta"  
   - Model: "bees" → "Bees"

---

## ✅ Checklist

- [ ] Code sudah di-replace di Apps Script editor
- [ ] Code sudah di-save
- [ ] Sudah deploy ulang dengan **New version**
- [ ] Test submit form baru
- [ ] Cek data baru di Sheets - harus ter-capitalize

---

## 🔍 Troubleshooting

### Data Masih Tidak Ter-Capitalize?

1. **Pastikan sudah deploy dengan New version** (bukan hanya save)
2. **Tunggu 1-2 menit** setelah deploy (Google perlu waktu untuk update)
3. **Test dengan form submission baru** (data lama tidak akan berubah)
4. **Cek Apps Script execution logs**: Executions → lihat apakah ada error

### Error di Execution Logs?

- Cek apakah SPREADSHEET_ID benar
- Cek apakah sheet tidak locked/hidden
- Pastikan function name adalah `doPost` (case sensitive)

---

## 📝 Catatan

- **Data lama tidak akan berubah** - ini normal
- Hanya data **baru** setelah update yang akan ter-capitalize
- Jika ingin update data lama, harus manual edit di Sheets atau buat script terpisah
