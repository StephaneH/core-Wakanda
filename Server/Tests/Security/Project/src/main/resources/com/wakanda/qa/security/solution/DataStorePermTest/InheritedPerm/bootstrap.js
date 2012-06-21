/**

* @author admin

*/

// Login as admin

application.loginByPassword("admin","admin");

// Remove all entities
ds.InheritedUpdatePerm.drop();
ds.InheritedRemovePerm.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.InheritedUpdatePerm.setAutoSequenceNumber(1);
ds.InheritedRemovePerm.setAutoSequenceNumber(1);

// Add an entity to check the update action
var e = ds.InheritedUpdatePerm.createEntity();
e.name = "to check update";
e.save();

// Add an entity to check the remove action
var e = ds.InheritedRemovePerm.createEntity();
e.name = "to check remove";
e.save();

// logout the admin user
application.logout();