README.md

Todo:
 * set the views to ejs template. - done
 * fix the route to work with the ejs. - done
 * build the organization page and route.
 * build the printer route.
 * add morgan for loging.
 * add the Roles and Permissions modules.
 * add the ACL module.
 * add email registertion module.
 * add password reset module.

ToCheack:
 * debug on server not working.

Process:
	Sign up a new organization super admin:
        * the super admin add the Organization and then send a registrtion email
          to the admin user of that Organization.
 		* the admin click the registrtion link and get a sign up from. and compliate
          the registration process. and redirect to the appropriate page.
   		* the user click the registrtion link and get a sign up from. and the same
          as the admin compliate the registrtion process.
   		* After filling out the form and submit, he can use the system.
		--------------------------------------------------------------	
   	    
          
* adding the ACL - Access Control List module.
 
RESTFUL ROUTES

Create new Organization
name      url      verb    desc.
===============================================
INDEX   /orgs      GET   Display a list of all orgs
NEW     /orgs/new  GET   Displays form to create a new org
CREATE  /orgs      POST  Add new org to DB
SHOW    /orgs/:id  GET   Shows info about one org

EDIT    /orgs/:id/edit  GET     Show edit from for one org
UPDATE  /orgs/:id       PUT     Update specific org, and then redirect somewhere
DELETE  /orgs/:id       DELETE  Delete specific org, and then redirect somewhere

Assign a admin/user to Organization.
name      url                    verb    desc.
=================================================================
INDEX   /orgs/:id/users       GET   Display a list of all users
NEW     /orgs/:id/users/new   GET   Displays form to create a new user
CREATE  /orgs/:id/users       POST  Add new user to DB
SHOW    /orgs/:id/users/:id   GET   Shows info about one user

Assign a printers to Organization.
name      url                    verb    desc.
=================================================================
INDEX   /orgs/:id/printers       GET   Display a list of all printers
NEW     /orgs/:id/printers/new   GET   Displays form to create a new printer
CREATE  /orgs/:id/printers       POST  Add new printer to DB
SHOW    /orgs/:id/printers/:id   GET   Shows info about one printer