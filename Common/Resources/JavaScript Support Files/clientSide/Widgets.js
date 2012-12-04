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
 *
 * Updated 25 January 2012
 *
 * @class Widgets
 * @extends Object
 *
 */
Widget = function Widget() {
    
    
    /**
     * returns an object containing an object for each widget in the Web Component
     *
     * @property widgets
     * @attributes 
     * @type Object
     */
    this.widgets =  {}; 
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes ReadOnly
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes ReadOnly
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes ReadOnly
     * @type String
     */
    this.label =  ''; 
    
    /**
     * 
     *
     * @property id
     * @attributes ReadOnly
     * @type String
     */
    this.id =  ''; 
    
    /**
     * 
     *
     * @property domNode
     * @attributes ReadOnly
     * @type String
     */
    this.domNode =  ''; 
    
    /**
     * 
     *
     * @property config
     * @attributes ReadOnly
     * @type Object
     */
    this.config =  {}; 
    
    /**
     * 
     *
     * @property renderId
     * @attributes ReadOnly
     * @type String
     */
    this.renderId =  ''; 
    
    /**
     * 
     *
     * @property format
     * @attributes ReadOnly
     * @type Object
     */
    this.format =  {}; 
    
    /**
     * 
     *
     * @property errorDiv
     * @attributes ReadOnly
     * @type String
     */
    this.errorDiv =  ''; 
    
    /**
     * 
     *
     * @property kind
     * @attributes ReadOnly
     * @type String
     */
    this.kind =  ''; 
    
    
    /**
     * toggle the Switch widget to either &quot;on&quot; or &quot;off&quot;
     *
     * @method toggleSlide
     */
    this.toggleSlide = function toggleSlide() {             };
    
    /**
     * set the Switch widget to either &quot;on&quot; or &quot;off&quot;
     *
     * @method slide
     * @param {Boolean} state
     */
    this.slide = function slide(state) {             };
    
    /**
     * returns an object that defines the currently selected tab
     *
     * @method getSelectedTab
     * @return {Object}
     */
    this.getSelectedTab = function getSelectedTab() {        return {};     };
    
    /**
     * returns the Container object for the tab specified by tabNumber
     *
     * @method getTabContainer
     * @param {Number} tabNumber
     * @return {Object}
     */
    this.getTabContainer = function getTabContainer(tabNumber) {        return {};     };
    
    /**
     * number of tabs currently displayed
     *
     * @method countTabs
     * @return {Number}
     */
    this.countTabs = function countTabs() {        return 0;     };
    
    /**
     * remove a tab displayed in the [#title id&#61;&quot;2804&quot;/] widget
     *
     * @method removeTab
     * @param {Number} tab
     */
    this.removeTab = function removeTab(tab) {             };
    
    /**
     * add a tab to the [#title id&#61;&quot;2804&quot;/] widget
     *
     * @method addTab
     * @param {String} title
     * @param {Boolean} closable
     */
    this.addTab = function addTab(title, closable) {             };
    
    /**
     * select a specific tab and display its contents
     *
     * @method selectTab
     * @param {Number} tab
     */
    this.selectTab = function selectTab(tab) {             };
    
    /**
     * find the entities  whose values were entered in the fields of the Query Form  widget
     *
     * @method findEntity
     */
    this.findEntity = function findEntity() {             };
    
    /**
     * save the data entered in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method saveEntity
     */
    this.saveEntity = function saveEntity() {             };
    
    /**
     * go to the next entity in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method nextEntity
     */
    this.nextEntity = function nextEntity() {             };
    
    /**
     * go to the previous entity in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method prevEntity
     */
    this.prevEntity = function prevEntity() {             };
    
    /**
     * drop the current entity in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method dropEntity
     */
    this.dropEntity = function dropEntity() {             };
    
    /**
     * find the entities whose values were entered in the widgets in the Auto Form widget
     *
     * @method findEntity
     */
    this.findEntity = function findEntity() {             };
    
    /**
     * add an additional handle to the [#title id&#61;&quot;1798&quot;/] widget
     *
     * @method addHandle
     * @param {Number} number
     */
    this.addHandle = function addHandle(number) {             };
    
    /**
     * load a Web Component already present in your project into the Component widget on your Interface page
     *
     * @method loadComponent
     * @param {String} webComponent
     * @param {Object} componentObject
     */
    this.loadComponent = function loadComponent(webComponent, componentObject) {             };
    
    /**
     * remove the Web Component currently loaded in the Component widget
     *
     * @method removeComponent
     */
    this.removeComponent = function removeComponent() {             };
    
    /**
     * refresh the [#title id&#61;&quot;2535&quot;/] widget to display the current user
     *
     * @method refresh
     */
    this.refresh = function refresh() {             };
    
    /**
     * display the login dialog so that the user can enter his/her username and password
     *
     * @method showLoginDialog
     */
    this.showLoginDialog = function showLoginDialog() {             };
    
    /**
     * log the current user out of the application
     *
     * @method logout
     */
    this.logout = function logout() {             };
    
    /**
     * pass the username and password to login a user in the [#title id&#61;&quot;2535&quot;/] widget
     *
     * @method login
     * @param {String} username
     * @param {String} password
     */
    this.login = function login(username, password) {             };
    
    /**
     * resets the column&#39;s sort indicators
     *
     * @method resetSortIndicator
     * @param {Number} column
     */
    this.resetSortIndicator = function resetSortIndicator(column) {             };
    
    /**
     * reduces the current selection of rows in the Grid to the ones that are selected
     *
     * @method reduceToSelected
     * @param {Object} options
     * @param {Object} userData
     */
    this.reduceToSelected = function reduceToSelected(options, userData) {             };
    
    /**
     * returns an object with two properties, colNb and order, that define how the Grid is currently being sorted
     *
     * @method getSortIndicator
     * @return {Object}
     */
    this.getSortIndicator = function getSortIndicator() {        return {};     };
    
    /**
     * returns the number of selected rows
     *
     * @method countSelected
     * @return {Number}
     */
    this.countSelected = function countSelected() {        return 0;     };
    
    /**
     * retrieve the selected rows
     *
     * @method getSelectedRows
     * @return {Array}
     */
    this.getSelectedRows = function getSelectedRows() {        return [];     };
    
    /**
     * returns the Selection mode
     *
     * @method getSelectionMode
     * @return {String}
     */
    this.getSelectionMode = function getSelectionMode() {        return '';     };
    
    /**
     * returns an object of type Column to which you can apply other functions in the [#title id&#61;&quot;2858&quot;/] class
     *
     * @method column
     * @param {Number | String} columnRef
     * @return {Column}
     */
    this.column = function column(columnRef) {        return new Column( );     };
    
    /**
     * set the selection mode of the [#title id&#61;&quot;811&quot;/] widget to either &quot;single&quot; or &quot;multiple&quot;
     *
     * @method setSelectionMode
     * @param {String} mode
     */
    this.setSelectionMode = function setSelectionMode(mode) {             };
    
    /**
     * set the Grid to be in read only or read/write mode
     *
     * @method setReadOnly
     * @param {Boolean} mode
     */
    this.setReadOnly = function setReadOnly(mode) {             };
    
    /**
     * 
     *
     * @method setSortIndicator
     * @param {Number} column
     * @param {String} sortOrder
     */
    this.setSortIndicator = function setSortIndicator(column, sortOrder) {             };
    
    /**
     * either collapses the left container in a vertically split [#title id&#61;&quot;1801&quot;/] widget and shows the Left Splitter Button
     *
     * @method mobileSplitView
     * @param {Boolean} popupDisplay
     */
    this.mobileSplitView = function mobileSplitView(popupDisplay) {             };
    
    /**
     * expands the first container in a previously split [#title id&#61;&quot;1801&quot;/] widget
     *
     * @method expandSplitter
     */
    this.expandSplitter = function expandSplitter() {             };
    
    /**
     * Set the position of the splitter in the Container widget
     *
     * @method setSplitPosition
     * @param {Number} number
     */
    this.setSplitPosition = function setSplitPosition(number) {             };
    
    /**
     * retrieve the current position of the Container widget&#39;s splitter
     *
     * @method getSplitPosition
     * @return {Number}
     */
    this.getSplitPosition = function getSplitPosition() {        return 0;     };
    
    /**
     * collapses the first container in a previously split [#title id&#61;&quot;1801&quot;/] widget
     *
     * @method collapseSplitter
     */
    this.collapseSplitter = function collapseSplitter() {             };
    
    /**
     * sends a request to the server to interrupt the session
     *
     * @method userBreak
     */
    this.userBreak = function userBreak() {             };
    
    /**
     * begins sending requests to the server in order to display the progress of the session associated with the [#title id&#61;&quot;1800&quot;/] widget
     *
     * @method startListening
     */
    this.startListening = function startListening() {             };
    
    /**
     * stops sending requests to the server in order to display the progress of the session associated with the widget
     *
     * @method stopListening
     */
    this.stopListening = function stopListening() {             };
    
    /**
     * unchecks the checkbox and sets its value to false
     *
     * @method uncheck
     */
    this.uncheck = function uncheck() {             };
    
    /**
     * checks the checkbox and sets its value to true or unchecks it and sets its value to false
     *
     * @method toggleCheckbox
     */
    this.toggleCheckbox = function toggleCheckbox() {             };
    
    /**
     * checks the checkbox and sets its value to true
     *
     * @method check
     */
    this.check = function check() {             };
    
    /**
     * display the previous page in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToPreviousPage
     */
    this.goToPreviousPage = function goToPreviousPage() {             };
    
    /**
     * display the next page in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToNextPage
     */
    this.goToNextPage = function goToNextPage() {             };
    
    /**
     * display the last element in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToLast
     */
    this.goToLast = function goToLast() {             };
    
    /**
     * display the first element in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToFirst
     */
    this.goToFirst = function goToFirst() {             };
    
    /**
     * go to a specific element in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goTo
     * @param {Number} element
     */
    this.goTo = function goTo(element) {             };
    
    /**
     * returns the total number of pages in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method getTotalPages
     * @return {Number}
     */
    this.getTotalPages = function getTotalPages() {        return 0;     };
    
    /**
     * returns the currently displayed row in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method getDisplayedRow
     * @return {Number}
     */
    this.getDisplayedRow = function getDisplayedRow() {        return 0;     };
    
    /**
     * returns the current page number in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method getCurrentPage
     * @return {Number}
     */
    this.getCurrentPage = function getCurrentPage() {        return 0;     };
    
    /**
     * unlink one widget from another widget
     *
     * @method unlink
     * @param {Widget} widget
     */
    this.unlink = function unlink(widget) {             };
    
    /**
     * link a widget to another widget
     *
     * @method link
     * @param {Widget} widget
     */
    this.link = function link(widget) {             };
    
    /**
     * enable data entry in a widget
     *
     * @method enable
     */
    this.enable = function enable() {             };
    
    /**
     * disable the data entry in a widget
     *
     * @method disable
     */
    this.disable = function disable() {             };
    
    /**
     * set a [#title id&#61;&quot;1801&quot;/] widget as the parent of a widget
     *
     * @method setParent
     * @param {Widget} widget
     */
    this.setParent = function setParent(widget) {             };
    
    /**
     * add a widget as a &quot;child,&quot; which means that it will be contained in the &quot;parent&quot; widget
     *
     * @method addChild
     * @param {Widget} widget
     */
    this.addChild = function addChild(widget) {             };
    
    /**
     * sets the right position of the widget
     *
     * @method setRight
     * @param {Number} right
     */
    this.setRight = function setRight(right) {             };
    
    /**
     * sets the bottom position of the widget
     *
     * @method setBottom
     * @param {Number} bottom
     */
    this.setBottom = function setBottom(bottom) {             };
    
    /**
     * sets the top position of the widget
     *
     * @method setTop
     * @param {Number} top
     */
    this.setTop = function setTop(top) {             };
    
    /**
     * sets the left position of the widget
     *
     * @method setLeft
     * @param {Number} left
     */
    this.setLeft = function setLeft(left) {             };
    
    /**
     * returns the widget&#39;s position
     *
     * @method getPosition
     * @return {Object}
     */
    this.getPosition = function getPosition() {        return {};     };
    
    /**
     * returns the height of the widget
     *
     * @method getHeight
     * @return {Number}
     */
    this.getHeight = function getHeight() {        return 0;     };
    
    /**
     * set the height of the widget
     *
     * @method setHeight
     * @param {Number} height
     */
    this.setHeight = function setHeight(height) {             };
    
    /**
     * set the width of the widget
     *
     * @method setWidth
     * @param {Number} width
     */
    this.setWidth = function setWidth(width) {             };
    
    /**
     * returns an array of objects where each object defines a widget linked to the main widget
     *
     * @method getLinks
     * @return {Array}
     */
    this.getLinks = function getLinks() {        return [];     };
    
    /**
     * returns an array of objects where each object defines a widget included in the parent widget
     *
     * @method getChildren
     * @return {Array}
     */
    this.getChildren = function getChildren() {        return [];     };
    
    /**
     * add a CSS class to your widget
     *
     * @method addClass
     * @param {String} cssClass
     */
    this.addClass = function addClass(cssClass) {             };
    
    /**
     * removes the cssClass from the widget
     *
     * @method removeClass
     * @param {String} cssClass
     */
    this.removeClass = function removeClass(cssClass) {             };
    
    /**
     * sets the widget&#39;s label&#39;s text color to textColor
     *
     * @method setLabelTextColor
     * @param {String} textColor
     */
    this.setLabelTextColor = function setLabelTextColor(textColor) {             };
    
    /**
     * Set the text for the widget&#39;s label or the Button widget&#39;s text
     *
     * @method setLabelText
     * @param {String} labelText
     */
    this.setLabelText = function setLabelText(labelText) {             };
    
    /**
     * set the value for a widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {             };
    
    /**
     * returns the value displayed in the widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {        return '';     };
    
    /**
     * put the focus on a widget on the Interface page
     *
     * @method focus
     */
    this.focus = function focus() {             };
    
    /**
     * show a hidden widget on the Interface page
     *
     * @method show
     */
    this.show = function show() {             };
    
    /**
     * set the widget&#39;s tab index defined in the Tabindex property
     *
     * @method setTabIndex
     * @param {Number} tabIndex
     */
    this.setTabIndex = function setTabIndex(tabIndex) {             };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {             };
    
    /**
     * resizes the widget to its new height and width
     *
     * @method resize
     * @param {String | Number} height
     * @param {String | Number} width
     */
    this.resize = function resize(height, width) {             };
    
    /**
     * activates or disactivates the ability to resize the widget
     *
     * @method resizable
     * @param {Boolean} boolean
     */
    this.resizable = function resizable(boolean) {             };
    
    /**
     * remove a particular listener or all listeners previously added by the addListener( ) method
     *
     * @method removeListener
     * @param {String} event
     * @param {String} callback
     */
    this.removeListener = function removeListener(event, callback) {             };
    
    /**
     * redraw the widget on the Interface page
     *
     * @method redraw
     */
    this.redraw = function redraw() {             };
    
    /**
     * hides the widget on the Interface page
     *
     * @method hide
     * @param {String} mode
     */
    this.hide = function hide(mode) {             };
    
    /**
     * returns True if the widget has the focus and False if it does not
     *
     * @method hasFocus
     * @return {Boolean}
     */
    this.hasFocus = function hasFocus() {        return true;     };
    
    /**
     * returns the jQuery reference to the Display Error widget ID defined in the properties for the widget
     *
     * @method getErrorDiv
     * @return {String}
     */
    this.getErrorDiv = function getErrorDiv() {        return '';     };
    
    /**
     * returns the theme(s) defined for the widget
     *
     * @method getTheme
     * @return {String}
     */
    this.getTheme = function getTheme() {        return '';     };
    
    /**
     * activate or disactivate the draggable option for the widget
     *
     * @method draggable
     * @param {Boolean} boolean
     */
    this.draggable = function draggable(boolean) {             };
    
    /**
     * deletes the widget from the Interface page and removes all the listeners associated to it
     *
     * @method destroy
     */
    this.destroy = function destroy() {             };
    
    /**
     * clears the value displayed in the widget
     *
     * @method clear
     */
    this.clear = function clear() {             };
    
    /**
     * returns the width of the widget
     *
     * @method getWidth
     * @return {Number}
     */
    this.getWidth = function getWidth() {        return 0;     };
    
    /**
     * add a listener to the widget for a specific event
     *
     * @method addListener
     * @param {String} event
     * @param {String} callback
     * @param {Object} options
     */
    this.addListener = function addListener(event, callback, options) {             };
    
    /**
     * set the Display Error for the widget
     *
     * @method setErrorDiv
     * @param {String} errorDiv
     */
    this.setErrorDiv = function setErrorDiv(errorDiv) {             };
    
    /**
     * toggle the display of the widget
     *
     * @method toggle
     * @param {String} mode
     */
    this.toggle = function toggle(mode) {             };
    
    /**
     * returns the &quot;parent&quot; widget for the widget to which it is applied
     *
     * @method getParent
     * @return {Widget}
     */
    this.getParent = function getParent() {        return new Widget( );     };
    
    /**
     * add widgets as &quot;children,&quot; which means that they will be contained in the &quot;parent&quot; widget
     *
     * @method addChildren
     * @param {Widget} widget
     */
    this.addChildren = function addChildren(widget) {             };
    
    /**
     * sets the widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {             };
    
    /**
     * move the widget to its new left and top coordinates
     *
     * @method move
     * @param {String | Number} left
     * @param {String | Number} top
     */
    this.move = function move(left, top) {             };
    
    /**
     * Clears the error message for the widget displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method clearErrorMessage
     */
    this.clearErrorMessage = function clearErrorMessage() {             };
    
    /**
     * Sets the error message for the widget that will be displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method setErrorMessage
     * @param {Object} messageObject
     */
    this.setErrorMessage = function setErrorMessage(messageObject) {             };
    

};


Switch = function Switch() {
    
    
    
    /**
     * toggle the Switch widget to either &quot;on&quot; or &quot;off&quot;
     *
     * @method toggleSlide
     */
    this.toggleSlide = function toggleSlide() {             };
    
    /**
     * set the Switch widget to either &quot;on&quot; or &quot;off&quot;
     *
     * @method slide
     * @param {Boolean} state
     */
    this.slide = function slide(state) {             };
    

};


Tab View = function Tab View() {
    
    
    
    /**
     * returns an object that defines the currently selected tab
     *
     * @method getSelectedTab
     * @return {Object}
     */
    this.getSelectedTab = function getSelectedTab() {        return {};     };
    
    /**
     * returns the Container object for the tab specified by tabNumber
     *
     * @method getTabContainer
     * @param {Number} tabNumber
     * @return {Object}
     */
    this.getTabContainer = function getTabContainer(tabNumber) {        return {};     };
    
    /**
     * number of tabs currently displayed
     *
     * @method countTabs
     * @return {Number}
     */
    this.countTabs = function countTabs() {        return 0;     };
    
    /**
     * remove a tab displayed in the [#title id&#61;&quot;2804&quot;/] widget
     *
     * @method removeTab
     * @param {Number} tab
     */
    this.removeTab = function removeTab(tab) {             };
    
    /**
     * add a tab to the [#title id&#61;&quot;2804&quot;/] widget
     *
     * @method addTab
     * @param {String} title
     * @param {Boolean} closable
     */
    this.addTab = function addTab(title, closable) {             };
    
    /**
     * select a specific tab and display its contents
     *
     * @method selectTab
     * @param {Number} tab
     */
    this.selectTab = function selectTab(tab) {             };
    

};


Query Form = function Query Form() {
    
    
    
    /**
     * find the entities  whose values were entered in the fields of the Query Form  widget
     *
     * @method findEntity
     */
    this.findEntity = function findEntity() {             };
    

};


Auto Form = function Auto Form() {
    
    
    
    /**
     * save the data entered in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method saveEntity
     */
    this.saveEntity = function saveEntity() {             };
    
    /**
     * go to the next entity in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method nextEntity
     */
    this.nextEntity = function nextEntity() {             };
    
    /**
     * go to the previous entity in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method prevEntity
     */
    this.prevEntity = function prevEntity() {             };
    
    /**
     * drop the current entity in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method dropEntity
     */
    this.dropEntity = function dropEntity() {             };
    
    /**
     * find the entities whose values were entered in the widgets in the Auto Form widget
     *
     * @method findEntity
     */
    this.findEntity = function findEntity() {             };
    

};


Slider = function Slider() {
    
    
    
    /**
     * add an additional handle to the [#title id&#61;&quot;1798&quot;/] widget
     *
     * @method addHandle
     * @param {Number} number
     */
    this.addHandle = function addHandle(number) {             };
    

};


Component = function Component() {
    
    
    /**
     * returns an object containing an object for each widget in the Web Component
     *
     * @property widgets
     * @attributes 
     * @type Object
     */
    this.widgets =  {}; 
    
    
    /**
     * load a Web Component already present in your project into the Component widget on your Interface page
     *
     * @method loadComponent
     * @param {String} webComponent
     * @param {Object} componentObject
     */
    this.loadComponent = function loadComponent(webComponent, componentObject) {             };
    
    /**
     * remove the Web Component currently loaded in the Component widget
     *
     * @method removeComponent
     */
    this.removeComponent = function removeComponent() {             };
    

};


Login = function Login() {
    
    
    
    /**
     * refresh the [#title id&#61;&quot;2535&quot;/] widget to display the current user
     *
     * @method refresh
     */
    this.refresh = function refresh() {             };
    
    /**
     * display the login dialog so that the user can enter his/her username and password
     *
     * @method showLoginDialog
     */
    this.showLoginDialog = function showLoginDialog() {             };
    
    /**
     * log the current user out of the application
     *
     * @method logout
     */
    this.logout = function logout() {             };
    
    /**
     * pass the username and password to login a user in the [#title id&#61;&quot;2535&quot;/] widget
     *
     * @method login
     * @param {String} username
     * @param {String} password
     */
    this.login = function login(username, password) {             };
    

};


Grid = function Grid() {
    
    
    
    /**
     * resets the column&#39;s sort indicators
     *
     * @method resetSortIndicator
     * @param {Number} column
     */
    this.resetSortIndicator = function resetSortIndicator(column) {             };
    
    /**
     * reduces the current selection of rows in the Grid to the ones that are selected
     *
     * @method reduceToSelected
     * @param {Object} options
     * @param {Object} userData
     */
    this.reduceToSelected = function reduceToSelected(options, userData) {             };
    
    /**
     * returns an object with two properties, colNb and order, that define how the Grid is currently being sorted
     *
     * @method getSortIndicator
     * @return {Object}
     */
    this.getSortIndicator = function getSortIndicator() {        return {};     };
    
    /**
     * returns the number of selected rows
     *
     * @method countSelected
     * @return {Number}
     */
    this.countSelected = function countSelected() {        return 0;     };
    
    /**
     * retrieve the selected rows
     *
     * @method getSelectedRows
     * @return {Array}
     */
    this.getSelectedRows = function getSelectedRows() {        return [];     };
    
    /**
     * returns the Selection mode
     *
     * @method getSelectionMode
     * @return {String}
     */
    this.getSelectionMode = function getSelectionMode() {        return '';     };
    
    /**
     * returns an object of type Column to which you can apply other functions in the [#title id&#61;&quot;2858&quot;/] class
     *
     * @method column
     * @param {Number | String} columnRef
     * @return {Column}
     */
    this.column = function column(columnRef) {        return new Column( );     };
    
    /**
     * set the selection mode of the [#title id&#61;&quot;811&quot;/] widget to either &quot;single&quot; or &quot;multiple&quot;
     *
     * @method setSelectionMode
     * @param {String} mode
     */
    this.setSelectionMode = function setSelectionMode(mode) {             };
    
    /**
     * set the Grid to be in read only or read/write mode
     *
     * @method setReadOnly
     * @param {Boolean} mode
     */
    this.setReadOnly = function setReadOnly(mode) {             };
    
    /**
     * 
     *
     * @method setSortIndicator
     * @param {Number} column
     * @param {String} sortOrder
     */
    this.setSortIndicator = function setSortIndicator(column, sortOrder) {             };
    

};


Container = function Container() {
    
    
    
    /**
     * either collapses the left container in a vertically split [#title id&#61;&quot;1801&quot;/] widget and shows the Left Splitter Button
     *
     * @method mobileSplitView
     * @param {Boolean} popupDisplay
     */
    this.mobileSplitView = function mobileSplitView(popupDisplay) {             };
    
    /**
     * expands the first container in a previously split [#title id&#61;&quot;1801&quot;/] widget
     *
     * @method expandSplitter
     */
    this.expandSplitter = function expandSplitter() {             };
    
    /**
     * Set the position of the splitter in the Container widget
     *
     * @method setSplitPosition
     * @param {Number} number
     */
    this.setSplitPosition = function setSplitPosition(number) {             };
    
    /**
     * retrieve the current position of the Container widget&#39;s splitter
     *
     * @method getSplitPosition
     * @return {Number}
     */
    this.getSplitPosition = function getSplitPosition() {        return 0;     };
    
    /**
     * collapses the first container in a previously split [#title id&#61;&quot;1801&quot;/] widget
     *
     * @method collapseSplitter
     */
    this.collapseSplitter = function collapseSplitter() {             };
    

};


Progress Bar = function Progress Bar() {
    
    
    
    /**
     * sends a request to the server to interrupt the session
     *
     * @method userBreak
     */
    this.userBreak = function userBreak() {             };
    
    /**
     * begins sending requests to the server in order to display the progress of the session associated with the [#title id&#61;&quot;1800&quot;/] widget
     *
     * @method startListening
     */
    this.startListening = function startListening() {             };
    
    /**
     * stops sending requests to the server in order to display the progress of the session associated with the widget
     *
     * @method stopListening
     */
    this.stopListening = function stopListening() {             };
    

};


Checkbox = function Checkbox() {
    
    
    
    /**
     * unchecks the checkbox and sets its value to false
     *
     * @method uncheck
     */
    this.uncheck = function uncheck() {             };
    
    /**
     * checks the checkbox and sets its value to true or unchecks it and sets its value to false
     *
     * @method toggleCheckbox
     */
    this.toggleCheckbox = function toggleCheckbox() {             };
    
    /**
     * checks the checkbox and sets its value to true
     *
     * @method check
     */
    this.check = function check() {             };
    

};


Grid Column = function Grid Column() {
    
    
    
    /**
     * sets the column width to width (expressed in pixels) for column
     *
     * @method setWidth
     * @param {Number} width
     */
    this.setWidth = function setWidth(width) {             };
    
    /**
     * set the text size of the column to textSize in your Grid widget
     *
     * @method setTextSize
     * @param {Number} textSize
     */
    this.setTextSize = function setTextSize(textSize) {             };
    
    /**
     * call a function for each cell in a column
     *
     * @method setRenderer
     * @param {Function} function
     */
    this.setRenderer = function setRenderer(function) {             };
    
    /**
     * set the display format to format for the data in column
     *
     * @method setFormat
     * @param {String} format
     */
    this.setFormat = function setFormat(format) {             };
    
    /**
     * set column&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {             };
    
    /**
     * set column&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {             };
    
    /**
     * retrieve the value in a cell defined by column and the currently selected row
     *
     * @method getValueForInput
     */
    this.getValueForInput = function getValueForInput() {             };
    
    /**
     * retrieve the formatted value in a cell defined by column and the currently selected row
     *
     * @method getFormattedValue
     * @return {String}
     */
    this.getFormattedValue = function getFormattedValue() {        return '';     };
    

};


Matrix = function Matrix() {
    
    
    
    /**
     * display the previous page in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToPreviousPage
     */
    this.goToPreviousPage = function goToPreviousPage() {             };
    
    /**
     * display the next page in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToNextPage
     */
    this.goToNextPage = function goToNextPage() {             };
    
    /**
     * display the last element in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToLast
     */
    this.goToLast = function goToLast() {             };
    
    /**
     * display the first element in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToFirst
     */
    this.goToFirst = function goToFirst() {             };
    
    /**
     * go to a specific element in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goTo
     * @param {Number} element
     */
    this.goTo = function goTo(element) {             };
    
    /**
     * returns the total number of pages in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method getTotalPages
     * @return {Number}
     */
    this.getTotalPages = function getTotalPages() {        return 0;     };
    
    /**
     * returns the currently displayed row in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method getDisplayedRow
     * @return {Number}
     */
    this.getDisplayedRow = function getDisplayedRow() {        return 0;     };
    
    /**
     * returns the current page number in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method getCurrentPage
     * @return {Number}
     */
    this.getCurrentPage = function getCurrentPage() {        return 0;     };
    

};

