/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
/**
 * @author Ouissam
 */
 
var testCase = {
		name: "Server DataSource and Data Management",
		
        _should: {
            ignore: {
                testDropCurrentExists: true, // Not sure about the spec.
                testDropCurrentLogicNew: true, // Not sure about the spec.
                testDropCurrentLogicSelect: true // Not sure about the spec.
            }
        },
        
		/**
 		 * SD-00 isNewElement method exists
 		 */
		testIsNewElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.isNewElement);
			Y.Assert.areSame("function", typeof source.CitiesDS.isNewElement);
		},

		/**
 		 * SD-00 isNewElement method business logic
 		 */
		testIsNewElementLogic: function () {
			//Get the datasource length before method call
			var oldLength = source.CitiesDS.length ;

			//Move to the first element
			source.CitiesDS.select(0);

			//New flag should be set to false
			Y.Assert.areSame(false, source.CitiesDS.isNewElement(), "New flag should be set to false");

			//call the method
			source.CitiesDS.addNewElement();

			//length should be incremented
			var newLength = source.CitiesDS.length ;
			Y.Assert.areSame(newLength, oldLength + 1);

			//New flag should be set to true
			Y.Assert.areSame(true, source.CitiesDS.isNewElement(), "New flag should be set to true");

		},

		/**
 		 * SD-00 addNewElement method exists
 		 */
		testAddNewElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.addNewElement);
			Y.Assert.areSame("function", typeof source.CitiesDS.addNewElement);
		},

		/**
 		 * SD-00 addNewElement method business logic
 		 */
		testAddNewElementLogic: function () {
			var testRunner = this;

			//Get the datasource length before method call
			var oldLength = source.CitiesDS.length ;

			// add onCurrentElementChange event handler
			var onCurrentElementChangeFlag = false ;
			var onCurrentElementChangeHandler = function onCurrentElementChangeHandler(event){
				onCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

			// add onCollectionChange event handler
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//call the method
			source.CitiesDS.addNewElement();
				
			window.setTimeout(function () {
				testRunner.resume(function(){
					//length should be incremented
					var newLength = source.CitiesDS.length ;
					Y.Assert.areSame(newLength, oldLength + 1);
		
					//values should all be null
					Y.Assert.areSame(source.CitiesDS.ID, null, "entity value should be null");
					Y.Assert.areSame(source.CitiesDS.name, null, "entity value should be null");
					Y.Assert.areSame(source.CitiesDS.pop, null, "entity value should be null");
		
					//New flag should be set to true
					Y.Assert.areSame(true, source.CitiesDS.isNewElement(), "New flag should be set to true");
		
					//onCollectionChange event should occur
					Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");
					//onCurrentElementChange event should occur
					Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");
				});
			}, 500);
			testRunner.wait();	
		},

		/**
 		 * SD-00 serverRefresh method exists
 		 */
		testServerRefreshExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.serverRefresh);
			Y.Assert.areSame("function", typeof source.CitiesDS.serverRefresh);
		},

		/**
 		 * SD-00 serverRefresh method business logic
 		 */
		testServerRefreshLogic: function () {
			//add new element
			source.CitiesDS.addNewElement();

			var testRunner = this;
			window.setTimeout(function () {
				source.CitiesDS.serverRefresh(
					{
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called
								Y.Assert.areSame(5, source.CitiesDS.ID, "Server logic should be called");

								//nothing should be saved in the server
								window.setTimeout(function () {
									source.CitiesDS.query("ID=5",
											{
										'onSuccess': function(event){
											testRunner.resume(function(){ 
												//No entity should be returned
												Y.Assert.areSame(0, source.CitiesDS.length, "No entity should be returned");
											});
										},
										'onError': function(error){
											testRunner.resume(function(){ 
												Y.Assert.fail("Async Call to query fails !" + JSON.stringify(error.error));
											});	
										}
											}
									);
								}, 50);
								testRunner.wait();
							});
						},
						onError: function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to serverRefresh failed");
							});	
						}
					},
					this
				);
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SD-00 save method exists
 		 */
		testServerSaveExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.save);
			Y.Assert.areSame("function", typeof source.CitiesDS.save);
		},

		/**
 		 * SD-00 save method business logic when updating
 		 */
		testServerSaveLogicUpdate: function () {
			// get the test runner
			var testRunner = this;

			//get all entities
			window.setTimeout(function () {
					source.CitiesDS.allEntities(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								//Point the second element
								source.CitiesDS.select(1);

								//Edit the current element
								var id = source.CitiesDS.ID;
								source.CitiesDS.name = "Casablanca";
								source.CitiesDS.pop = 3200000;

								//call save method
								window.setTimeout(function () {
										source.CitiesDS.save(
										{
											'onSuccess': function(event){
												testRunner.resume(function(){ 
													Y.Assert.areSame("Casablanca", event.dataSource.name);
													Y.Assert.areSame(3200000, event.dataSource.pop);
													ds.City.find("ID = :1",
															{
														'params': [id],
														'onSuccess': function(event){
															testRunner.resume(function(){ 
																//Saved entity should be returned
																Y.Assert.areNotSame(null, event.entity, "Saved entity should be returned");
																Y.Assert.areSame("Casablanca", event.entity.name.getValue(), "Saved values should be the same as entered");
																Y.Assert.areSame(3200000, event.entity.pop.getValue(), "Saved values should be the same as entered");
															});
														},
														'onError': function(error){
															testRunner.resume(function(){ 
																Y.Assert.fail("Async Call to find fails !" + JSON.stringify(error));
															}); 
														}
															}
													);
													testRunner.wait();     
												});
											},
											'onError': function(error){
												testRunner.resume(function(){ 
													Y.Assert.fail("Async Call to save fails!" + JSON.stringify(error));
												}); 
											}
										}
									);
								}, 50);
								testRunner.wait();    
							});
						},
						'onError': function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async Call to allEntities fails !" + JSON.stringify(error));
							});
						}

					});
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SD-00 save method business logic when adding
 		 */
		testServerSaveLogicAddNew: function () {
			//add new element
			source.CitiesDS.addNewElement();

			var testRunner = this;
			//call serverRefresh to get the new ID
			window.setTimeout(function () {
				source.CitiesDS.serverRefresh(
					{
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called : return the new ID
								var id = source.CitiesDS.ID ;
								//Y.Assert.areSame(5, id, "Server logic should be called");

								//Edit the new element
								source.CitiesDS.name = "Rabat";
								source.CitiesDS.pop = 2000000;

								//New flag should be set to true
								Y.Assert.areSame(true, source.CitiesDS.isNewElement(), "New flag should be set to true");    

								//call save method
								window.setTimeout(function () {
									source.CitiesDS.save(
										{
											'onSuccess': function(event){
												testRunner.resume(function(){ 
													Y.Assert.areSame("Rabat", event.dataSource.name);
													Y.Assert.areSame(2000000, event.dataSource.pop);
													//Y.Assert.isFalse(event.dataSource.isNewElement(), "Saved entity shouldn't be new anymore");
													ds.City.find("ID = :1 and name = :2 and pop = :3",
															{
														'params': [id+1, "Rabat", 2000000],
														'onSuccess': function(event){
															testRunner.resume(function(){ 
																//Saved entity should be returned
																Y.Assert.areNotSame(null, event.entity, "Saved entity should be returned");
																Y.Assert.areSame("Rabat", event.entity.name.getValue(), "Saved values should be the same as entered");
																Y.Assert.areSame(2000000, event.entity.pop.getValue(), "Saved values should be the same as entered");
															});
														},
														'onError': function(error){
															testRunner.resume(function(){ 
																Y.Assert.fail("Async Call to find fails !" + JSON.stringify(error));
															}); 
														}
															}
													);
													testRunner.wait();     
												});
											},
											'onError': function(error){
												testRunner.resume(function(){ 
													Y.Assert.fail("Async Call to save fails!" + JSON.stringify(error));
												}); 
											}
										}
									);
								}, 50);
								testRunner.wait();
							});
						},
						onError: function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to serverRefresh fails");
							}); 
						}
					},
					this
				);
			}, 50);  
			testRunner.wait();
		},

		/**
 		 * SD-00 dropCurrent method exists
 		 */
		testDropCurrentExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.dropCurrent);
			Y.Assert.areSame("function", typeof source.CitiesDS.dropCurrent);
		},

		/**
 		 * SD-00 dropCurrent method business logic on a new element (just added)
 		 */
		testDropCurrentLogicNew: function () {	
			//get the test runner
			var testRunner = this;

			//get the current id
			var id = source.CitiesDS.ID;

			//call dropCurrent on current element
			window.setTimeout(function () {
				source.CitiesDS.dropCurrent(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								window.setTimeout(function () {
									ds.City.find("id = :1",
										{
									'params': [id],
									'onSuccess': function(event){
										testRunner.resume(function(){ 
											//deleted entity shouldn't be returned
											Y.Assert.areSame(null, event.entity, "deleted entity shouldn't be returned");
										});
									},
									'onError': function(error){
										testRunner.resume(function(){ 
											Y.Assert.fail("Async Call to find fails !");
										}); 
									}
										}
									);
								}, 50);
								testRunner.wait(); 
							});
						},
						'onError': function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to dropCurrent fails");
							}); 
						}
					},
					this
				);  
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SD-00 dropCurrent method business logic on a non just added element
 		 */
		testDropCurrentLogicSelect: function () {	
			//get the test runner
			var testRunner = this;
			//point the second element
			source.CitiesDS.select(1);
			//get the current id
			var id = source.CitiesDS.ID;

			//call dropCurrent on current element
			window.setTimeout(function () {
				source.CitiesDS.dropCurrent(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								window.setTimeout(function () {
									ds.City.find("id = :1",
										{
									'params': [id],
									'onSuccess': function(event){
										testRunner.resume(function(){ 
											//deleted entity shouldn't be returned
											Y.Assert.areSame(null, event.entity, "deleted entity shouldn't be returned");
										});
									},
									'onError': function(error){
										testRunner.resume(function(){ 
											Y.Assert.fail("Async Call to find fails !");
										}); 
									}
										}
									);
								}, 50);
								testRunner.wait(); 
							});
						},
						'onError': function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to dropCurrent fails");
							}); 
						}
					},
					this
				);  
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SD-00 addEntity method exists
 		 */
		testAddEntityExistsDS : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.addEntity);
			Y.Assert.areSame("function", typeof source.CitiesDS.addEntity);
		},

		/**
 		 * SD-00 addEntity method exists on a related datasource
 		 */
		testAddEntityExistsRelatedDS : function(){
			Y.Assert.areSame("function", typeof source.EmpsByCompDS.addEntity,"addEntity() should be available for a related ds");
		},

		/**
 		 * SD-00 addEntity method business logic
 		 */
		testAddEntityLogic : function(){
			//get the test runner
			var testRunner = this;

			//create a new entity
			var newEmp = new WAF.Entity(ds.Emp);
			newEmp.ID.setValue(20);
			newEmp.name.setValue("Eric Golbert");
			newEmp.salary.setValue(25000);
			newEmp.company.setValue(source.CitiesDS.getCurrentElement());

			//get the length before calling the method
			var oldLength = source.EmpsDS.length;

			//add onCurrentElementChange event listener
			var onCurrentElementChangeFlag = false;
			source.EmpsDS.addListener("onCurrentElementChange", function(event){
				onCurrentElementChangeFlag = true;
			});

			// call the method
			source.EmpsDS.addEntity(newEmp);
			
			window.setTimeout(function () {
				testRunner.resume(function(){
					//datasource length should be inctremented
					var newLength = source.EmpsDS.length;		
					Y.Assert.areSame(oldLength + 1, newLength);
		
					//the new entity should be a part of the entityCollection : position should be different from -1
					Y.Assert.areSame(newLength - 1, source.EmpsDS.getPosition());
		
		
					//current entity values should be the same as entered
					Y.Assert.areSame(20, source.EmpsDS.ID);
					Y.Assert.areSame("Eric Golbert", source.EmpsDS.name);
		
					//onCurrentElementChange event should occur
					Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event should occur");	
		
					//new entity should not be stored
					window.setTimeout(function () {
						ds.Emp.find("ID = 20", 
							{
						'onSuccess': function(event){
							testRunner.resume(function(){
								//Entity should not be stored
								Y.Assert.areSame(null, event.entity, "Entity should not be stored !");
							});
						},
						'onError': function(error){
							testRunner.resume(function(){
								Y.Assert.fail("Async call to find failed !" + JSON.stringify(error));
							});
						}
							}
		
						);
					}, 50);
					testRunner.wait();
				});
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SD-00 newEntity method exists on related datasource
 		 */
		testNewEntityExistsDS : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.newEntity);
			Y.Assert.areSame("function", typeof source.CitiesDS.newEntity);
		},

		/**
 		 * SD-00 newEntity method exists on related datasource
 		 */
		testNewEntityExistsRelatedDS : function(){
			// accroding to the doc, this method should NOW be available for related datasources (92746)
			Y.Assert.areSame("function", typeof source.EmpsByCompDS.newEntity ,"newEntity() should be available for a related ds");
		},

		/**
 		 * SD-00 newEntity method business logic
 		 */
		testNewEntityLogic : function(){
			//get the test runner
			var testRunner = this;

			//get the length before method call
			var oldLength = source.CitiesDS.length;

			//add onCurrentElementChange event listener
			var onCurrentElementChangeFlag = false;
			source.CitiesDS.addListener("onCurrentElementChange", function(event){
				onCurrentElementChangeFlag = true;
			});

			//add onCollectionChange event listener
			var onCollectionChangeFlag = false;
			source.CitiesDS.addListener("onCollectionChange", function(event){
				onCollectionChangeFlag = true;
			});

			//method call
			source.CitiesDS.newEntity();

			//datasource length should remain the same
			var newLength = source.CitiesDS.length;
			Y.Assert.areSame(oldLength, newLength, "datasource length should remain the same");

			//the new entity shouldn't be a part of the entityCollection: position should equals -1
			Y.Assert.areSame(-1, source.CitiesDS.getPosition(), "The new entity shouldn't be a part of the entityCollection: position should equals -1");

			//onCurrentElementChange event should occur
			Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event should occur");		

			//onCollectionChange event shouldn't occur
			Y.Assert.areSame(false, onCollectionChangeFlag, "onCollectionChange event shouldn't occur");		

			//values should be null		
			Y.Assert.areSame(null, source.CitiesDS.ID);
			Y.Assert.areSame(null, source.CitiesDS.name);
			Y.Assert.areSame(null, source.CitiesDS.pop);

			//entity should not be stored in the server
			window.setTimeout(function () {
				source.CitiesDS.allEntities( 
					{
						'onSuccess': function(event){
							testRunner.resume(function(){
								Y.Assert.areSame(oldLength, source.CitiesDS.length, "Entity should not be stored in the server");
							});
						},
						'onError': function(event){
							testRunner.resume(function(){
								Y.Assert.fail("Async call failed !");
							});
						}
					}

				);
			}, 50);
			testRunner.wait();
		},
		
		/**
 		 * SD-00 setEntityCollection method exists
 		 */
		testSetEntityCollectionExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.setEntityCollection);
		},

		/**
 		 * SD-00 setEntityCollection method business logic
 		 */
		testSetEntityCollectionLogic : function(){
			//get the test runner
			var testRunner = this;

			//call query method
			window.setTimeout(function () {
				source.EmpsDS.query("salary > 60000 and salary < 120000",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						//Returned entityCollection should match the query conditions
						Y.Assert.areSame(6, source.EmpsDS.length, "Returned entityCollection should match the query conditions");

						// add onCurrentElementChange event handler
						var onCurrentElementChangeFlag = false ;
						var onCurrentElementChangeHandler = function onCurrentElementChangeHandler(event){
							onCurrentElementChangeFlag = true ;
						}
						source.EmpsDS_.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

						// add onCollectionChange event handler
						var onCollectionChangeFlag = false ;
						var onCollectionChangeHandler = function onCollectionChangeHandler(event){
							onCollectionChangeFlag = true ;
						}
						source.EmpsDS_.addListener("onCollectionChange", onCollectionChangeHandler);

						//call filterQuery method
						source.EmpsDS_.setEntityCollection(source.EmpsDS.getEntityCollection());

						//onCollectionChangeevent should occur
						Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

						//onCurrentElementChange event should occur
						Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");

						//entityCollection should be filtered
						Y.Assert.areSame(6, source.EmpsDS_.length, "entityCollection should be filtered");

					});
				},
				'onError': function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async Call to query fails !");
					});	
				}
					}
				);
			}, 50);
			testRunner.wait();				
		}
};