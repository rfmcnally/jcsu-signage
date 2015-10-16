function listVendors() {
  //Sets date for now and one second from now to check if event is happening at current moment.
  var now = new Date();
  var oneSecondFromNow = new Date(now.getTime() + (1000));
  
  //Open the Google Spreadsheet VENDOR HOURS MASTER and the sheet VENDORS.
  var ss = SpreadsheetApp.openById('1L_YOi62TmuB3aDYlPzLljHJPydPjPotHI7gf5GNeAso');
  Logger.log(ss.getName());
  var sheet = ss.getSheetByName('VENDORS');
  Logger.log(sheet.getSheetId());
  
  //Declares arrays with cells range, calendar IDs, and vendors' names.
  var cells = ['B1','B2','B3','B4','B5','B6','B7','B8','B9'];
  var calendars = ['eihmd2fdt8cqpioln578q37v0g@group.calendar.google.com','oj4clat18jhu4o47474n75anp0@group.calendar.google.com','0ot2jlb0rk217aoupdme01hah8@group.calendar.google.com','6j94aohtkatinigu70ad7k8n5c@group.calendar.google.com','irajhkfv4c2og708nggr1li5h4@group.calendar.google.com','jfk3ssl39u3484a3tirdnmgftg@group.calendar.google.com','236r6gd317gudbpv7pl6v6h0bc@group.calendar.google.com','rhu0jehh9p6tlkm56t2q86ll04@group.calendar.google.com','eccc5q4d7683c83oeb13u1pv28@group.calendar.google.com'];
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
