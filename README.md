## Programming Things – Group Project Specification

### Project Title
High security access management system
Project Description
An access management system that allows users to request access to a specific resource, be it a locked room, or expensive equipment. A graphical display of access management which covers all workflows. E.g. requesting access, approving access, sending email clarification, denying access and removing access etc… The project will be a ‘proof of concept’ application, to simulate access within a workforce. 
### Project implementation
We will use Arduinos with RFID scanners to simulate locked doors or cabinets for equipment.
We will create a graphical application for employees to use to request access to said rooms/ equipment. This information will be stored in a database.
We will use MQTT to send information from our backend database to our Arduinos. Allowing granting access or not.
We will create a real-time database to store information about employees and their access privileges, which can be modified using the application/ GUI mentioned above.
There will be separate levels of access for each employee:
-	Admin
-	Room Admin
-	Employee

### Application workflows:
-	Requesting access to a room
o	Employee requests access and gives a reason
o	Email is sent to Room Admin
o	Room admin either approves or denies the request via application.
o	Database is updated for user and updates their permissions for requested room.
o	Application update no of users for said room.
o	User is emailed saying they now have access to this room.
-	Removing access to a room
o	Room Admin or Admin accesses the application.
o	They alone can see who has access to each room.
o	They highlight a user and select privileges.
o	They remove access privileges to the room.
o	The user gets notified via email that their access has been removed.
-	Adding a room to the system
o	Admin creates a room.
o	Admin assigns room admins from a pool of users.
o	They are notified via email.
-	Removing a room from the system

### Additional features
-	Super-secret rooms which require facial recognition.
-	Take a picture of people who are trying to access rooms, with or without permissions, for security reasons.
