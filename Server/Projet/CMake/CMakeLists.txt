

file(GLOB Sources ${WakandaServerRoot}/Sources/*.cpp)
list(REMOVE_ITEM Sources 
	${WakandaServerRoot}/Sources/testMySQLConnector.cpp
	${WakandaServerRoot}/Sources/testMsSQLConnector.cpp
	${WakandaServerRoot}/Sources/testForeignKeys.cpp
	${WakandaServerRoot}/Sources/testHighLevelAPI.cpp
	${WakandaServerRoot}/Sources/testODBCConnector.cpp
	${WakandaServerRoot}/Sources/testSQLModel.cpp
	${WakandaServerRoot}/Sources/testLDAPComponent.cpp
)

file(GLOB SourcesCommon ${WakandaRoot}/Common/Sources/*.cpp)

list(APPEND Sources ${SourcesCommon})



#
# Version file
#
set(versnum_build_file "${CMAKE_CURRENT_BINARY_DIR}${CMAKE_FILES_DIRECTORY}/wakanda-vers-num.h.wdeps")
add_custom_command(
	OUTPUT   ${versnum_build_file}
		${WakandaRoot}/Server/Projet/Visual/WakandaVersNum.h
	DEPENDS  ${Depot}/Tools/Versionning/Wakanda_versionning_linux.perl
	COMMAND
		perl ${Depot}/Tools/Versionning/Wakanda_versionning_linux.perl ${WakandaRoot}/Server/Projet/Visual/WakandaVersNum.h
	COMMAND
		${CMAKE_COMMAND} -E touch ${versnum_build_file})

list(APPEND Sources ${versnum_build_file})



add_definitions(-DRIA_SERVER)
if (LINUX)
	add_definitions(-DVERSION_LINUX=1)
endif()


include_directories(
	${ComponentsRoot}
	${DB4DIncludeDir}
	${IcuIncludeDir}
	${JsCoreIncludeDir}
	${WakandaRoot}/Common/Sources
	${WakandaServerRoot}/Sources
	${XBoxRoot})




macro(force_target_rpath target_name)
	#
	# Our objective is to craft inside each library (and binary) a 'search lib path' relative
	# to our binary (same dir actualy). It frees us from any ld or env conf on install host.
	# However this solutionb is not without side effects. The binary may not take the same
	# libraries when launched from the root user or from another standard user.
	#
	set_target_properties("${target_name}" PROPERTIES SKIP_BUILD_RPATH  true)
	set_target_properties("${target_name}" PROPERTIES BUILD_WITH_INSTALL_RPATH true)
	#set_target_properties("${target_name}" PROPERTIES INSTALL_RPATH_USE_LINK_PATH false)

	set(target_rpath "\$ORIGIN/Libs::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
	set(target_rpath "${target_rpath}::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
	set(target_rpath "${target_rpath}::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
	set(target_rpath "${target_rpath}::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
	set_target_properties("${target_name}" PROPERTIES INSTALL_RPATH "${target_rpath}")
	unset(target_rpath)
endmacro()


macro(add_wakanda_server_target  tname)
	#
	# create wakanda server target
	#
	add_executable(${tname} ${Sources})
	force_target_rpath(${tname})

	# link with common shared libraries
	target_link_libraries(${tname}
		DB4D Graphics JavaScript JsDebugger Kernel KernelIPC ServerNet Xml)

	# dependency on common components
	add_dependencies(${tname}  wakanda_components)
endmacro()





if (BUILD_WAKANDA_SERVER_COMMUNITY)

	message(STATUS "configuring wakanda server {community}")
	add_wakanda_server_target(wakanda_server)
	set_target_properties(wakanda_server PROPERTIES COMPILE_FLAGS "-DIS_WAKANDA_COMMUNITY_SERVER=1")
	set_target_properties(wakanda_server PROPERTIES OUTPUT_NAME "wakanda-server")

	set(wakanda_server_approot "${AppRoot}/wakanda-server")
	file(MAKE_DIRECTORY "${wakanda_server_approot}")

	add_custom_command(TARGET wakanda_server POST_BUILD
		COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${wakanda_serverRoot}/walib/WAF/Loader.js
		COMMAND mkdir -p ${wakanda_server_approot}
		COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh "${wakanda_server_approot}" E
		COMMAND rm -Rf ${wakanda_server_approot}/walib/minifiedCoresWAF)

	add_custom_target(wakanda_server_resources 
		DEPENDS wakanda_server
		COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${wakanda_serverRoot}/walib/WAF/Loader.js
		COMMAND mkdir -p "${wakanda_server_approot}"
		COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh "${wakanda_server_approot}" E
		COMMAND rm -Rf ${wakanda_server_approot}/walib/minifiedCoresWAF)

	# alias for compatibility
	add_custom_target(Wakanda  DEPENDS wakanda_server)

endif()



if (BUILD_WAKANDA_SERVER_ENTERPRISE)

	message(STATUS "configuring wakanda server {enterprise}")
	add_wakanda_server_target(wakanda_enterprise_server)
	set_target_properties(wakanda_enterprise_server PROPERTIES COMPILE_FLAGS "-DIS_WAKANDA_ENTERPRISE_SERVER=1")
	set_target_properties(wakanda_enterprise_server PROPERTIES OUTPUT_NAME "wakanda-enterprise-server")

	set(wakanda_enterprise_server_approot "${AppRoot}/wakanda-enterprise-server")
	file(MAKE_DIRECTORY "${wakanda_enterprise_server_approot}")

	# Additional components for the enterprise edition
	add_dependencies(wakanda_enterprise_server  wakanda_enterprise_components)

	add_custom_command(TARGET wakanda_enterprise_server POST_BUILD
		COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${WakandaRoot}/walib/WAF/Loader.js
		COMMAND mkdir -p "${wakanda_enterprise_server_approot}"
		COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh "${wakanda_enterprise_server_approot}" E
		COMMAND rm -Rf "${wakanda_enterprise_server_approot}/walib/minifiedCoresWAF")

	add_custom_target(wakanda_enterprise_server_resources
		DEPENDS wakanda_enterprise_server
		COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${WakandaRoot}/walib/WAF/Loader.js
		COMMAND mkdir -p "${wakanda_enterprise_server_approot}"
		COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh "${wakanda_enterprise_server_approot}" E
		COMMAND rm -Rf "${wakanda_enterprise_server_approot}/walib/minifiedCoresWAF")

	# alias for compatibility
	add_custom_target(WakandaEnterprise  DEPENDS wakanda_enterprise_server)

endif()






