function listSchedule() {
  //Declare room numbers and names and create arrays to save events' details and locations. Also delcare for assigning events to array.
  var rooms = [317,320,323,324,301,356,309,405,406,420,422,423,402,403,"419A","419B","419C"];
  var names = ["Room 317", "Room 320", "Room 323", "Room 324", "Graduate Student Lounge", "Rita Laden Senate Chambers", "The Joe Theatre", "Room 405", "Room 406", "Room 420", "Room 422", "Room 423", "The Good Room (402)", "The Great Room (403)", "Ballroom A", "Ballroom B", "Ballroom C"];
  var events = [];
  var eventLocs = [];
  var e = 0;
  
  //Fetch the feed and identify the entries.
  var now = new Date()
  Logger.log('Time of execution: ' + now)
  var url = 'FEED_URL_HERE';
  Logger.log('Feed URL: ' + url);
  var xml = UrlFetchApp.fetch(url).getContentText();
  var document = XmlService.parse(xml);
  var root = document.getRootElement();
  var atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  var entries = document.getRootElement().getChild('channel').getChildren('item');
  Logger.log("Events in feed = " + entries.length);
  
  //Loop checking for valid rooms and assigning events into events and eventLocs arrays.
  for (var i = 0; i < entries.length; i++) 
  {
    try 
    {
      var title = entries[i].getChild('title').getValue();
      var desc = entries[i].getChild('description').getValue();
      for (var r = 0; r < 17; r++)
      {
        if (desc == (" - CSU " + rooms[r].toString()))
        {
          events[e] = title;
          eventLocs[e] = names[r];
          Logger.log("Event " + e + ": Room " + rooms[r] + " - " + events[e]);
          e++;
        }
      }
    } 
    catch(e) 
    {
      events[0] = "No events remaining";
      Logger.log("No events remaining");
    }
  }
  
  //Open BUILDING SCHEDULE MASTER Google Spreadsheet and fetch SCEHDULE sheet. Clear the sheet to start from scratch.
  var ss = SpreadsheetApp.openById('SPREADSHEET_ID_HERE');
  var sheet = ss.getSheetByName('SCHEDULE');
  Logger.log("Google Spreadsheet: " + ss.getName() + " - " + sheet.getName());
  sheet.clear();
  
  
  //Loop to place data into spreadsheet formatted as start time, event, room, and end time.
  for (var c = 0; c < events.length; c++)
  {    
    var eventNum = (c + 1).toString();
    var startRange = 'C' + eventNum;
    var eventRange = 'A' + eventNum;
    var roomRange = 'B' + eventNum;
    var endRange = 'D' + eventNum;
    var startCell = sheet.getRange(startRange);
    var eventCell = sheet.getRange(eventRange);
    var roomCell = sheet.getRange(roomRange);
    var endCell = sheet.getRange(endRange);
    if (events[c] != "No events remaining") 
    {
      var timeNum = 0;
      var timeNum2 = 0
      var timeNum3 = 0;
      var reg1 = /[0-9]:[0-9][0-9] [A-Z]M to [0-9]:[0-9][0-9] [A-Z]M/g;
      var test1 = reg1.test(events[c]);
      var reg2 = /[0-9][0-9]:[0-9][0-9] [A-Z]M to [0-9]:[0-9][0-9] [A-Z]M/g;
      var test2 = reg2.test(events[c]);
      var reg3 = /[0-9]:[0-9][0-9] [A-Z]M to [0-9][0-9]:[0-9][0-9] [A-Z]M/g;
      var test3 = reg3.test(events[c]);
      var reg4 = /[0-9][0-9]:[0-9][0-9] [A-Z]M to [0-9][0-9]:[0-9][0-9] [A-Z]M/g;
      var test4 = reg4.test(events[c]);
      if (test4 = true)
      {
        var test5 = events[c].substring((events[c].length - 20),(events[c].length - 19));
        if (test5.match(/[a-z]/i))
        {
          timeNum = 18;
          timeNum2 = 11;
          timeNum3 = 7;
        }
        else
        {
          timeNum = 20;
          timeNum2 = 12;
          timeNum3 = 9;
        }
      } 
      else if (test3 = true)
      {
        timeNum = 19;
        timeNum2 = 12;
        timeNum3 = 8;
      }
      else if (test2 = true)
      {
        timeNum = 19;
        timeNum2 = 12;
        timeNum3 = 8;
      }
      else if (test1 = true)
      {
        timeNum = 18;
        timeNum2 = 11;
        timeNum3 = 7;
      }
      
      var event = events[c].substring(0,(events[c].length - timeNum));
      var time = events[c].substring((events[c].length - timeNum),events[c].length);
      var startTime = time.substring(0,timeNum3);
      var endTime = time.substring(timeNum2,timeNum);
    }
    else
    {
      var event = "No events remaining";
      var time = "";
      var startTime = "";
      var endTime = "";
      eventLocs[c] = "";
    }
    startCell.setValue(startTime);
    eventCell.setValue(event);
    roomCell.setValue(eventLocs[c]);
    endCell.setValue(endTime);
    Logger.log("Event placed in cells " + startRange + ", " + eventRange + ", " + roomRange + ", & " + endRange + " with tests " + timeNum + ", " + timeNum2 + ", " + timeNum3);
    Logger.log("Event: " + event + "; Room: " + eventLocs[c] + "; Start Time: " + startTime + "; End Time: " + endTime);
  }
}
