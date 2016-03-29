var superAdminRole = { // Equivalent to Sys Admin

    name: 'superAdmin',
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

var adminRole = { // Equivalent to Super Admin

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
var userRole = { // Equivalent to Admin

    name: 'user',
    resources: [
        '/orgs',
    ],
    permissions: ['get', 'post','put', 'delete']
};

var guestRole = {
	name: 'guest',
    resources: [
        '/index',
    ],
    permissions: ['view']
};

var allRoles = [
	superAdminRole,
	adminRole,
	userRole,
	guestRole
];


// console.log(node_acl.allow(role.name, resource, role.permissions));
for(var role in allRoles){
	//console.log(allRoles[role]);
	allRoles[role].resources.forEach(function(resource){
		console.log(allRoles[role].name, resource, allRoles[role].permissions);
	});
	console.log("---------------------------------------------------------");
}
