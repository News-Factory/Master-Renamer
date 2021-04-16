/*
This Function gets the Google Drive folder and iterates through each file. It first
gets the file name, uses 'replace' to search and alter the desired string, then
uses 'setName' to alter the file name to its new value.
*/

// function testMe(){
//   renameFiles('1CHPkVEgrbpzI7f8k0xnwrPFvjRZgVA49', 'Ciao', 'Hello','no')
// }

function renameFiles(folderId, searchString, replaceString, addNumbers) {
  
  // get spreadsheet for toast notifications
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // get Google Drive folder
  try {
    var parentFolder = DriveApp.getFolderById(folderId);
    var gotParent = true;
    
    // create toast popup to inform user
    ss.toast('Task has now started ...', 'Start');
  }
  catch(e) {
    ss.toast('Error getting Google Drive folder: ' + e);
    Logger.log('Error getting Google Drive folder: ' + e);
    var gotParent = false;
  }
  
  
  // proceed IF successfully get Google Drive folder
  if (gotParent) {
    
    // get sub-files
    var subFiles = parentFolder.getFiles();
    
    // cycle through each sub-file to get relevant details
    while (subFiles.hasNext()) {

      // get sub-file
      var subFile = subFiles.next();
      
      // get sub-file name
      var subFileName = subFile.getName();
      Logger.log('Sub-file name is: ' + subFileName);

      Logger.log(addNumbers);
      

      // if we said we want to add numbers
      if (addNumbers == 'yes'){

        // take out the extension in order not to have false positives (with 4 in mp4 for example)
        var minisubFileName= subFileName.split('.mp4')[0];

        // iterate through numbers 1 to 20 and check if they are already in the name
        for(var i=1; i<20; i++){

          // add a number that corresponds with the one we found
          if(minisubFileName.indexOf(i) != -1){
            var newName = subFileName.replace(searchString, replaceString+i);
          }
        }
      }else{
        // create new sub-file name
        var newName = subFileName.replace(searchString, replaceString);
      }

      Logger.log('Sub-file new name will be: ' + newName);
      
      // set new sub-file name
      subFile.setName(newName);

    }
    
    // create toast popup to inform user
    ss.toast('Task has now completed.', 'Finished');
    
  }
  else {
    // display popup error to inform user unable to get Google Drive folder
    var ui = SpreadsheetApp.getUi();
    var result = ui.alert(
      'Google Drive folder error',
      'Unable to get Google Drive folder please check correct ID',
      ui.ButtonSet.OK);
  } 
}
