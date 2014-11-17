/*
* This file is part of Wakanda software,licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3),or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event,Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently,no title,copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/

/**
 * @extends Object
 */
function Widget(){}
Widget.prototype.id= ''; 
Widget.prototype.domNode= ''; 
Widget.prototype.config= {}; 
Widget.prototype.kind=''; 
Widget.prototype.Basics= ''; 
Widget.prototype.unlink=function(){};
Widget.prototype.link=function(){};
Widget.prototype.setParent=function(){};
Widget.prototype.addChild=function(){};
Widget.prototype.setRight=function(){};
Widget.prototype.setBottom=function(){};
Widget.prototype.setTop=function(){};
Widget.prototype.setLeft=function(){};
Widget.prototype.getPosition=function(){ return {}; };
Widget.prototype.getHeight=function(){ return 0; };
Widget.prototype.setHeight=function(){};
Widget.prototype.setWidth=function(){};
Widget.prototype.getLinks=function(){ return []; };
Widget.prototype.getChildren=function(){ return []; };
Widget.prototype.addClass=function(){};
Widget.prototype.removeClass=function(){};
Widget.prototype.show=function(){};
Widget.prototype.resize=function(){};
Widget.prototype.resizable=function(){};
Widget.prototype.removeListener=function(){};
Widget.prototype.redraw=function(){};
Widget.prototype.hide=function(){};
Widget.prototype.getTheme=function(){ return ''; };
Widget.prototype.draggable=function(){};
Widget.prototype.destroy=function(){};
Widget.prototype.getWidth=function(){ return 0; };
Widget.prototype.addListener=function(){};
Widget.prototype.toggle=function(){};
Widget.prototype.getParent=function(){ return new Widget(); };
Widget.prototype.addChildren=function(){};
Widget.prototype.move=function(){};
Widget.prototype.rebuild=function(){};
Widget.prototype.isVisible=function(){ return true; };
Widget.prototype.removeState=function(){};
Widget.prototype.getState=function(){ return ''; };
Widget.prototype.setState=function(){};

/**
 * @extends Widget
 * @return {Widget}
 */
function $$(){}

/**
 * @extends Object
 * @return {$}
 */
function $(){}
$.ajax=function(){};
$.ajaxPrefilter=function(){};
$.ajaxSetup=function(){};
$.ajaxTransport=function(){};
$.boxModel=false;
$.browser={};
$.Callbacks=function(){};
$.contains=function(){};
$.cssHooks={};
$.data=function(){};
$.Deferred=function(){};
$.dequeue=function(){};
$.each=function(){};
$.error=function(){};
$.extend=function(){};
$.get=function(){};
$.getJSON=function(){};
$.getScript=function(){};
$.globalEval=function(){};
$.grep=function(){};
$.hasData=function(){};
$.holdReady=function(){};
$.inArray=function(){};
$.isArray=function(){};
$.isEmptyObject=function(){};
$.isFunction=function(){};
$.isNumeric=function(){};
$.isPlainObject=function(){};
$.isWindow=function(){};
$.isXMLDoc=function(){};
$.makeArray=function(){};
$.map=function(){};
$.merge=function(){};
$.noConflict=function(){};
$.noop=function(){};
$.now=function(){};
$.param=function(){};
$.parseJSON=function(){};
$.parseXML=function(){};
$.post=function(){};
$.prototype={};
$.proxy=function(){};
$.queue=function(){};
$.sub=function(){};
$.support={};
$.trim=function(){};
$.type=function(){};
$.unique=function(){};
$.when=function(){};
$.prototype.add=function(){};
$.prototype.addClass=function(){};
$.prototype.after=function(){};
$.prototype.ajaxComplete=function(){};
$.prototype.ajaxError=function(){};
$.prototype.ajaxSend=function(){};
$.prototype.ajaxStart=function(){};
$.prototype.ajaxStop=function(){};
$.prototype.ajaxSuccess=function(){};
$.prototype.andSelf=function(){};
$.prototype.animate=function(){};
$.prototype.append=function(){};
$.prototype.appendTo=function(){};
$.prototype.attr=function(){};
$.prototype.before=function(){};
$.prototype.bind=function(){};
$.prototype.blur=function(){};
$.prototype.change=function(){};
$.prototype.children=function(){};
$.prototype.clearQueue=function(){};
$.prototype.click=function(){};
$.prototype.clone=function(){};
$.prototype.closest=function(){};
$.prototype.contents=function(){};
$.prototype.context={};
$.prototype.css=function(){};
$.prototype.data=function(){};
$.prototype.dblclick=function(){};
$.prototype.delay=function(){};
$.prototype.delegate=function(){};
$.prototype.dequeue=function(){};
$.prototype.detach=function(){};
$.prototype.die=function(){};
$.prototype.each=function(){};
$.prototype.empty=function(){};
$.prototype.end=function(){};
$.prototype.eq=function(){};
$.prototype.error=function(){};
$.prototype.fadeIn=function(){};
$.prototype.fadeOut=function(){};
$.prototype.fadeTo=function(){};
$.prototype.fadeToggle=function(){};
$.prototype.filter=function(){};
$.prototype.find=function(){};
$.prototype.first=function(){};
$.prototype.focus=function(){};
$.prototype.focusin=function(){};
$.prototype.focusout=function(){};
$.prototype.get=function(){};
$.prototype.has=function(){};
$.prototype.hasClass=function(){};
$.prototype.height=function(){};
$.prototype.hide=function(){};
$.prototype.hover=function(){};
$.prototype.html=function(){};
$.prototype.index=function(){};
$.prototype.innerHeight=function(){};
$.prototype.innerWidth=function(){};
$.prototype.insertAfter=function(){};
$.prototype.insertBefore=function(){};
$.prototype.is=function(){};
$.prototype.jquery="";
$.prototype.keydown=function(){};
$.prototype.keypress=function(){};
$.prototype.keyup=function(){};
$.prototype.last=function(){};
$.prototype.length=0;
$.prototype.live=function(){};
$.prototype.load=function(){};
$.prototype.map=function(){};
$.prototype.mousedown=function(){};
$.prototype.mouseenter=function(){};
$.prototype.mouseleave=function(){};
$.prototype.mousemove=function(){};
$.prototype.mouseout=function(){};
$.prototype.mouseover=function(){};
$.prototype.mouseup=function(){};
$.prototype.next=function(){};
$.prototype.nextAll=function(){};
$.prototype.nextUntil=function(){};
$.prototype.not=function(){};
$.prototype.off=function(){};
$.prototype.offset=function(){};
$.prototype.offsetParent=function(){};
$.prototype.on=function(){};
$.prototype.one=function(){};
$.prototype.outerHeight=function(){};
$.prototype.outerWidth=function(){};
$.prototype.parent=function(){};
$.prototype.parents=function(){};
$.prototype.parentsUntil=function(){};
$.prototype.position=function(){};
$.prototype.prepend=function(){};
$.prototype.prependTo=function(){};
$.prototype.prev=function(){};
$.prototype.prevAll=function(){};
$.prototype.prevUntil=function(){};
$.prototype.promise=function(){};
$.prototype.prop=function(){};
$.prototype.pushStack=function(){};
$.prototype.queue=function(){};
$.prototype.ready=function(){};
$.prototype.remove=function(){};
$.prototype.removeAttr=function(){};
$.prototype.removeClass=function(){};
$.prototype.removeData=function(){};
$.prototype.removeProp=function(){};
$.prototype.replaceAll=function(){};
$.prototype.replaceWith=function(){};
$.prototype.resize=function(){};
$.prototype.scroll=function(){};
$.prototype.scrollLeft=function(){};
$.prototype.scrollTop=function(){};
$.prototype.select=function(){};
$.prototype.selector="";
$.prototype.serialize=function(){};
$.prototype.serializeArray=function(){};
$.prototype.show=function(){};
$.prototype.siblings=function(){};
$.prototype.size=function(){};
$.prototype.slice=function(){};
$.prototype.slideDown=function(){};
$.prototype.slideToggle=function(){};
$.prototype.slideUp=function(){};
$.prototype.stop=function(){};
$.prototype.submit=function(){};
$.prototype.text=function(){};
$.prototype.toArray=function(){};
$.prototype.toggle=function(){};
$.prototype.toggleClass=function(){};
$.prototype.trigger=function(){};
$.prototype.triggerHandler=function(){};
$.prototype.unbind=function(){};
$.prototype.undelegate=function(){};
$.prototype.unload=function(){};
$.prototype.unwrap=function(){};
$.prototype.val=function(){};
$.prototype.width=function(){};
$.prototype.wrap=function(){};
$.prototype.wrapAll=function(){};
$.prototype.wrapInner=function(){};

/**
 * @extends Widget
 * @constructor
 */
function Accordion(){}
Accordion.prototype.toggleSection = function(){};
Accordion.prototype.isCollapsed = function(){ return true; };
Accordion.prototype.getNumberOfSections = function(){ return 0; };
Accordion.prototype.expandAll = function(){};
Accordion.prototype.expand = function(){};
Accordion.prototype.collapseAll = function(){};
Accordion.prototype.collapse = function(){};
Accordion.prototype.isDisabled = function(){ return true; };
Accordion.prototype.enable = function(){};
Accordion.prototype.disable = function(){};

/**
 * @extends Widget
 * @constructor
 */
function AutoForm(){}
AutoForm.prototype.sourceAtt = new DatasourceAttribute();
AutoForm.prototype.source = new DataSource();
AutoForm.prototype.errorDiv = '';
AutoForm.prototype.sourceAtts = new DatasourceAttribute();
AutoForm.prototype.saveEntity = function(){};
AutoForm.prototype.nextEntity = function(){};
AutoForm.prototype.prevEntity = function(){};
AutoForm.prototype.dropEntity = function(){};
AutoForm.prototype.findEntity = function(){};
AutoForm.prototype.clear = function(){};
AutoForm.prototype.addEntity = function(){};
AutoForm.prototype.getErrorDiv = function(){ return ''; };
AutoForm.prototype.setErrorMessage = function(){};
AutoForm.prototype.setErrorDiv = function(){};
AutoForm.prototype.setTextColor = function(){};
AutoForm.prototype.clearErrorMessage = function(){};

/**
 * @extends Widget
 * @constructor
 */
function Button(){}
Button.prototype.sourceAtt = new DatasourceAttribute();
Button.prototype.source = new DataSource();
Button.prototype.getValue = function(){ return ''; };
Button.prototype.setTabIndex = function(){};
Button.prototype.setURL = function(){};
Button.prototype.getURL = function(){ return ''; };
Button.prototype.isDisabled = function(){ return true; };
Button.prototype.setTextColor = function(){};
Button.prototype.setValue = function(){};
Button.prototype.enable = function(){};
Button.prototype.disable = function(){};
Button.prototype.hasFocus = function(){ return true; };
Button.prototype.focus = function(){};

/**
 * @extends Widget
 * @constructor
 */
function ButtonImage(){}
ButtonImage.prototype.sourceAtt = new DatasourceAttribute();
ButtonImage.prototype.source = new DataSource();
ButtonImage.prototype.isDisabled = function(){ return true; };
ButtonImage.prototype.enable = function(){};
ButtonImage.prototype.disable = function(){};
ButtonImage.prototype.setTextColor = function(){};
ButtonImage.prototype.setBackgroundColor = function(){};
ButtonImage.prototype.setTabIndex = function(){};
ButtonImage.prototype.hasFocus = function(){ return true; };
ButtonImage.prototype.focus = function(){};
ButtonImage.prototype.setURL = function(){};
ButtonImage.prototype.getURL = function(){ return ''; };
ButtonImage.prototype.getIcon = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function Calendar(){}
Calendar.prototype.sourceAtt = new DatasourceAttribute();
Calendar.prototype.source = new DataSource();
Calendar.prototype.label = '';
Calendar.prototype.format = {};
Calendar.prototype.clear = function(){};
Calendar.prototype.setBackgroundColor = function(){};
Calendar.prototype.getLabel = function(){ return {}; };
Calendar.prototype.getValue = function(){ return ''; };
Calendar.prototype.setValue = function(){};
Calendar.prototype.getSelectionMode = function(){ return ''; };

/**
 * @extends Widget
 * @constructor
 */
function Canvas(){}
Canvas.prototype.sourceAtt = new DatasourceAttribute();
Canvas.prototype.source = new DataSource();
Canvas.prototype.label = '';
Canvas.prototype.setBackgroundColor = function(){};
Canvas.prototype.getLabel = function(){ return {}; };
Canvas.prototype.getCanvas = function(){ return {}; };
Canvas.prototype.get2DContext = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function Chart(){}
Chart.prototype.sourceAtt = new DatasourceAttribute();
Chart.prototype.source = new DataSource();
Chart.prototype.colors = [];
Chart.prototype.getLabels = function(){ return []; };
Chart.prototype.getValues = function(){ return []; };
Chart.prototype.setBackgroundColor = function(){};
Chart.prototype.recreateChart = function(){};
Chart.prototype.getChartType = function(){ return ''; };

/**
 * @extends Widget
 * @constructor
 */
function Checkbox(){}
Checkbox.prototype.errorDiv = '';
Checkbox.prototype.sourceAtt = new DatasourceAttribute();
Checkbox.prototype.source = new DataSource();
Checkbox.prototype.label = '';
Checkbox.prototype.uncheck = function(){};
Checkbox.prototype.toggleCheckbox = function(){};
Checkbox.prototype.check = function(){};
Checkbox.prototype.clear = function(){};
Checkbox.prototype.setErrorMessage = function(){};
Checkbox.prototype.setErrorDiv = function(){};
Checkbox.prototype.getErrorDiv = function(){ return ''; };
Checkbox.prototype.clearErrorMessage = function(){};
Checkbox.prototype.hasFocus = function(){ return true; };
Checkbox.prototype.focus = function(){};
Checkbox.prototype.setTabIndex = function(){};
Checkbox.prototype.getValue = function(){ return ''; };
Checkbox.prototype.setValue = function(){};
Checkbox.prototype.isDisabled = function(){ return true; };
Checkbox.prototype.enable = function(){};
Checkbox.prototype.disable = function(){};
Checkbox.prototype.getLabel = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function Combobox(){}
Combobox.prototype.label = '';
Combobox.prototype.sourceOut = new DataSource();
Combobox.prototype.sourceAtt = new DatasourceAttribute();
Combobox.prototype.source = new DataSource();
Combobox.prototype.addOption = function(){};
Combobox.prototype.enable = function(){};
Combobox.prototype.disable = function(){};
Combobox.prototype.hasFocus = function(){ return true; };
Combobox.prototype.focus = function(){};
Combobox.prototype.setTabIndex = function(){};
Combobox.prototype.setValue = function(){};
Combobox.prototype.getValue = function(){ return ''; };
Combobox.prototype.getLabel = function(){ return {}; };
Combobox.prototype.removeOption = function(){};

/**
 * @extends Widget
 * @constructor
 */
function Component(){}
Component.prototype.widgets = {};
Component.prototype.sources = {};
Component.prototype.loadComponent = function(){};
Component.prototype.removeComponent = function(){};
Component.prototype.isDisabled = function(){ return true; };
Component.prototype.enable = function(){};
Component.prototype.disable = function(){};
Component.prototype.setBackgroundColor = function(){};

/**
 * @extends Widget
 * @constructor
 */
function Container(){}
Container.prototype.label = '';
Container.prototype.mobileSplitView = function(){};
Container.prototype.toggleSplitter = function(){};
Container.prototype.expandSplitter = function(){};
Container.prototype.setSplitPosition = function(){};
Container.prototype.getSplitPosition = function(){ return 0; };
Container.prototype.collapseSplitter = function(){};
Container.prototype.isDisabled = function(){ return true; };
Container.prototype.enable = function(){};
Container.prototype.disable = function(){};
Container.prototype.setBackgroundColor = function(){};
Container.prototype.getLabel = function(){ return {}; };
Container.prototype.hasSplitter = function(){ return true; };

/**
 * @extends Widget
 * @constructor
 */
function Dialog(){}
Dialog.prototype.isDisabled = function(){ return true; };
Dialog.prototype.enable = function(){};
Dialog.prototype.disable = function(){};
Dialog.prototype.minimizeDialog = function(){};
Dialog.prototype.maximizeDialog = function(){};
Dialog.prototype.displayDialog = function(){};
Dialog.prototype.closeDialog = function(){};

/**
 * @extends Widget
 * @constructor
 */
function ErrorDiv(){}
ErrorDiv.prototype.setTextColor = function(){};
ErrorDiv.prototype.setBackgroundColor = function(){};

/**
 * @extends Widget
 * @constructor
 */
function FileUpload(){}
FileUpload.prototype.label = '';
FileUpload.prototype.getLabel = function(){ return {}; };
FileUpload.prototype.uploadFiles = function(){};
FileUpload.prototype.setFiles = function(){};
FileUpload.prototype.appendFiles = function(){};
FileUpload.prototype.setNotificationStatus = function(){};
FileUpload.prototype.setMaximumFileSize = function(){};
FileUpload.prototype.getMaximumFileSize = function(){ return ''; };
FileUpload.prototype.setMaximumFiles = function(){};
FileUpload.prototype.getMaximumFiles = function(){ return 0; };
FileUpload.prototype.setFolderName = function(){};
FileUpload.prototype.getFolderName = function(){ return ''; };
FileUpload.prototype.setFileUploadText = function(){};
FileUpload.prototype.getFileUploadText = function(){ return ''; };
FileUpload.prototype.removeFile = function(){};
FileUpload.prototype.removeAll = function(){};
FileUpload.prototype.getFiles = function(){ return []; };

/**
 * @extends Widget
 * @constructor
 */
function Frame(){}
Frame.prototype.sourceAtt = new DatasourceAttribute();
Frame.prototype.source = new DataSource();
Frame.prototype.label = '';
Frame.prototype.getFrame = function(){ return {}; };
Frame.prototype.setValue = function(){};
Frame.prototype.getValue = function(){ return ''; };
Frame.prototype.setBackgroundColor = function(){};
Frame.prototype.getLabel = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function GoogleMaps(){}
GoogleMaps.prototype.source = new DataSource();
GoogleMaps.prototype.sourceAtt = new DatasourceAttribute();
GoogleMaps.prototype.label = '';
GoogleMaps.prototype.setZoom = function(){};
GoogleMaps.prototype.setMarker = function(){};
GoogleMaps.prototype.setIconMarker = function(){};
GoogleMaps.prototype.setCenter = function(){};
GoogleMaps.prototype.getLabel = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function Grid(){}
Grid.prototype.sourceAtt = new DatasourceAttribute();
Grid.prototype.source = new DataSource();
Grid.prototype.label = '';
Grid.prototype.errorDiv = '';
Grid.prototype.originalWidth = '';
Grid.prototype.att = new DatasourceAttribute();
Grid.prototype.title = '';
Grid.prototype.width = '';
Grid.prototype.readOnly = true;
Grid.prototype.format = {};
Grid.prototype.resetSortIndicator = function(){};
Grid.prototype.reduceToSelected = function(){};
Grid.prototype.getSortIndicator = function(){ return {}; };
Grid.prototype.countSelected = function(){ return 0; };
Grid.prototype.getSelectedRows = function(){ return []; };
Grid.prototype.getSelectionMode = function(){ return ''; };
Grid.prototype.column = function(){};
Grid.prototype.setSelectionMode = function(){};
Grid.prototype.setReadOnly = function(){};
Grid.prototype.setSortIndicator = function(){};
Grid.prototype.getLabel = function(){ return {}; };
Grid.prototype.setErrorMessage = function(){};
Grid.prototype.setErrorDiv = function(){};
Grid.prototype.getErrorDiv = function(){ return ''; };
Grid.prototype.clearErrorMessage = function(){};
Grid.prototype.isReadOnly = function(){ return true; };
Grid.prototype.error = function(){};
Grid.prototype.setSelectedRows = function(){};
Grid.prototype.centerRow = function(){};
Grid.prototype.getRowHeight = function(){ return 0; };
Grid.prototype.setRowHeight = function(){};
Grid.prototype.setWidth = function(){};
Grid.prototype.setTextSize = function(){};
Grid.prototype.setRenderer = function(){};
Grid.prototype.setFormat = function(){};
Grid.prototype.setTextColor = function(){};
Grid.prototype.setBackgroundColor = function(){};
Grid.prototype.getValueForInput = function(){};
Grid.prototype.getFormattedValue = function(){ return ''; };
Grid.prototype.setAlignment = function(){};

/**
 * @extends Widget
 * @constructor
 */
function Icon(){}
Icon.prototype.label = '';
Icon.prototype.setBackgroundColor = function(){};
Icon.prototype.getLabel = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function Image(){}
Image.prototype.sourceAtt = new DatasourceAttribute();
Image.prototype.source = new DataSource(); 
Image.prototype.label = '';
Image.prototype.clear = function(){};
Image.prototype.setBackgroundColor = function(){};
Image.prototype.setValue = function(){};
Image.prototype.getValue = function(){ return ''; };
Image.prototype.getLabel = function(){ return {}; };
Image.prototype.setURL = function(){};
Image.prototype.getURL = function(){ return ''; };

/**
 * @extends Widget
 * @constructor
 */
function Label(){}
Label.prototype.linkedWidget = '';
Label.prototype.setValue = function(){};
Label.prototype.setTextColor = function(){};
Label.prototype.setBackgroundColor = function(){};
Label.prototype.getValue = function(){ return ''; };

/**
 * @extends Widget
 * @constructor
 */
function ListView(){}
ListView.prototype.label = '';
ListView.prototype.isDisabled = function(){ return true; };
ListView.prototype.getLabel = function(){ return {}; };
ListView.prototype.enable = function(){};
ListView.prototype.disable = function(){};

/**
 * @extends Widget
 * @constructor
 */
function Login(){}
Login.prototype.labels = {};
Login.prototype.refresh = function(){};
Login.prototype.showLoginDialog = function(){};
Login.prototype.logout = function(){};
Login.prototype.login = function(){};
Login.prototype.setTextColor = function(){};
Login.prototype.setBackgroundColor = function(){};

/**
 * @extends Widget
 * @constructor
 */
function Matrix(){}
Matrix.prototype.goToPreviousPage = function(){};
Matrix.prototype.goToNextPage = function(){};
Matrix.prototype.goToLast = function(){};
Matrix.prototype.goToFirst = function(){};
Matrix.prototype.goTo = function(){};
Matrix.prototype.getTotalPages = function(){ return 0; };
Matrix.prototype.getDisplayedRow = function(){ return 0; };
Matrix.prototype.getCurrentPage = function(){ return 0; };
Matrix.prototype.setBackgroundColor = function(){};

/**
 * @extends Widget
 * @constructor
 */
function MenuBar(){}
MenuBar.prototype.isDisabled = function(){ return true; };
MenuBar.prototype.enable = function(){};
MenuBar.prototype.disable = function(){};
MenuBar.prototype.getSelectedMenuItem = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function MenuItem(){}
MenuItem.prototype.renameMenuItem = function(){};
MenuItem.prototype.setBackgroundColor = function(){};
MenuItem.prototype.setTextColor = function(){};
MenuItem.prototype.isDisabled = function(){ return true; };
MenuItem.prototype.enable = function(){};
MenuItem.prototype.disable = function(){};

/**
 * @extends Widget
 * @constructor
 */
function NavigationView(){}
NavigationView.prototype.viewsList = {};
NavigationView.prototype.isDisabled = function(){ return true; };
NavigationView.prototype.enable = function(){};
NavigationView.prototype.disable = function(){};
NavigationView.prototype.goToNextView = function(){};
NavigationView.prototype.goToPreviousView = function(){};
NavigationView.prototype.goToView = function(){};

/**
 * @extends Widget
 * @constructor
 */
function Popover(){}
Popover.prototype.isVisible = true;
Popover.prototype.linkedButtonID = '';
Popover.prototype.disable = function(){};
Popover.prototype.enable = function(){};
Popover.prototype.isDisabled = function(){ return true; };

/**
 * @extends Widget
 * @constructor
 */
function ProgressBar(){}
ProgressBar.prototype.label = '';
ProgressBar.prototype.userBreak = function(){};
ProgressBar.prototype.startListening = function(){};
ProgressBar.prototype.stopListening = function(){};
ProgressBar.prototype.getLabel = function(){ return {}; };
ProgressBar.prototype.setValue = function(){};
ProgressBar.prototype.getValue = function(){ return ''; };

/**
 * @extends Widget
 * @constructor
 */
function QueryForm(){}
QueryForm.prototype.sourceAtts = new DataSource();
QueryForm.prototype.sourceAtt = new DatasourceAttribute();
QueryForm.prototype.source = new DataSource();
QueryForm.prototype.findEntity = function(){};
QueryForm.prototype.clear = function(){};
QueryForm.prototype.setTextColor = function(){};

/**
 * @extends Widget
 * @constructor
 */
function RadioGroup(){}
RadioGroup.prototype.label = '';
RadioGroup.prototype.source = new DataSource();
RadioGroup.prototype.sourceAtt = new DatasourceAttribute();
RadioGroup.prototype.sourceOut = new DataSource();
RadioGroup.prototype.setTabIndex = function(){};
RadioGroup.prototype.getLabel = function(){ return {}; };
RadioGroup.prototype.setValue = function(){};
RadioGroup.prototype.isDisabled = function(){ return true; };
RadioGroup.prototype.hasFocus = function(){ return true; };
RadioGroup.prototype.getValue = function(){ return ''; };
RadioGroup.prototype.focus = function(){};
RadioGroup.prototype.enable = function(){};
RadioGroup.prototype.disable = function(){};
RadioGroup.prototype.addRadioButton = function(){};

/**
 * @extends Widget
 * @constructor
 */
function RichText(){}
RichText.prototype.source = new DataSource();
RichText.prototype.label = '';
RichText.prototype.format = {};
RichText.prototype.sourceAtt = new DatasourceAttribute();
RichText.prototype.clear = function(){};
RichText.prototype.setValue = function(){};
RichText.prototype.setTextColor = function(){};
RichText.prototype.setBackgroundColor = function(){};
RichText.prototype.getValue = function(){ return ''; };
RichText.prototype.getLabel = function(){ return {}; };
RichText.prototype.getURL = function(){ return ''; };
RichText.prototype.setURL = function(){};

/**
 * @extends Widget
 * @constructor
 */
function Section(){}
Section.prototype.label = '';
Section.prototype.isDisabled = function(){ return true; };
Section.prototype.setBackgroundColor = function(){};
Section.prototype.getLabel = function(){ return {}; };
Section.prototype.enable = function(){};
Section.prototype.disable = function(){};

/**
 * @extends Widget
 * @constructor
 */
function Select(){}
Select.prototype.sourceOut = new DataSource();
Select.prototype.sourceAtt = new DatasourceAttribute();
Select.prototype.source = new DataSource();
Select.prototype.label = '';
Select.prototype.setValue = function(){};
Select.prototype.getValue = function(){ return ''; };
Select.prototype.getLabel = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function Slider(){}
Slider.prototype.sourceAtt = new DatasourceAttribute();
Slider.prototype.source = new DataSource();
Slider.prototype.label = '';
Slider.prototype.errorDiv = '';
Slider.prototype.setOrientation = function(){};
Slider.prototype.getOrientation = function(){ return ''; };
Slider.prototype.setStep = function(){};
Slider.prototype.getStep = function(){ return 0; };
Slider.prototype.setRange = function(){};
Slider.prototype.getRange = function(){ return ''; };
Slider.prototype.setValues = function(){};
Slider.prototype.setMax = function(){};
Slider.prototype.setMin = function(){};
Slider.prototype.getMax = function(){ return 0; };
Slider.prototype.addHandle = function(){};
Slider.prototype.getValue = function(){ return ''; };
Slider.prototype.clear = function(){};
Slider.prototype.getMin = function(){ return 0; };
Slider.prototype.setErrorDiv = function(){};
Slider.prototype.setErrorMessage = function(){};
Slider.prototype.isDisabled = function(){ return true; };
Slider.prototype.getLabel = function(){ return {}; };
Slider.prototype.getErrorDiv = function(){ return ''; };
Slider.prototype.enable = function(){};
Slider.prototype.disable = function(){};
Slider.prototype.clearErrorMessage = function(){};

/**
 * @extends Widget
 * @constructor
 */
function SplitView(){}
SplitView.prototype.isDisabled = function(){ return true; };
SplitView.prototype.enable = function(){};
SplitView.prototype.disable = function(){};

/**
 * @extends Widget
 * @constructor
 */
function SwitchBox(){}
SwitchBox.prototype.label = ''; 
SwitchBox.prototype.errorDiv = ''; 
SwitchBox.prototype.sourceAtt = new DatasourceAttribute(); 
SwitchBox.prototype.source = new DataSource(); 
SwitchBox.prototype.toggleSlide = function(){};
SwitchBox.prototype.slide = function(){};
SwitchBox.prototype.isDisabled = function(){ return true; };
SwitchBox.prototype.enable = function(){};
SwitchBox.prototype.disable = function(){};
SwitchBox.prototype.clearErrorMessage = function(){};
SwitchBox.prototype.setErrorDiv = function(){};
SwitchBox.prototype.setErrorMessage = function(){};
SwitchBox.prototype.getErrorDiv = function(){ return ''; };
SwitchBox.prototype.setValue = function(){};
SwitchBox.prototype.getValue = function(){ return ''; };
SwitchBox.prototype.getLabel = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function TabView(){}
TabView.prototype.getSelectedTab = function(){ return {}; };
TabView.prototype.getTabContainer = function(){ return {}; };
TabView.prototype.countTabs = function(){ return 0; };
TabView.prototype.removeTab = function(){};
TabView.prototype.addTab = function(){};
TabView.prototype.selectTab = function(){};
TabView.prototype.isDisabled = function(){ return true; };
TabView.prototype.enable = function(){};
TabView.prototype.disable = function(){};

/**
 * @extends Widget
 * @constructor
 */
function TextField(){}
TextField.prototype.sourceAtt = new DatasourceAttribute();
TextField.prototype.source = new DataSource();
TextField.prototype.label = '';
TextField.prototype.errorDiv = '';
TextField.prototype.format = {};
TextField.prototype.disable = function(){};
TextField.prototype.getValue = function(){ return ''; };
TextField.prototype.isDisabled = function(){ return true; };
TextField.prototype.enable = function(){};
TextField.prototype.setTabIndex = function(){};
TextField.prototype.setErrorMessage = function(){};
TextField.prototype.setErrorDiv = function(){};
TextField.prototype.getErrorDiv = function(){ return ''; };
TextField.prototype.setTextColor = function(){};
TextField.prototype.setBackgroundColor = function(){};
TextField.prototype.hasFocus = function(){ return true; };
TextField.prototype.focus = function(){};
TextField.prototype.setValue = function(){};
TextField.prototype.setReadOnly = function(){};
TextField.prototype.isReadOnly = function(){ return true; };
TextField.prototype.clearErrorMessage = function(){};
TextField.prototype.getLabel = function(){ return {}; };
TextField.prototype.clear = function(){};

/**
 * @extends Widget
 * @constructor
 */
function TinyMCE(){}
TinyMCE.prototype.sourceAtt = new DatasourceAttribute();
TinyMCE.prototype.source = new DataSource();
TinyMCE.prototype.label = '';
TinyMCE.prototype.setValue = function(){};
TinyMCE.prototype.setBackgroundColor = function(){};
TinyMCE.prototype.getValue = function(){ return ''; };
TinyMCE.prototype.getLabel = function(){ return {}; };
TinyMCE.prototype.getControlManager = function(){ return {}; };
TinyMCE.prototype.getWysiwygInstance = function(){ return {}; };

/**
 * @extends Widget
 * @constructor
 */
function Video(){}
Video.prototype.sourceAtt = new DatasourceAttribute();
Video.prototype.source = new DataSource();
Video.prototype.label = '';
Video.prototype.sourceAtt = new DatasourceAttribute();
Video.prototype.source = new DataSource();
Video.prototype.label = '';
Video.prototype.isDisabled = function(){ return true; };
Video.prototype.enable = function(){};
Video.prototype.disable = function(){};
Video.prototype.getSupportedVideoTypes = function(){ return []; };
Video.prototype.getVolume = function(){ return 0; };
Video.prototype.setVolume = function(){};
Video.prototype.mute = function(){};
Video.prototype.toggleMute = function(){};
Video.prototype.loadVideoByUrl = function(){};
Video.prototype.loadVideoById = function(){};
Video.prototype.seekTo = function(){};
Video.prototype.togglePlay = function(){};
Video.prototype.isPlaying = function(){ return true; };
Video.prototype.stop = function(){};
Video.prototype.play = function(){};
Video.prototype.pause = function(){};
Video.prototype.getLabel = function(){ return {}; };
Video.prototype.setValue = function(){};
Video.prototype.setBackgroundColor = function(){};
Video.prototype.getValue = function(){ return ''; };

/**
 * @extends Widget
 * @constructor
 */
function YahooWeather(){}
YahooWeather.prototype.sourceAtt = new DatasourceAttribute();
YahooWeather.prototype.source = new DataSource();
YahooWeather.prototype.label = '';
YahooWeather.prototype.setValue = function(){};
YahooWeather.prototype.getValue = function(){ return ''; };
YahooWeather.prototype.getLabel = function(){ return {}; };

/**
 * @extends Object
 * @constructor
 **/
function FormData() {}
FormData.prototype.append = function(){};
