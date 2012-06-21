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
#include "headers4d.h"
#include "VRPCCatalog.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "VJSRPCCatalog.h"



USING_TOOLBOX_NAMESPACE



void VJSRPCCatalog::Initialize( const VJSParms_initialize& inParms, VRPCCatalog *inCatalog)
{
	if (inCatalog != NULL)
		inCatalog->Retain();
}


void VJSRPCCatalog::Finalize( const VJSParms_finalize& inParms, VRPCCatalog *inCatalog)
{
	if (inCatalog != NULL)
		inCatalog->Release();
}


void VJSRPCCatalog::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getCatalog", js_callStaticFunction<_getCatalog>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getCatalogByName", js_callStaticFunction<_getCatalogByName>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getCatalogByFile", js_callStaticFunction<_getCatalogByFile>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getMethodFile", js_callStaticFunction<_getMethodFile>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	outDefinition.className = "RPCCatalog";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
}


void VJSRPCCatalog::_getCatalog( VJSParms_callStaticFunction& ioParms, VRPCCatalog *inCatalog)
{
	VJSJSON xjson( ioParms.GetContext());
	MapOfRPCSchema schemas;
	VString catalog;

	inCatalog->RetainAllSchemas( schemas);
	VRPCCatalog::BuildCatalog( schemas, catalog);

	ioParms.ReturnValue( xjson.Parse( catalog));
}


void VJSRPCCatalog::_getCatalogByName( VJSParms_callStaticFunction& ioParms, VRPCCatalog *inCatalog)
{
	VJSJSON xjson( ioParms.GetContext());
	MapOfRPCSchema schemas;
	VString catalog, name;

	if (ioParms.IsArrayParam( 1))
	{
		std::vector<VRPCSchemaIdentifier> names;
		VJSArray arrayName( ioParms.GetContextRef());

		ioParms.GetParamArray( 1, arrayName);
		for (size_t cpt = 0 ; cpt < arrayName.GetLength() ; ++cpt)
		{
			VJSValue value = arrayName.GetValueAt( cpt);
			if (value.IsString())
			{
				value.GetString( name);
				names.push_back( VRPCSchemaIdentifier( name, L""));
			}
		}
		inCatalog->RetainSchemasByNames( names, schemas);
	}
	else if (ioParms.GetStringParam( 1, name))
	{
		VRPCSchemaIdentifier identifier( name, L"");
		VRPCSchema *schema = inCatalog->RetainSchemaByName( identifier);
		schemas[identifier] = schema;
		ReleaseRefCountable( &schema);
	}

	VRPCCatalog::BuildCatalog( schemas, catalog);

	ioParms.ReturnValue( xjson.Parse( catalog));
}


void VJSRPCCatalog::_getCatalogByFile( VJSParms_callStaticFunction& ioParms, VRPCCatalog *inCatalog)
{
	VJSJSON xjson( ioParms.GetContext());
	VString catalog;

	VFile *file = ioParms.RetainFileParam(1);
	if (file != NULL)
	{
		MapOfRPCSchema schemas;

		inCatalog->RetainSchemasByFile( file, schemas);
		VRPCCatalog::BuildCatalog( schemas, catalog);
		file->Release();
	}

	ioParms.ReturnValue( xjson.Parse( catalog));
}


void VJSRPCCatalog::_getMethodFile( VJSParms_callStaticFunction& ioParms, VRPCCatalog *inCatalog)
{
	bool done = false;

	VString name;
	if (ioParms.GetStringParam( 1, name))
	{
		const VFile *file = inCatalog->RetainFileByMethodName( VRPCSchemaIdentifier( name, L""));
		if (file != NULL)
		{
			VFile *lFile = new VFile( *file);
			if (lFile != NULL)
			{
				ioParms.ReturnFile( lFile);
				done = true;
				lFile->Release();
			}
			file->Release();
		}
	}

	if (!done)
		ioParms.ReturnNullValue();
}
