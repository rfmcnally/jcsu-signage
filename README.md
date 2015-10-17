# JCSU: Digital Signage
The Joe Crowley Student Union has public digital signage placed throughout the building. Some display which vendors in the building are still open and others displays a list of the events taking place in the building on that day. During the upgrade to Rise Vision from Visix, a new way was needed to get the data to these displays.I decided to go with Google Apps Script, which is based on JavaScript, because it integrated well with Google products that we were already using and provided free automation with triggers that execute the code every 5 minutes. 

Vendors each have their own Google Calendar which they create events in to signal when they're open. The app checks each calendar for if an event is currently scheduled in the calendar. If it is, then it updates a Google Spreasheet cell to say OPEN and otherwise says CLOSE. The building's schedule is fetched from an RSS feed generated by EMS. The app takes this RSS feed, searches for the correct rooms, parses the data, and then saves it into a Google Spreadsheet. Rise Vision then displays these Google Spreadsheets on the displays.
