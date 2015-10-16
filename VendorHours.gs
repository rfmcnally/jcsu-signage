function listVendors() {
  //Sets date for now and one second from now to check if event is happening at current moment.
  var now = new Date();
  var oneSecondFromNow = new Date(now.getTime() + (1000));
  
  //Open the Google Spreadsheet VENDOR HOURS MASTER and the sheet VENDORS.
  var ss = SpreadsheetApp.openById('SPREADSHEET_ID_HERE');
  Logger.log(ss.getName());
  var sheet = ss.getSheetByName('VENDORS');
  Logger.log(sheet.getSheetId());
  
  //Declares arrays with cells range, calendar IDs, and vendors' names.
  var cells = ['B1','B2','B3','B4','B5','B6','B7','B8','B9'];
  var calendars = ['CALENDAR_ID1','CALEDNAR_ID2','CALENDAR_ID3','CALENDAR_ID4','CALENDAR_ID5','CALENDAR_ID6','CALENDAR_ID7','CALENDAR_ID8','CALENDAR_ID9'];
  var vendors = ['Cantina','Einsteins','GFGardens','Keva','Panda','PortSubs','Starbucks','USwirl','WolfShop'];
  
  //Starts loop that checks for event in list and sets value as OPEN or CLOSED.
  for (i = 0; i < 9; i++)
  {
    var cell = sheet.getRange(cells[i]);
    var calendar = CalendarApp.getCalendarById(calendars[i]);
    var event = calendar.getEvents(now, oneSecondFromNow);
    if (event.length > 0) 
    {
      cell.setValue('OPEN');
    } 
    else
    {
      cell.setValue('CLOSED');
    }
    Logger.log(vendors[i] + ': ' + cell.getValue());
  }
}
