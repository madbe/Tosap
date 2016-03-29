nodeAcl = require('acl');

//-----------------------------------------------------------------------
// The function connect to the DB and set the ACL roles
// @param conn: DB connection.
// @return acl: acl Object
//-----------------------------------------------------------------------
module.exports.connectAcl = function(conn, callback) {
    // Connect Acl to mongodb 
    conn.connection.on('connected', function (ref) {
        console.log('Connected to mongoDB server.');
        console.log("Lets do this to " + conn.connection.name);
        
        var mongoBackend = new nodeAcl.mongodbBackend(conn.connection.db, "acl_");
        acl = new nodeAcl(mongoBackend, logger('acl_'));
        console.log('aclCnfig.acl-->'+acl);
        // call The setAclRoles(acl) function and set the Routes and Roles to the ACL DB
        setAclRoles(acl);
        // return an ACL object
        callback(acl);
        
    }); //----end of connected----
}

//-------------------------------------------------------------
// setAcl set the ACL roles and permissions to route
// @param { object } acl - get acl connection and set the - role name | resources | permissions
//        with this we set the acl.allow.
//-------------------------------------------------------------  

function setAclRoles(acl){
    
        superAdminRole = { // Equivalent to Sys Admin
        name: 'super admin',
        resources: [
            '/orgs',
            '/org/new',
            '/orgs/:id',
            '/orgs/:id/edit',
            '/orgs/:id/users',
            '/orgs/:id/users/new',
            '/orgs/:id/users/:id/edit',
            '/orgs/:id/users/:id'
            ],
        permissions: '*'
    };

    adminRole = { // Equivalent to Super Admin
        name: 'admin',
        resources: [
            '/orgs/:id/users',
            '/orgs/:id/users/new',
            '/orgs/:id/users/:id/edit',
            '/orgs/:id/users/:id',
            '/orgs/:id/printers',
            '/orgs/:id/printers/new',
            '/orgs/:id/printers/:id/edit',
            '/orgs/:id/printers/:id'
            ],
        permissions: '*'
    };

    // This user can only edit the catalogs and campaigns.
    userRole = { // Equivalent to Admin
        name: 'user',
            resources: [
                '/orgs',
            ],
        permissions: ['get', 'post','put', 'delete']
    };

    guestRole = {
        name: 'guest',
        resources: [
            '/index',
        ],
        permissions: ['view']
    };

    allRoles = [
        superAdminRole,
        adminRole,
        userRole,
        guestRole
    ];
        
    //---------- now assign roles to resources & permissions-------      
    for(var role in allRoles){
        //console.log(allRoles[role]);
        allRoles[role].resources.forEach(function(resource){
            
            acl.allow(allRoles[role].name, resource, allRoles[role].permissions);
            // console.log(allRoles[role].name, resource, allRoles[role].permissions);
        });
        // console.log("---------------------------------------------------------");
    };
    //-------------------------------------------------------------
    
    // Inherit roles
    //  Every superAdmin is allowed to do what admin do
    //  Every admin is allowed to do what users do
    acl.addRoleParents( 'superAdmin', 'admin' );
    acl.addRoleParents( 'admin', 'user' );
};

// Generic debug logger for node_acl
function logger() {
    return {
        debug: function( msg ) {
            console.log( '-DEBUG-', msg );
        }
    };
}




        // acl.addUserRoles('a', 'aa')

        // acl.allow("guest", "/index", "view");

        // acl.allow("aa", "/bo/org/new", "get");


        // allow guests to view posts
        // acl.allow("guest", "/index", "view");
        // allow registered users to view and create posts
        //acl.allow("registered users", "post", ["view", "create"]);

        // allow administrators to perform any action on posts
        // acl.allow("admin", "/", "*");
        // acl.allow("sysAdmin","/bo/org/new", "*");    
    
    
    
         