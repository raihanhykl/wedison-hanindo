// Google Apps Script Code untuk Lead Form Integration
// Copy paste code ini ke Google Apps Script editor

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
