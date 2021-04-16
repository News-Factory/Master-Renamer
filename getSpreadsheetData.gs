/*
The base of this script was find in this blog page: https://www.pbainbridge.co.uk/2019/09/bulk-rename-files-in-google-drive.html
Refer there for basic understanding/modifications.

This Function gets the necessary data from the spreadsheet.
*/

function getSpreadsheetData() {
  
  // get spreadsheet
  var ss = SpreadsheetApp.getActiveSheet();
  
  // get folder Id
  var folderId = ss.getRange(6, 4).getValue();
  Logger.log('Folder Id is: ' + folderId);
  
  // get search pattern
  var searchString = ss.getRange(10, 4).getValue();
  Logger.log('Search string is: ' + searchString);
  
  // get string to replace with
  var replaceString = ss.getRange(14, 4).getValue();
  Logger.log('Replace with string is: ' + replaceString);

  var addNumbers = ss.getRange(14, 6).getValue();
  Logger.log('Your answer to adding numbers is: '+addNumbers);
  
  // run Function to rename files
  renameFiles(folderId, searchString, replaceString, addNumbers);
  
}
