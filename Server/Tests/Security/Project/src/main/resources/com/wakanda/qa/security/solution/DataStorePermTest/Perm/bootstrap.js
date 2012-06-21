/**

* @author admin

*/

// Login as admin

application.loginByPassword("admin","admin");

// Remove all entities
ds.UpdatePerm.drop();
ds.RemovePerm.drop();

// Wait some seconds to be synch with the next instruction
wait(10);

// Init the sequence
ds.UpdatePerm.setAutoSequenceNumber(1);
ds.RemovePerm.setAutoSequenceNumber(1);

// Add an entity to check the update action
var e = ds.UpdatePerm.createEntity();
e.name = "to check update";
e.save();

// Add an entity to check the remove action
var e = ds.RemovePerm.createEntity();
e.name = "to check remove";
e.save();

// logout the admin user
application.logout();