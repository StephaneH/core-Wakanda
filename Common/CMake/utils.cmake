
# List all variables available in CMake internals
#
# \code
# list_all_cmake_variables(mylist)
# foreach (varname ${mylist})
#	message(STATUS "${varname}=${${varname}}")
# endforeach()
# \endcode
macro(list_all_cmake_variables  varname)
	get_cmake_property(${varname} VARIABLES)
endmacro()


# List all include directories for a single target
#
# \code
# target_get_include_directories(mylist TargetExample)
# foreach (includepath ${mylist})
#	message(STATUS " + include dir = ${includepath}")
# endforeach()
# \endcode
macro(target_get_include_directories  varname targetname)
	get_property(${varname} TARGET "${targetname}" PROPERTY INCLUDE_DIRECTORIES)
endmacro()


# List all sources for a single target
#
# \code
# target_get_sources(mylist TargetExample)
# foreach (sources ${mylist})
#	message(STATUS " + source: ${sources}")
# endforeach()
# \endcode
macro(target_get_sources  varname targetname)
	get_property(${varname} TARGET "${targetname}" PROPERTY SOURCES)
endmacro()


# List all targets
macro(target_list varname)
		set(${varname} "")
		list_all_cmake_variables(__target_list_allvars)
		foreach (__var ${__target_list_allvars})
			if (__var MATCHES "(.*)_LIB_DEPENDS")
				list(APPEND ${varname} "${CMAKE_MATCH_1}")
			endif()
		endforeach()
		unset(__target_list_allvars)
endmacro()



# Check for the existence of a compiler flag and automatically add it for given builds 
#
# \code
# automatically add -O3 in BETA and RELEASE if the flag is available
# compile_flag("-O3" OPTIMIZATION_LEVEL_3 BETA RELEASE)
# \endcode
macro(compile_flag  flag varname)
	check_cxx_compiler_flag("${flag}" "WAK_HAS_COMPILER_CXX_FLAG_${varname}")
	if ("${WAK_HAS_COMPILER_CXX_FLAG_${varname}}")
		foreach (arg ${ARGN})
			set("CMAKE_CXX_FLAGS_${arg}" "${CMAKE_CXX_FLAGS_${arg}} ${flag}")
		endforeach()
	endif()
	check_c_compiler_flag("${flag}" "WAK_HAS_COMPILER_C_FLAG_${varname}")
	if ("${WAK_HAS_COMPILER_C_FLAG_${varname}}")
		foreach (arg ${ARGN})
			set("CMAKE_C_FLAGS_${arg}" "${CMAKE_C_FLAGS_${arg}} ${flag}")
		endforeach()
	endif()
endmacro()


# Check for the existence of a linker flag and automatically add it for given builds 
#
# \code
# link_flag("-dynamiclib" DYNAMIC_LIB  EXE MODULE SHARED)
# \endcode
macro(link_flag  flag varname)
	set(CMAKE_REQUIRED_FLAGS "-Wl,${flag}")
	check_c_compiler_flag("" "WAK_HAS_COMPILER_C_FLAG_${varname}")
	if ("${WAK_HAS_COMPILER_C_FLAG_${varname}}")
		foreach (arg ${ARGN})
			set("CMAKE_${arg}_LINKER_FLAGS" "${CMAKE_${arg}_LINKER_FLAGS} -Wl,${flag}")
		endforeach()
	endif()
endmacro()



# Check for the existence of a C function
#
# \code
# check_function("getenv" HAVE_GETENV "stdlib.h" "")
# check_function("secure_getenv" HAVE_SECURE_GETENV "stdlib.h" "-D_GNU_SOURCE")
# \endcode
macro(check_function funcname varname includename def)
	set(__copy_cmake_required_includes    "${CMAKE_REQUIRED_INCLUDES}")
	set(__copy_cmake_required_definitions "${CMAKE_REQUIRED_DEFINITIONS}")
	if (NOT "${includename}" STREQUAL "")
		list(APPEND CMAKE_REQUIRED_INCLUDES  "${includename}")
	endif()
	if (NOT "${def}" STREQUAL "")
		list(APPEND CMAKE_REQUIRED_DEFINITIONS "${def}")
	endif()

	check_function_exists(${funcname} ${varname})

	set(CMAKE_REQUIRED_INCLUDES  "${__copy_cmake_required_includes}")
	set(CMAKE_REQUIRED_DEFINITIONS "${__copy_cmake_required_definitions}")
endmacro()



