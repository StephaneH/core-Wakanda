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
#ifndef __VProject__
#define __VProject__


// ----------------------------------------------------------------------------
// VProject : Classe qui permet le controle d'un projet
// ----------------------------------------------------------------------------
typedef std::map<XBOX::VString, VProjectItem*> MapFullPathProjectItem;
class VSolution;
class VProjectItem;
class VCatalog;
class ISymbolTable;
class VProjectUser;
class ISourceControlConnector;
class ISourceControl;
class ISourceControlInterface;
class VRIASettingsCollection;
class VProjectFileStampSaver;
class VProjectSettings;



class VProject : public XBOX::VObject , public XBOX::IRefCountable , public XBOX::VFileSystemNotifier::IEventHandler
{
public:
	
	friend class VProjectFileStampSaver;

	typedef	XBOX::VSignalT_2< VProject*, VProjectItem* > ItemParsingCompleteSignal;

	VProject( VSolution *inParentSolution);
	virtual ~VProject();

	static	VProject*						Instantiate( XBOX::VError& outError, VSolution *inParentSolution, const XBOX::VFilePath& inProjectFile);

			/* @brief	Read the project file, create referenced project items, synchronize with file system and open the symbols table */
			XBOX::VError					Load( bool inOpenSymbolsTable);
			/* @brief	Close the symbols table */
			XBOX::VError					Unload();

			/** @brief	If needed, save the project file.
						DoProjectWillClose() returns VE_USER_ABORT if the closing should be cancelled. */
			XBOX::VError					DoProjectWillClose();
			XBOX::VError					Close();

			XBOX::VError					StartWatchingFileSystem();
			XBOX::VError					StopWatchingFileSystem();

			XBOX::VError					ReloadCatalogs();


	void						LoadOrSaveProjectUserFile(bool inLoad);
		
			// High level accessors

			const XBOX::VUUID&			GetUUID() const;

			/** @brief	Returns false if the name of the project is unknown. */
			bool						GetName( XBOX::VString& outName) const;
			/** @brief	Returns in outPath the path of the project folder. Returns false if the path of the project folder is unknown. */
			bool						GetProjectFolderPath( XBOX::VFilePath& outPath) const;
			/** @brief	Returns in outPath the path of the project file. Returns false if the path of the project file is unknown. */
			bool						GetProjectFilePath( XBOX::VFilePath& outPath) const;
			/** @brief	Returns in outPath the path of the user cache folder for this project */			
			bool						GetUserCacheFolderPath( XBOX::VFilePath& outPath) const;

			bool						ResolvePosixPathMacros( XBOX::VString& ioPosixPath) const;

			XBOX::VError				Rename( const XBOX::VString& inNewName);

			// reconstruit le path complet par rapport au path du dossier du projet 
			void						BuildPathFromRelativePath( XBOX::VFilePath& outFilePath, const XBOX::VString& inRelativePath, XBOX::FilePathStyle inRelativePathStyle = XBOX::FPS_SYSTEM) const;

	// ---------------------------------------
	// creation du projet depuis le template
	// ---------------------------------------
	XBOX::VError				SynchronizeWithFileSystem( VProjectItem *inItem);

	// ---------------------------------------
	// accesseurs directs sur fichier catalog, project...
	// ---------------------------------------
	VSolution*					GetSolution();
	void						SetProjectItemProjectFile(VProjectItem* inProjectItemProjectFile) {fProjectItemProjectFile = inProjectItemProjectFile;}
	VProjectItem*				GetProjectItemProjectFile() {return fProjectItemProjectFile;}

	// Returns the root item of the project
	VProjectItem*				GetProjectItem() const { return fProjectItem; }

			// Tagged items handling
			// Use TagItemAs() method to add explicitly a tag to the project item.
			void				TagItemAs( VProjectItem *inProjectItem, const VProjectItemTag& inTag);
			void				RemoveTagFromItem( VProjectItem *inProjectItem, const VProjectItemTag& inTag);
			void				RemoveAllTagsFromItem( VProjectItem *inProjectItem);
			
			void				GetCompatibleTags( const VProjectItem* inProjectItem, std::vector<VProjectItemTag>& outTags) const;

			// Tagged items handling
			// GetProjectItemsFromTag() method returns the project items which match the tag.
			// A project item may match the tag in two cases: either the project item has been explicitly tagged or
			// the project item is implicitly tagged according to the tag definition (see VProjectItemTagManager class for more details).
			//  For exemple, a settings file (*.waSettings) located into the default settings folder is implicitly tagged as kSettingTag.
			void				GetProjectItemsFromTag( const VProjectItemTag& inTag, VectorOfProjectItems& outProjectItems) const;
			// Should be used only if the tag can be applied to one item
			VProjectItem*		GetProjectItemFromTag( const VProjectItemTag& inTag) const;

	XBOX::VError				BuildAppliURLString(XBOX::VString &outAppliURL, bool inWithIndexPage, bool inWantSSL );
	XBOX::VError				BuildFileURLString(XBOX::VString &outFileURL, VProjectItem* inProjectItem, bool inWantSSL );

	VProjectItem*				GetMainPage();

			// Symbol table handling
			XBOX::VError				OpenSymbolTable();
			void						CloseSymbolTable();
			ISymbolTable *				GetSymbolTable();


	void						RemoveProjectItemFromSymbolTable( VProjectItem *inItem );
	
	void						BackgroundParseFiles();
	void						StopBackgroundDeleteFiles();
	void						StopBackgroundParseFiles();
	
	std::vector<XBOX::VFilePath>&	GetDeletedFilePaths()				{ return fDeletedFilePaths; }

	void						ParseProjectItemForEditor( VProjectItem *inItem, XBOX::VString& inContents );
	
	/** @brief	The parsing complete signal is triggered each time a project item is parsed. */
	ItemParsingCompleteSignal*	RetainItemParsingCompleteSignal() const;

	// ---------------------------------------
	// Source Control
	// ---------------------------------------
	bool						ConnectToSourceControl(XBOX::VString& inSourceControlId);
	ISourceControlConnector*	GetSourceControlConnector() {return fSourceControlConnector;}
	ISourceControl*				GetSourceControl() const;
	XBOX::VString				GetSourceControlID() const;
	bool						IsConnectedToSourceControl() const;
	XBOX::VError				AddToSourceControl(const VectorOfProjectItems& inProjectItems);
	XBOX::VError				GetLatestVersion(const VectorOfProjectItems& inProjectItems);
	XBOX::VError				CheckOut(const VectorOfProjectItems& inProjectItems, bool inCheckOutProjectFiles = false);
	XBOX::VError				CheckIn(const VectorOfProjectItems& inProjectItems);
	XBOX::VError				Revert(const VectorOfProjectItems& inProjectItems);

	class ISourceControlInterface*	GetSCCInterfaceForCodeEditor();

	// ---------------------------------------
	// Pour retrouver rapidement un VProjectItem a partir d'un full path
	// ---------------------------------------
	VProjectItem*				GetProjectItemFromFilePath( const XBOX::VFilePath& inPath) const;
	VProjectItem*				GetProjectItemFromFullPath( const XBOX::VString& inFullPath) const; // path au format natif
	void						RegisterProjectItemAndChildrenInMapOfFullPathes(VProjectItem* inProjectItem, bool inRegisterChildren = true);
	void						RegisterProjectItemInMapOfFullPathes(VProjectItem* inProjectItem);
	void						UnregisterProjectItemAndChildrenFromMapOfFullPathes(VProjectItem* inProjectItem, bool inUnregisterChildren = true);
	void						UnregisterProjectItemFromMapOfFullPathes(VProjectItem* inProjectItem);
	
	VProjectSettings*			RetainSettings( XBOX::VError& outError) const;
	XBOX::VError				GetPublicationSettings( XBOX::VString& outHostName, XBOX::VString& outIP, sLONG& outPort, bool& outAllowSSL, bool& outMandatorySSL, sLONG& outSSLPort) const;

	VProjectItem*				ReferenceExternalFolder( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VURL& inURL);
	VProjectItem*				ReferenceExternalFile( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VURL& inURL);

	VProjectItem*				CreateFileItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive);
	VProjectItem*				CreateFolderItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inSynchronizeWithFileSystem);

	XBOX::VError				RemoveItem( VProjectItem *inProjectItem, bool inDeletePhysicalItems);
	XBOX::VError				RemoveItems( const VectorOfProjectItems& inProjectItems, bool inDeletePhysicalItems);

	XBOX::VError				RenameItem( VProjectItem *inProjectItem, const XBOX::VString& inNewName);

private:
			/**	@brief	Set the root item of the project. The project item is retained. */
			void				_SetProjectItem( VProjectItem* inProjectItem);
			/**	@brief	Set the item of the project file. The project item is retained. */
			void				_SetProjectFileItem( VProjectItem* inProjectItem);

			XBOX::VError		_SynchronizeWithFileSystem( VProjectItem *inItem);
			
			/**	@brief	Add the item to the VProject internal containers. */
			void				_DoItemAdded( VProjectItem *inItem, bool inTouchProjectFile);
			/**	@brief	Remove the item and its children from the VProject internal containers. */
			void				_DoItemRemoved( VProjectItem *inItem, bool inTouchProjectFile);

			// Project File handling
			XBOX::VError		_LoadProjectFile();
			XBOX::VError		_SaveProjectFile( bool inForceSave = false);

			void				_TouchProjectFile();
			sLONG				_GetProjectFileDirtyStamp() const			{ return fProjectFileDirtyStamp; }

			// A project item is referenced when its reference is stored in the project file.
			// Typically, tagged and external items are referenced.
			void				_ReferenceItem( VProjectItem *inItem, bool inTouchProjectFile);
			bool				_IsItemReferenced( VProjectItem *inItem) const;
			void				_UnreferenceItem( VProjectItem *inItem, bool inTouchProjectFile);
			bool				_IsVectorContainsReferencedItems( const VectorOfProjectItems& inProjectItems, bool inRecursive) const;

			VProjectItem*		_CreateFileItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inTouchProjectFile);
			VProjectItem*		_CreateFolderItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inSynchronizeWithFileSystem, bool inTouchProjectFile);

	virtual void FileSystemEventHandler( const std::vector< XBOX::VFilePath > &inFilePaths, XBOX::VFileSystemNotifier::EventKind inKind );
	virtual void ParsingComplete( XBOX::VFilePath inFile, sLONG inStatus, IDocumentParserManager::TaskCookie inCookie );

	void						_LoadSCCStatusOfProjectItems();
	
	XBOX::VError				_LoadSCCStatusOfProjectItems(const VectorOfProjectItems& inProjectItems);
	XBOX::VError				_LoadSCCStatusOfProjectItems(const VectorOfProjectItems& inProjectItems, std::vector<XBOX::VFilePath>& inFileFullPathes);

			// On conserve certains pointeurs pour optimisation
	XBOX::VUUID					fUUID;
	VSolution*					fSolution;						// you must always use GetSolution() instead fSolution
	VProjectItem*				fProjectItem; 
	VProjectItem*				fProjectItemProjectFile;
	sLONG						fProjectFileDirtyStamp;

	bool						fIsLoadingFromXML;		

	// ---------------------------------------
	// propietes d'un projet 
	// ---------------------------------------
	// toutes les formulations utiles en interne
	MapFullPathProjectItem		fMapFullPathProjectItem;

	ISourceControlConnector*	fSourceControlConnector;
	VProjectUser*				fProjectUser;

	VectorOfProjectItems		fReferencedItems;

	ISymbolTable*				fSymbolTable;
	XBOX::VTask *				fBackgroundDeleteFileTask;
	ItemParsingCompleteSignal	*fItemParsingCompleteSignal;

	std::vector<XBOX::VFilePath>	fDeletedFilePaths;

			bool				fIsWatchingFileSystem;
			bool				fIsUpdatingSymbolTable;


	void LoadDefaultSymbols( ISymbolTable *inTable );
	void LoadCoreFiles( const XBOX::VFolder &inFolder, const XBOX::VString &inName, ESymbolFileExecContext inExecContext, IDocumentParserManager::IJob *inJob );
	void CoreFileLoadComplete( IDocumentParserManager::TaskCookie inCookie );

	void LoadKludgeSymbols( ISymbolTable *inTable );
	void LoadKludgeFile( const XBOX::VFolder &inFolder, const XBOX::VString &inName, ESymbolFileExecContext inExecContext, IDocumentParserManager::IJob *inJob );

	static sLONG BackgroundDeleteFile( XBOX::VTask *inTask );

	void _GetProjectItemsByExtension( const XBOX::VString &inExtension, VectorOfProjectItems &outItems );
	void _GetProjectItemsByExtension( VProjectItem *inProjectItem, const XBOX::VString &inExtension, VectorOfProjectItems &outItems );
	VProjectItem *_GetEntityModelProjectItem( VProjectItem *inCurItemToSearch = NULL );
};

// -----------------------------------------------------------------------------
// VCatalog : Classe qui permet le controle d'un catalogue
// -----------------------------------------------------------------------------

class CDB4DBase;

class VCatalog : public XBOX::VObject , public IEntityModelCatalog
{
public:
	VCatalog();
	virtual ~VCatalog();

	static	VCatalog*			Instantiate( XBOX::VError& outError, const XBOX::VString& inCatalogFileName);

			VProjectItem*		GetCatalogItem() const				{ return fCatalogItem; }

	XBOX::VError				GetCatalogContent(XBOX::VString& outCatalogContent);
	XBOX::VError				ParseCatalogAndCreateProjectItems(CDB4DBase* inDB4DBase = NULL);

	// from IEntityModelCatalog
	virtual	void					GetCatalogPath( XBOX::VFilePath &outPath ) const;
	virtual	const XBOX::VValueBag*	RetainCatalogBag() const;
	virtual	void					GetEntityModelNames( XBOX::VectorOfVString& outEntityNames) const;
	virtual	void					GetEntityModelAttributes(const XBOX::VString& inEntityName, std::vector< IEntityModelCatalogAttribute* >& outAttributes) const;
	virtual	void					GetEntityModelMethods(const XBOX::VString& inEntityName, std::vector< IEntityModelCatalogMethod* >& outMethods) const;

private:
			/**	@brief	Set the root item of the catalog. The project item is retained. */
			void				_SetCatalogItem( VProjectItem *inProjectItem);

	static	XBOX::VError		_ParseCatalogAndCreateProjectItems( CDB4DBase* inDB4DBase, VProjectItem *inProjectItem, XBOX::VValueBag *outCatalogBag);

	XBOX::VValueBag*			fCatalogBag;
	VProjectItem				*fCatalogItem;
};

class VCatalogMethod : public XBOX::VObject, public IEntityModelCatalogMethod
{
public:
	VCatalogMethod(XBOX::VString& inName, XBOX::VString& inApplyTo) : fName(inName), fApplyTo(inApplyTo) { }
	~VCatalogMethod() { }

	// from IEntityModelCatalogMethod
	virtual void	GetName(XBOX::VString& outName) { outName = fName; }
	virtual void	GetApplyTo(XBOX::VString& outApplyTo) { outApplyTo = fApplyTo; }

private:
	XBOX::VString fName;
	XBOX::VString fApplyTo;
};


class VCatalogAttribute : public XBOX::VObject, public IEntityModelCatalogAttribute
{
public:
	VCatalogAttribute(XBOX::VString& inName, XBOX::VString& inType) : fName(inName), fType(inType) { }
	~VCatalogAttribute() { }

	// from IEntityModelCatalogAttribute
	virtual void	GetName(XBOX::VString& outName) { outName = fName; }
	virtual void	GetType(XBOX::VString& outType) { outType = fType; }

private:
	XBOX::VString fName;
	XBOX::VString fType;
};

// ----------------------------------------------------------------------------
// Classe VProjectUser
// ----------------------------------------------------------------------------
class VProjectUser : public XBOX::VObject
{
public:
	VProjectUser(VProject* inProject);
	virtual ~VProjectUser();

	void			SetProject(VProject* inProject) {fProject = inProject;}
	XBOX::VError	LoadFromUserFile(XBOX::VFile& inUserFile);
	XBOX::VError	SaveToUserFile(XBOX::VFile& inUserFile) const;

private:
	VProject* fProject;
};


#endif