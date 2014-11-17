

message(STATUS "configuring components {enterprise}")

set(RemoteEntityRoot  ${ComponentsRoot}/RemoteEntity CACHE INTERNAL "Path to RemoteEntity src.")
set(RemoteEntityProj  ${RemoteEntityRoot}/Projects/CMake)
set(RemoteEntityBuild ${RemoteEntityProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${RemoteEntityProj} ${RemoteEntityBuild})

set(SQLEntityRoot  ${ComponentsRoot}/SQLEntity CACHE INTERNAL "Path to SQLEntity src.")
set(SQLEntityProj  ${SQLEntityRoot}/Projects/CMake)
set(SQLEntityBuild ${SQLEntityProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${SQLEntityProj} ${SQLEntityBuild})

set(LDAPComponentRoot  ${ComponentsRoot}/LDAPComponent CACHE INTERNAL "Path to LDAPComponent src.")
set(LDAPComponentProj  ${LDAPComponentRoot}/Projects/CMake)
set(LDAPComponentBuild ${LDAPComponentProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${LDAPComponentProj} ${LDAPComponentBuild})

set(MySQLConnectorRoot  ${ComponentsRoot}/MySQLConnector CACHE INTERNAL "Path to MySQLConnector src.")
set(MySQLConnectorProj  ${MySQLConnectorRoot}/Projects/CMake)
set(MySQLConnectorBuild ${MySQLConnectorProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${MySQLConnectorProj} ${MySQLConnectorBuild})

set(MSSQLConnectorRoot  ${ComponentsRoot}/MSSQLConnector CACHE INTERNAL "Path to MsSQLConnector src.")
set(MSSQLConnectorProj  ${MSSQLConnectorRoot}/Projects/CMake)
set(MSSQLConnectorBuild ${MSSQLConnectorProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${MSSQLConnectorProj} ${MSSQLConnectorBuild})

set(ODBCConnectorRoot  ${ComponentsRoot}/ODBCConnector CACHE INTERNAL "Path to ODBC Connector src.")
set(ODBCConnectorProj  ${ODBCConnectorRoot}/Projects/CMake)
set(ODBCConnectorBuild ${ODBCConnectorProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${ODBCConnectorProj} ${ODBCConnectorBuild})




add_custom_target(wakanda_enterprise_components ALL
	COMMENT "Components for Wakanda Server Enterprise Edition"
	DEPENDS
	wakanda_components
	RemoteEntity ODBCConnector
	MSSQLConnector MySQLConnector SQLEntity SQLModel SQLUtilities LDAPComponent)


