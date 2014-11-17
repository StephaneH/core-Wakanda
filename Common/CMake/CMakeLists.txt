# Wakanda Server
# http://www.wakanda.org
#
# Note on compiling on 32 bits on Ubuntu 64:
# The following packages are required :
#	- libc6-dev-i386
#	- g++-multilib (or g++-4.8-multilib)
#
cmake_minimum_required(VERSION 2.8.10 FATAL_ERROR)

# clang is currently mandatory (some code does not properly compile with gcc)
if (NOT DEFINED CMAKE_C_COMPILER)
	set(CMAKE_C_COMPILER clang)
endif()
if (NOT DEFINED CMAKE_CXX_COMPILER)
	set(CMAKE_CXX_COMPILER clang++)
endif()

project(wakanda)


#
# All project options
#
include(options.cmake)





#
# Monolitic mode
#
if (NOT MONOLITIC)
	message(STATUS "building with system libs")
	set(MONOLITIC false)
else()
	message(STATUS "building in monolitic mode")
	set(MONOLITIC true)
endif()


#
# Branch configuration
#
if (NOT DEFINED BRANCH)
	set(BRANCH "MAIN")
else()
	string(TOUPPER ${BRANCH} BRANCH)
endif()
if (BRANCH STREQUAL "MAIN")
	set(BRANCH_LABEL "Main")
	set(BRANCH_u     "Main") # uppercase branch name
	set(BRANCH_l     "main") # lowercase branch name
else()
	set(BRANCH_LABEL "${BRANCH}")
	set(BRANCH_u     "${BRANCH}")
	set(BRANCH_l     "${BRANCH}")
endif()




if (NOT DEFINED CMAKE_BUILD_TYPE)
	set(CMAKE_BUILD_TYPE debug)
else()
	string(TOLOWER ${CMAKE_BUILD_TYPE} USER_BUILD_TYPE)
	if ("${USER_BUILD_TYPE}" STREQUAL "debug")
		set(CMAKE_BUILD_TYPE debug)
	elseif ("${USER_BUILD_TYPE}" STREQUAL "release")
		set(CMAKE_BUILD_TYPE release)
	elseif ("${USER_BUILD_TYPE}" STREQUAL "beta")
		set(CMAKE_BUILD_TYPE beta)
	else()
		message(SEND_ERROR "Unknown build type. Got '${CMAKE_BUILD_TYPE}', expected release, debug or beta")
	endif()
	unset(USER_BUILD_TYPE)
endif()



if (${ARCH} STREQUAL "64")
	if (NOT MSVC)
		set(ARCH_FLAGS "-m64")
	else()
		set(ARCH_FLAGS "/MACHINE:X64")
	endif()
	set(ARCH_LABEL     "x64")
	set(ARCH_TAG       "64")
elseif (${ARCH} STREQUAL "32")
	if (NOT MSVC)
		set(ARCH_FLAGS "-m32")
	else()
		set(ARCH_FLAGS "/MACHINE:X86 /ARCH:SSE2")
	endif()
	set(ARCH_LABEL     "386")
	set(ARCH_TAG       "32")
else()
	message(SEND_ERROR "Unknown arch '${ARCH}'")
endif()


# detect the clang compiler
if ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "Clang")
	set(CLANG 1)
endif()



#
# CMake stuff / tools
#
# Tell to cmake how to find our custom Find<Package>
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} ${CMAKE_SOURCE_DIR})
find_package(LinuxPlatform)

include(CheckCXXCompilerFlag)
include(CheckCCompilerFlag)
include(CheckIncludeFiles)
include(CheckLibraryExists) 
include(CheckFunctionExists)
include(ExternalProject)
include(ProcessorCount)

include(utils.cmake)
include(completion.cmake)

# Build configuration
message(STATUS "build configuration : ${BRANCH_LABEL} ${CMAKE_BUILD_TYPE} ${ARCH_LABEL}")

# number of processors
ProcessorCount(PROCESSOR_COUNT)
if (PROCESSOR_COUNT EQUAL 0)
	set(PROCESSOR_COUNT 1)
endif()
message(STATUS "processors: ${PROCESSOR_COUNT}")





#
# CPack
#
include("cpack.cmake")





# reset compiler flags
set(CMAKE_CXX_FLAGS_DEBUG   "${ARCH_FLAGS}")
set(CMAKE_CXX_FLAGS_BETA    "${ARCH_FLAGS}")
set(CMAKE_CXX_FLAGS_RELEASE "${ARCH_FLAGS}")

set(CMAKE_C_FLAGS_DEBUG     "${ARCH_FLAGS}")
set(CMAKE_C_FLAGS_BETA      "${ARCH_FLAGS}")
set(CMAKE_C_FLAGS_RELEASE   "${ARCH_FLAGS}")



if (${LINUX})
	add_definitions("-DVERSION_LINUX=1")
endif()


if (NOT MSVC)
	# no optimization
	compile_flag("-O0" OPTIMIZATION_LEVEL_0 DEBUG)
	# "standard" optimisation level for GCC compatible compilers
	compile_flag("-O3" OPTIMIZATION_LEVEL_3 BETA RELEASE)

	# Link Time Optimization, for GCC compatible (equivalent -O4 for clang)
	compile_flag("-flto" LTO BETA RELEASE)

	# produce debugging informations
	compile_flag("-g" DEBUG_SYMBOLS DEBUG BETA)
	# produces debugging informations for gdb
	compile_flag("-ggdb" DEBUG_SYMBOLS_FOR_GDB DEBUG BETA)
	# produces all debugging informations (even template source code) for gdb
	compile_flag("-ggdb3" DEBUG_SYMBOLS_FOR_GDB_LEVEL_3 DEBUG BETA)
	# produces all debugging informations (even template source code) for gdb (apple)
	compile_flag("-gfull" DEBUG_SYMBOLS_FOR_GDB_FULL	DEBUG)

	# Enable AddressSanitizer, a fast memory error detector
	#compile_flag("-fsanitize=address" SANITIZE_ADDRESS DEBUG)
	# Enable ThreadSanitizer, a fast data race detector
	#compile_flag("-fsanitize=thread" SANITIZE_THREAD DEBUG)


	if (NOT CLANG)
		# clang does not support yet these options
		# export all debug symbols (to have proper backtraces)
		compile_flag("-rdynamic" R_DYNAMIC DEBUG BETA RELEASE)
		# export all debug symbols (to have proper backtraces) - same as rdynamic
		compile_flag("-export-dynamic" EXPORT_DYNAMIC DEBUG BETA RELEASE)
	endif()

	# no inlining in debug
	compile_flag("-fno-inline" NO_INLINE DEBUG)
	# keep symbols of inline functions
	compile_flag("-fkeep-inline-functions" KEEP_INLINE_FUNCTIONS DEBUG)

	# optimisations with SSE and SSE2
	compile_flag("-msse" SSE BETA RELEASE)
	compile_flag("-msse2" SSE2 BETA RELEASE)
	compile_flag("-mfpmath=sse" FPMATH_SSE BETA RELEASE)

	# symbols visibility
	# This flag is mandatory to avoid silent symbol collisions
	compile_flag("-fvisibility=hidden" VISIBILITY_HIDDEN DEBUG BETA RELEASE)

	# dynamic lib
	#link_flag("-dynamiclib" DYNAMIC_LIB EXE MODULE SHARED)

	# warnings will mainly be set later, only for internal projects

	# do not warn about unknown pragmas
	compile_flag("-Wno-unknown-pragmas" W_NO_UNKNOWN_PRAGMAS DEBUG BETA RELEASE)
	compile_flag("-Wno-pragmas" W_NO_PRAGMAS_ERROR DEBUG BETA RELEASE)

	# do not warn for future c++11 extensions
	compile_flag("-Wno-c++11-extensions" W_NO_CPP11_EXTENSIONS  DEBUG BETA RELEASE)

endif()


if (MSVC)
	# Optimization level 
	compile_flag("/Od" OPTIMIZATION_LEVEL_DEBUG DEBUG)
	compile_flag("/Ox" OPTIMIZATION_LEVEL_FULL  BETA RELEASE)

	# Buffer overrun detection
	compile_flag("/GS" BUFFER_OVERRUN DEBUG BETA)
	# Stack probes
	compile_flag("/Gs"  STACK_PROBES  DEBUG BETA)

	# Whole program optimization (-flto)
	compile_flag("/GL" WHOLE_PROGRAM_OPTIMIZATION  BETA RELEASE)
endif()



# NDEBUG in release
if (NOT MSVC)
	set(CMAKE_C_FLAGS_RELEASE   "${CMAKE_C_FLAGS_RELEASE}   -DNDEBUG")
	set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -DNDEBUG")
else()
	set(CMAKE_C_FLAGS_RELEASE   "${CMAKE_C_FLAGS_RELEASE}   /DNDEBUG")
	set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} /DNDEBUG")
endif()


if (MINGW)
	# Threading support
	compile_flag("-mthreads" MINGW_THREADS_SUPPORT DEBUG BETA RELEASE)
endif()


# library / standard function detection
# getenv
check_function("getenv" HAVE_GETENV "stdlib.h" "")
check_function("secure_getenv" HAVE_SECURE_GETENV "stdlib.h" "-D_GNU_SOURCE")



# keep a copy of all minimal flags for clang/gcc
set(WAK_MINIMAL_CXX_FLAGS_DEBUG   "${CMAKE_CXX_FLAGS_DEBUG}")
set(WAK_MINIMAL_CXX_FLAGS_BETA    "${CMAKE_CXX_FLAGS_BETA}")
set(WAK_MINIMAL_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE}")
set(WAK_MINIMAL_C_FLAGS_DEBUG     "${CMAKE_C_FLAGS_DEBUG}")
set(WAK_MINIMAL_C_FLAGS_BETA      "${CMAKE_C_FLAGS_BETA}")
set(WAK_MINIMAL_C_FLAGS_RELEASE   "${CMAKE_C_FLAGS_RELEASE}")


# disable all standard warnings (for now) for all external libraries
compile_flag("-w" NO_WARNING DEBUG BETA RELEASE)



if (ASSERT_SHOULD_BREAK STREQUAL No)
	# prevent the process from beeing killed on assert if not ran inside debugger
	add_definitions(-DASSERT_DONT_BREAK)
	message(STATUS "Asserts won't break !")
else()
	message(STATUS "Asserts will break !")
endif()


# Default lib name is libHTTPServer.so for all configurations, but KernelIPC doesn't like it.
# To Please KernelIPC, components have to adopt the following convention on lib name :
# - Debug : HTTPServerDebug.so
# - Beta : HTTPServerBeta.so
# - Release : HTTPServer.so
if (CMAKE_BUILD_TYPE STREQUAL debug)
	set(CMAKE_SHARED_LIBRARY_PREFIX "")
	set(CMAKE_SHARED_LIBRARY_SUFFIX "Debug.so")
elseif (CMAKE_BUILD_TYPE STREQUAL beta)
	set(CMAKE_SHARED_LIBRARY_PREFIX "")
	set(CMAKE_SHARED_LIBRARY_SUFFIX "Beta.so")
elseif (CMAKE_BUILD_TYPE STREQUAL release)
	set(CMAKE_SHARED_LIBRARY_PREFIX "")
	set(CMAKE_SHARED_LIBRARY_SUFFIX ".so")
else()
	message(SEND_ERROR "Unknown configuration '${CMAKE_BUILD_TYPE}'")
endif()




set(Depot "${PROJECT_SOURCE_DIR}/../../../..")


# Usefull Directories
set(4DRoot          "${Depot}/4eDimension/${BRANCH_l}/4D")
set(WakandaRoot     "${Depot}/Wakanda/${BRANCH_l}")
set(CopyFilesRoot   "${Depot}/Tools/BuildLinux/scripts_compil_${BRANCH_l}/Scripts")
set(AppRoot         "${WakandaRoot}/apps/linux/${CMAKE_BUILD_TYPE}${ARCH_TAG}")
set(ComponentsRoot  "${Depot}/Components/${BRANCH_u}")
set(XBoxRoot        "${Depot}/XToolbox/${BRANCH_u}")

if (${USE_V8_ENGINE})
	set(AppRoot    "${WakandaRoot}/apps/linux-v8/${CMAKE_BUILD_TYPE}${ARCH_TAG}")
endif()




#
# EXTERNAL LIBS (configure/autotools required)
#
message(STATUS "")
message(STATUS "configuring external libraries")

include(ext-cap-ng.cmake)
include(ext-openssl.cmake)
include(ext-termcap.cmake)
include(ext-zlib.cmake)
include(ext-curl.cmake)
include(ext-zip.cmake)
include(ext-bsd.cmake)
include(ext-uuid.cmake)
include(ext-icu.cmake)
include(ext-xerces.cmake)
include(ext-odbc.cmake)
include(ext-ldap.cmake)
include(ext-webkit.cmake)
include(ext-v8.cmake)


# Checking that the JS engine has been properly defined
if ("${JSEngineIncludeDir}" STREQUAL "")
	message(SEND_ERROR "Invalid include dir for JS engine (webkit or v8)")
endif()
if ("${JSEngineLibs}")
endif()







#
# Core libraries
#
message(STATUS "")
message(STATUS "configuring internal libraries")

# restore default compiler flags
set(CMAKE_CXX_FLAGS_DEBUG    "${WAK_MINIMAL_CXX_FLAGS_DEBUG}")
set(CMAKE_CXX_FLAGS_BETA     "${WAK_MINIMAL_CXX_FLAGS_BETA}")
set(CMAKE_CXX_FLAGS_RELEASE  "${WAK_MINIMAL_CXX_FLAGS_RELEASE}")
set(CMAKE_C_FLAGS_DEBUG      "${WAK_MINIMAL_C_FLAGS_DEBUG}")
set(CMAKE_C_FLAGS_BETA       "${WAK_MINIMAL_C_FLAGS_BETA}")
set(CMAKE_C_FLAGS_RELEASE    "${WAK_MINIMAL_C_FLAGS_RELEASE}")


# enable more flags (mainly for warnings detection)
if (NOT MSVC)
	# C++ Standard mode
	compile_flag("-std=c++11" CPP_STD_11  DEBUG BETA RELEASE)

	# enable static analyzer for clang
	compile_flag("--analyze" ANALYZER DEBUG BETA RELEASE)

	# enable al lwarnings
	compile_flag("-W"      W       DEBUG BETA RELEASE)
	compile_flag("-Wall"   W_ALL   DEBUG BETA RELEASE)
	compile_flag("-Wextra" W_EXTRA DEBUG BETA RELEASE)
	# warn about missing return
	compile_flag("-Wreturn-type" W_RETURN_TYPE DEBUG BETA RELEASE)

	# do not warn for invalid comparison of integers of different signs
	compile_flag("-Wno-sign-compare" W_NO_SIGN_COMPARE DEBUG BETA RELEASE)
	# do not warn for unused parameters
	compile_flag("-Wno-unused-parameter" W_NO_UNUSED_PARAMETER	DEBUG BETA RELEASE)
	# do not warn about fields initialized after another fields
	compile_flag("-Wno-reorder" W_NO_REORDER DEBUG BETA RELEASE)
	# do not warn about some deprecated includes
	compile_flag("-Wno-deprecated" W_NO_DEPRECATED DEBUG BETA RELEASE)

	# documentation warnings
	# compile_flag("-Wdocumentation" W_DOCUMENTATION  DEBUG BETA)
endif()


# platform.h
add_definitions("-DHAVE_CMAKE_PLATFORM_H")
# Thread safety - prefer reentrant versions
add_definitions("-D_REENTRANT")

if (ARCH STREQUAL "64")
	# enable large files
	add_definitions("-D_FILE_OFFSET_BITS=64")
endif()

if (USE_V8_ENGINE)
	add_definitions("-DUSE_V8_ENGINE=1")
endif()

#
# platform.h
#
message(STATUS "configure file: ${XBoxRoot}/Kernel/Sources/CMakePlatform.h")
configure_file(${CMAKE_CURRENT_SOURCE_DIR}/platform.h.cmake	 ${XBoxRoot}/Kernel/Sources/CMakePlatform.h)

add_definitions(-DHAVE_PLATFORM_H)


include("core-libraries.cmake")





#
# Components
#
include("components.cmake")
if (EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/components-enterprise.cmake")
	include("components-enterprise.cmake")
endif()


#
# Tests
#
if (BUILD_WAKANDA_TEST AND EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/tests.cmake")
	include(tests.cmake)
endif()



#
# Wakanda Server
#
if (BUILD_WAKANDA_SERVER_COMMUNITY OR BUILD_WAKANDA_SERVER_ENTERPRISE)
	set(WakandaServerRoot  ${WakandaRoot}/Server CACHE INTERNAL "Path to WakandaServer")
	set(WakandaServerProj  ${WakandaServerRoot}/Projet/CMake CACHE INTERNAL "Path to wakanda server cmakelist")
	set(WakandaServerBuild ${WakandaServerProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG} CACHE INTERNAL "Build")
	add_subdirectory(${WakandaServerProj} ${WakandaServerBuild})
endif()

if (BUILD_WAKANDA_SHELL)
	set(ShellRoot  ${WakandaRoot}/shell CACHE INTERNAL "Path to wakanda shell")
	set(ShellProj  ${ShellRoot}/Project/CMake)
	set(ShellBuild ${ShellProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})
	add_subdirectory(${ShellProj} ${ShellBuild})
endif()



#
# Post processing
#
completion_write()


