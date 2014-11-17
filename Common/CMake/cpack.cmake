
# autogenerate dependency information
set(CPACK_DEBIAN_PACKAGE_SHLIBDEPS true)


# component mode
set(CPACK_DEB_COMPONENT_INSTALL  1)
set(CPACK_RPM_COMPONENT_INSTALL  1)
set(CPACK_DEB_USE_DISPLAY_NAME_IN_FILENAME  1)
set(CPACK_RPM_USE_DISPLAY_NAME_IN_FILENAME  1)
set(CPACK_COMPONENTS_GROUPING    "IGNORE")

set(CPACK_DEBIAN_PACKAGE_PRIORITY "optional")
set(CPACK_DEBIAN_PACKAGE_SECTION  "wakanda")
set(CPACK_SET_DESTDIR "on")
set(CPACK_STRIP_FILES true)


#
# ID Card
#
set(CPACK_PACKAGE_NAME "wakanda")
set(CPACK_DEBIAN_PACKAGE_MAINTAINER "4D (http://www.4d.com)") #required

if (${BRANCH} STREQUAL "MAIN")
	set(CPACK_PACKAGE_VERSION_MAJOR  0)
else()
	# extract version number from branch name
	string(REPLACE "WAK" "" CPACK_PACKAGE_VERSION_MAJOR "${BRANCH}")
endif()
set(CPACK_PACKAGE_VERSION_MINOR  0)
set(CPACK_PACKAGE_VERSION_PATCH  $ENV{BUILD_VCS_NUMBER})
if (NOT $CPACK_PACKAGE_VERSION_PATCH GREATER 1)
	set(CPACK_PACKAGE_VERSION_PATCH  0)
endif()
set(CPACK_PACKAGE_VENDOR "4D")


if ("${LINUX_PLATFORM}" STREQUAL "debian")
	#
	# The Debian binary package file names conform to the following convention:
	#    <foo>_<VersionNumber>-<DebianRevisionNumber>_<DebianArchitecture>.deb 
	#
	string(TOLOWER "${CPACK_PACKAGE_NAME}" CPACK_PACKAGE_NAME_LOWERCASE)

	set(PACKAGE_NAME_PREFIX "${CPACK_PACKAGE_NAME_LOWERCASE}")
	unset(CPACK_PACKAGE_NAME_LOWERCASE)
	if ("${CMAKE_BUILD_TYPE}" STREQUAL "Debug")
		set(PACKAGE_NAME_PREFIX "${PACKAGE_NAME_PREFIX}-debug")
	endif()
	if ("${CMAKE_BUILD_TYPE}" STREQUAL "Beta")
		set(PACKAGE_NAME_PREFIX "${PACKAGE_NAME_PREFIX}-beta")
	endif()
	set(PACKAGE_NAME_PREFIX "${PACKAGE_NAME_PREFIX}_${CPACK_PACKAGE_VERSION_MAJOR}.${CPACK_PACKAGE_VERSION_MINOR}")
	if (${CPACK_PACKAGE_VERSION_PATCH} GREATER 0)
		set(PACKAGE_NAME_PREFIX "${PACKAGE_NAME_PREFIX}-${CPACK_PACKAGE_VERSION_PATCH}")
	endif()

	find_program(DPKG_PROGRAM dpkg DOC "dpkg program of Debian-based systems")
	if (DPKG_PROGRAM)
		execute_process(
			COMMAND ${DPKG_PROGRAM} --print-architecture
			OUTPUT_VARIABLE CPACK_DEBIAN_PACKAGE_ARCHITECTURE
			OUTPUT_STRIP_TRAILING_WHITESPACE)
	else()
		string(TOLOWER "${CMAKE_SYSTEM_NAME}"  CPACK_DEBIAN_PACKAGE_ARCHITECTURE)
	endif()

	set(CPACK_PACKAGE_FILE_NAME
		"${PACKAGE_NAME_PREFIX}_${CPACK_DEBIAN_PACKAGE_ARCHITECTURE}")   

	# Global dependancy to libc
	#set(CPACK_DEBIAN_PACKAGE_DEPENDS "libc6 (>=2.7)")

endif()





#
# all components
#
set(CPACK_COMPONENTS_ALL shell)




include(CPack)

cpack_add_install_type(install_type_wakanda_server
	DISPLAY_NAME "Wakanda Server (Community edition)")
cpack_add_install_type(install_type_wakanda_enterprise_server
	DISPLAY_NAME "Wakanda Enterprise Server")
cpack_add_install_type(install_type_wakanda_shellonly
	DISPLAY_NAME "Wakanda Shell")



cpack_add_component(shell
	DISPLAY_NAME "Wakanda Shell"
	DESCRIPTION  "The Wakanda command-line tool"
	INSTALL_TYPES
		install_type_wakanda_server
		install_type_wakanda_enterprise_server
		install_type_wakanda_shell_only)





