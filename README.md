Breakdown of work:

March 26th (Started Work on 1st Sprint (EDIT AND DELETE Functions))
Chris Poon:
I worked on the following tasks:
1. Edit a Reminder Implementation - Researched how to create the `update` method.
2. Edit a Reminder Implementation - Successfully completed the `edit` method by adding the 
``` searchResult.title = req.body.title;
    searchResult.description = req.body.description;
```
and adding an if statement for the "True/False Reminder Completed" Radio Button.

Keziah Wacnang:
I worked on the following tasks:
- looked at how the `create` method worked 
- Research on using `findIndex()` and `splice()` functions for the `delete` method
- Worked on and finished the `delete` method in `reminder_controller.js` 

April 4th (Started Work on 2nd Sprint (Passport Implementation))
Chris Poon:
I worked on the following tasks:
1. Added Passport Functionality - I added the passport code from my passportStarterCode project to the remindly index.js
2. Added Routes for Login Functionality -  I added the login route from my passportStarterCode project to the remindly index.js
3. Fixed Paths - Fixed the redirect paths for the login page

April 9th (Formatted web pages and cleaned up code)
Chris Poon:
I worked on the following tasks:
1. Added "Welcome User" Functionality - The name of the current user that is logged in will be displayed on the top of reminders page(s)
2. Debugged and tested - Test specific user login with create/edit and delete functionality in web
3. Added log out button - Added log out button in reminder page(s)

April 9th (2nd sprint)
Keziah Wacnang:
I worked on the following tasks:
1. fixed some code regarding using the findByID, because some code were using findById, where it should be findByID.
2. rearranged and added people into the database along with some reminders
   1. added the same users from the passport lab
3. editted reminder_controller.js: used req.user instead of cindy
4. fixed the ejs for index.ejs

April 11th (2nd sprint)
Keziah Wacnang:
I worked on the following tasks:
1. watched some videos and read documentation for express-session and how they work
2. Added functionality where if you are not the current user it redirects you to the login page instead of the reminders page
   1. helpful if the session expired
3. added roles, for admin and user so when admin logs in they can see a button to take them to the admin page
   1. Also editted the reminder/index.ejs to add the button and make it redirect
4. added getSessions to get all current active sessions on the server
5. added revoke functionality to destroy sessions
