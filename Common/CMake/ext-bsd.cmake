if (NOT MSVC)

	find_package(LibBSD)

	if(LIBBSD_FOUND)
	
		message(STATUS "libbsd: include: ${LIBBSD_INCLUDE_DIRS}")
		message(STATUS "libbsd: libs:	 ${LIBBSD_LIBRARIES}")
		message(STATUS "libbsd: defs:	 ${LIBBSD_DEFINITIONS}")

		set(BsdIncludeDir "${LIBBSD_INCLUDE_DIRS}" CACHE STRING "libbsd include dirs")
		set(BsdLibs		  "${LIBBSD_LIBRARIES}" CACHE STRING "libbsd libs")
		set(BsdSystemIncludeDir "${LIBBSD_INCLUDE_DIRS}" CACHE STRING "libbsd include dirs")
		set(BsdSystemLibs		  "${LIBBSD_LIBRARIES}" CACHE STRING "libbsd libs")

	else()
		message(SEND_ERROR "libbsd not found.")
		message(SEND_ERROR "package: debian/ubuntu: libbsd-dev")
	endif()

endif()



if (MONOLITIC)
  #jmo - Don't forget to update bsd/stdlib.h for default symbol visibility

  set(BsdRoot		${Depot}/libbsd/4.2 CACHE INTERNAL "Path to BSD src.")
  set(BsdProj		${BsdRoot}/CMake)
  set(BsdBuild		${BsdProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})

  set(BsdLibs Bsd)
  add_subdirectory(${BsdProj} ${BsdBuild})

endif()
