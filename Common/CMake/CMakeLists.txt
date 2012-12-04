cmake_minimum_required(VERSION 2.8.6)

################################################################################
#
#	       Wakanda Server Project (top level CMakeLists.txt)
#
#
#	If you need help with CMake commands, this is the place to go :
#
#     http://www.cmake.org/cmake/help/cmake-2-8-docs.html#section_Commands
#
################################################################################

project(WAKANDA)

SET(CMAKE_VERBOSE_MAKEFILE 1)
SET(CMAKE_COLOR_MAKEFILE ON)


################################################################################
# Configurations
################################################################################

SET(CMAKE_CONFIGURATION_TYPES Debug Beta Release)

if(NOT DEFINED CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE Debug)
endif()

message(STATUS "Generate configuration for ${PROJECT_NAME} : ${CMAKE_BUILD_TYPE}")

#Default compile flags ; Those flags are added to config-specific ones
set(CMAKE_CXX_FLAGS	    "-fpermissive -fno-common -fvisibility=hidden -w")

# Brief help with default flags
#
# -fpermissive
#	Downgrade some diagnostics about nonconformant code from errors to warnings.
#
# -fno-common
#	This has the effect that if the same variable is declared (without "extern")
#	in two different compilations, you will get an error when you link them.
#
# -fvisibility=hidden
#	Set the default ELF image symbol visibility to hidden (unless overridden
#	within the code). Improve linking and load times of shared object libraries,
#	produce more optimized code, etc.
# 
# -Wno-multichar
#	Do not warn if a multicharacter constant ('FOOF') is used. 
#
# Other errors and warnings relative flags you might be interested in :
# 
#	-W -Wall : a LOT of warnings
#	-w : NO warning at all
#	-Wfatal-errors : stop on first error, may lack help message

set(CMAKE_CXX_FLAGS_DEBUG   "-g")
set(CMAKE_CXX_FLAGS_BETA    "-g -O3 -fno-inline")	#Solve an undifined symbol pb we have at run time in Release mode
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -DNDEBUG -fno-inline")	#Without -fno-inline, it works with -O1 but fails with -O2 and above.

if(ASSERT_SHOULD_BREAK STREQUAL No)
  #Prevent the process from beeing killed on assert if not ran inside debugger
  add_definitions(-DASSERT_DONT_BREAK)
  message(STATUS "Asserts won't break !")
else()
  message(STATUS "Asserts will break !")
endif()

set(CMAKE_C_FLAGS	    ${CMAKE_CXX_FLAGS})
set(CMAKE_C_FLAGS_DEBUG	    ${CMAKE_CXX_FLAGS_DEBUG})
set(CMAKE_C_FLAGS_BETA	    ${CMAKE_CXX_FLAGS_BETA})
set(CMAKE_C_FLAGS_RELEASE   ${CMAKE_CXX_FLAGS_RELEASE})

#Default lib name is libHTTPServer.so for all configurations, but KernelIPC doesn't like it.
#To Please KernelIPC, components have to adopt the following convention on lib name :
# - Debug   : HTTPServerDebug.so
# - Beta    : HTTPServerBeta.so
# - Release : HTTPServer.so
if(CMAKE_BUILD_TYPE STREQUAL Debug)
  set(CMAKE_SHARED_LIBRARY_PREFIX "")
  set(CMAKE_SHARED_LIBRARY_SUFFIX "Debug.so")

elseif(CMAKE_BUILD_TYPE STREQUAL Beta)
  set(CMAKE_SHARED_LIBRARY_PREFIX "")
  set(CMAKE_SHARED_LIBRARY_SUFFIX "Beta.so")

elseif(CMAKE_BUILD_TYPE STREQUAL Release)
  set(CMAKE_SHARED_LIBRARY_PREFIX "")
  set(CMAKE_SHARED_LIBRARY_SUFFIX ".so")

else()
  message(WARNING "Unknown configuration '${CMAKE_BUILD_TYPE}'")

endif()

#Our objective is to craft inside each library (and binary) a 'search lib path' relative
#to our binary (same dir actualy). It frees us from any ld or env conf on install host.
SET(CMAKE_SKIP_BUILD_RPATH TRUE)
SET(CMAKE_BUILD_WITH_INSTALL_RPATH TRUE)
SET(CMAKE_INSTALL_RPATH "\$ORIGIN/Libs:.")

set(Depot		${PROJECT_SOURCE_DIR}/../../../..)

#Special target that remove dyn. libs and binaries, in order to force re-link
#(Don't remove anything in Apps directory)
add_custom_target(unlink
  COMMAND find "${Depot}" -name "*.so" "!" -path "*/Apps/*" -exec rm "{}" "\;"
  COMMAND find "${Depot}" -name "Wakanda" "!" -path "*/Apps/*" -exec rm "{}" "\;")


################################################################################
# Usefull Directorys
################################################################################

set(4DRoot		${Depot}/4eDimension/WAK3/4D)
set(WakandaRoot		${Depot}/Wakanda/main)
set(CopyFilesRoot	${Depot}/Tools/BuildLinux/scripts_compil_main/Scripts)
set(AppRoot		${WakandaRoot}/Apps/Linux/${CMAKE_BUILD_TYPE})
set(ComponentsRoot	${Depot}/Components/Main)
set(XBoxRoot		${Depot}/XToolbox/Main)


################################################################################
# External auto-tools libs 
################################################################################

include(ExternalProject)


set(OpenSSLRoot		${Depot}/openssl/1.0.0d CACHE INTERNAL "Path to openssl src.")

ExternalProject_Add(
  OpenSSL
  PREFIX	    ${OpenSSLRoot}/openssl
  STAMP_DIR	    ${OpenSSLRoot}/Stamps
  DOWNLOAD_COMMAND  true 
  #CONFIGURE_COMMAND cd ${OpenSSLSources} && ./Configure linux-x86_64 no-asm no-static no-zlib shared
  CONFIGURE_COMMAND cd ${OpenSSLRoot}/openssl && touch ./Makefile && rm -f ./crypto/buildinf.h && chmod 644 ./crypto/objects/obj_mac.num

  BUILD_COMMAND	    cd ${OpenSSLRoot}/openssl && make all
  INSTALL_COMMAND   true
)

foreach(lib crypto ssl)
  add_library(${lib} SHARED IMPORTED)
  add_dependencies(${lib} OpenSSL)
  set_property(TARGET ${lib} PROPERTY IMPORTED_LOCATION ${OpenSSLRoot}/openssl/lib${lib}.so.1.0.0)
  message(STATUS "Add OpenSSL autotools lib : ${lib}")
endforeach()

set(OpenSSLIncludeDir ${OpenSSLRoot}/openssl/include)


################################################################################
# External cmake libs
################################################################################

set(IcuRoot		${Depot}/icu/4.8 CACHE INTERNAL "Path to ICU distrib.")
set(IcuProj		${IcuRoot}/projets/CMake)
set(IcuBuild		${IcuProj}/Build/${CMAKE_BUILD_TYPE})

add_definitions(-Dxbox_icu=icu_48)
add_subdirectory(${IcuProj} ${IcuBuild})


set(XercesRoot		${Depot}/xerces/3.0.1 CACHE INTERNAL "Path to xerces src.")
set(XercesProj		${XercesRoot}/xerces/projects/CMake)
set(XercesBuild		${XercesProj}/Build/${CMAKE_BUILD_TYPE})

add_definitions(-DXERCES_3_0_1)
add_subdirectory(${XercesProj} ${XercesBuild})


set(CurlRoot		${Depot}/curl/7.19.7 CACHE INTERNAL "Path to cURL src.")
set(CurlProj		${CurlRoot}/CMake)
set(CurlBuild		${CurlProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${CurlProj} ${CurlBuild})


#jmo - Don't forget to patch zconf.h for default symbol visibility 
set(ZLibRoot		${Depot}/zlib/1.2.5 CACHE INTERNAL "Path to zlib src.")
set(ZLibProj		${ZLibRoot}/projects/CMake)
set(ZLibBuild		${ZLibProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${ZLibProj} ${ZLibBuild})


set(LibZipRoot		${Depot}/libzip/0.10 CACHE INTERNAL "Path to libzip src.")
set(LibZipProj		${LibZipRoot}/Projects/CMake)
set(LibZipBuild		${LibZipProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${LibZipProj} ${LibZipBuild})


set(WebKitRoot		${Depot}/webkit/534.53 CACHE INTERNAL "Path to WebKit src.")
set(WebCoreRoot		${WebKitRoot}/WebCore CACHE INTERNAL "Path to JavascriptCore src.")

set(JsCoreRoot		${WebKitRoot}/JavaScriptCore CACHE INTERNAL "Path to JavascriptCore src.")
set(JsCoreProj		${JsCoreRoot}/CMake)
set(JsCoreBuild		${JsCoreProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${JsCoreProj} ${JsCoreBuild})


################################################################################
# Internal libs
################################################################################

set(KernelRoot		${XBoxRoot}/Kernel CACHE INTERNAL "Path to Kernel src.")
set(KernelProj		${KernelRoot}/Projects/CMake)
set(KernelBuild		${KernelProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${KernelProj} ${KernelBuild})


set(KernelIPCRoot	${XBoxRoot}/KernelIPC CACHE INTERNAL "Path to KernelIPC src.")
set(KernelIPCProj	${KernelIPCRoot}/Projects/CMake)
set(KernelIPCBuild	${KernelIPCProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${KernelIPCProj} ${KernelIPCBuild})


set(ServerNetRoot	${XBoxRoot}/ServerNet CACHE INTERNAL "Path to ServerNet src.")
set(ServerNetProj	${ServerNetRoot}/Projects/CMake)
set(ServerNetBuild	${ServerNetProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${ServerNetProj} ${ServerNetBuild})


set(XMLRoot		${XBoxRoot}/XML CACHE INTERNAL "Path to XML src.")
set(XMLProj		${XMLRoot}/Projects/CMake)
set(XMLBuild		${XMLProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${XMLProj} ${XMLBuild})


set(JavaScriptRoot	${XBoxRoot}/JavaScript CACHE INTERNAL "Path to JavaScript src.")
set(JavaScriptProj	${JavaScriptRoot}/Projects/CMake)
set(JavaScriptBuild	${JavaScriptProj}/Build/${CMAKE_BUILD_TYPE})


add_subdirectory(${JavaScriptProj} ${JavaScriptBuild})
set(JsDebuggerRoot	${XBoxRoot}/JSDebugger CACHE INTERNAL "Path to JsDebugger src.")
set(JsDebuggerProj	${JsDebuggerRoot}/Projects/CMake)
set(JsDebuggerBuild	${JsDebuggerProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${JsDebuggerProj} ${JsDebuggerBuild})


#This one doesn't work at all, but we need its include path for JavaScript and others.
set(GraphicsRoot	${XBoxRoot}/Graphics CACHE INTERNAL "Path to Graphics src.")
set(GraphicsProj	${GraphicsRoot}/Projects/CMake)
set(GraphicsBuild	${GraphicsProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${GraphicsProj} ${GraphicsBuild})


################################################################################
# Components
################################################################################

set(NativeRoot		${AppRoot}/Native\ Components)
set(ContentDir		Contents/Linux)


set(UsersAndGroupsRoot	${ComponentsRoot}/UsersAndGroups CACHE INTERNAL "Path to UsersAndGroups src.")
set(UsersAndGroupsProj	${UsersAndGroupsRoot}/projects/CMake)
set(UsersAndGroupsBuild	${UsersAndGroupsProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${UsersAndGroupsProj} ${UsersAndGroupsBuild})


set(SecurityManagerRoot	    ${ComponentsRoot}/Security\ Manager CACHE INTERNAL "Path to SecurityManager src.")
set(SecurityManagerProj	    ${SecurityManagerRoot}/Projects/CMake)
set(SecurityManagerBuild    ${SecurityManagerProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${SecurityManagerProj} ${SecurityManagerBuild})


set(HTTPServerRoot	${ComponentsRoot}/HTTPServer CACHE INTERNAL "Path to HttpServer src.")
set(HTTPServerProj	${HTTPServerRoot}/Projects/CMake)
set(HTTPServerBuild	${HTTPServerProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${HTTPServerProj} ${HTTPServerBuild})


set(DB4DRoot		${ComponentsRoot}/DB4D CACHE INTERNAL "Path to DB4D src.")
set(DB4DProj		${DB4DRoot}/projects/CMake)
set(DB4DBuild		${DB4DProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${DB4DProj} ${DB4DBuild})


set(LanguageSyntaxRoot	${ComponentsRoot}/Language\ Syntax CACHE INTERNAL "Path to Language Syntax src.")
set(LanguageSyntaxProj	${LanguageSyntaxRoot}/Projects/CMake)
set(LanguageSyntaxBuild	${LanguageSyntaxProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${LanguageSyntaxProj} ${LanguageSyntaxBuild})


set(ZipRoot		${ComponentsRoot}/Zip CACHE INTERNAL "Path to Zip src.")
set(ZipProj		${ZipRoot}/Projects/CMake)
set(ZipBuild		${ZipProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${ZipProj} ${ZipBuild})


################################################################################
# Tests
################################################################################

# set(VTaskTestsRoot	${XBoxRoot}/Tests/Tasks CACHE INTERNAL "Path to VTaskTests")
# set(VTaskTestsProj	${VTaskTestsRoot}/Projects/CMake)
# set(VTaskTestsBuild	${VTaskTestsProj}/Build/${CMAKE_BUILD_TYPE})

# add_subdirectory(${VTaskTestsProj} ${VTaskTestsBuild})


# set(VFileTestsRoot	${XBoxRoot}/Tests/Files CACHE INTERNAL "Path to VFileTests")
# set(VFileTestsProj	${VFileTestsRoot}/Projects/CMake)
# set(VFileTestsBuild	${VFileTestsProj}/Build/${CMAKE_BUILD_TYPE})

# add_subdirectory(${VFileTestsProj} ${VFileTestsBuild})


# set(VStringTestsRoot	${XBoxRoot}/Tests/Strings CACHE INTERNAL "Path to VStringTests")
# set(VStringTestsProj	${VStringTestsRoot}/Projects/CMake)
# set(VStringTestsBuild	${VStringTestsProj}/Build/${CMAKE_BUILD_TYPE})

# add_subdirectory(${VStringTestsProj} ${VStringTestsBuild})


# set(ServerNetTestsRoot	${XBoxRoot}/Tests/ServerNet CACHE INTERNAL "Path to VServerNetTests")
# set(ServerNetTestsProj	${ServerNetTestsRoot}/Projects/CMake)
# set(ServerNetTestsBuild	${ServerNetTestsProj}/Build/${CMAKE_BUILD_TYPE})

# add_subdirectory(${ServerNetTestsProj} ${ServerNetTestsBuild})


# set(VFSNTestsRoot	${XBoxRoot}/Tests/Notifications CACHE INTERNAL "Path to VFSNTests")
# set(VFSNTestsProj	${VFSNTestsRoot}/Projects/CMake)
# set(VFSNTestsBuild	${VFSNTestsProj}/Build/${CMAKE_BUILD_TYPE})

# add_subdirectory(${VFSNTestsProj} ${VFSNTestsBuild})


################################################################################
# Wakanda Server
################################################################################

set(WakandaServerRoot	${WakandaRoot}/Server CACHE INTERNAL "Path to WakandaServer")
set(WakandaServerProj	${WakandaServerRoot}/Projet/CMake)
set(WakandaServerBuild	${WakandaServerProj}/Build/${CMAKE_BUILD_TYPE})

add_subdirectory(${WakandaServerProj} ${WakandaServerBuild})
