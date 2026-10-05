/**
 * BwithU waitlist -> Google Sheets.
 *
 * Setup (once):
 *  1. In the sheet, put headers in row 1:  Timestamp | Email | Source
 *  2. Extensions > Apps Script, paste this file, save.
 *  3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 *  4. Copy the Web App URL into VITE_SHEETS_URL (see README).
 *
 * After editing this script, use Deploy > Manage deployments > Edit > New version,
 * so the same URL keeps working.
 */
var SHEET_NAME = 'Sheet1';
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = JSON.parse(e.postData.contents);
    var email = String(data.email || '').trim().toLowerCase();

    // Bots fill the hidden "website" field; real people never see it.
    if (data.website) return json({ result: 'success' });
    if (!EMAIL_RE.test(email) || email.length > 254) return json({ result: 'error', error: 'invalid email' });

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    var last = sheet.getLastRow();
    if (last > 1) {
      var existing = sheet.getRange(2, 2, last - 1, 1).getValues();
      for (var i = 0; i < existing.length; i++) {
        if (String(existing[i][0]).toLowerCase() === email) return json({ result: 'success', duplicate: true });
      }
    }

    sheet.appendRow([new Date(), email, String(data.source || 'website').slice(0, 40)]);
    return json({ result: 'success' });
  } catch (err) {
    return json({ result: 'error', error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
