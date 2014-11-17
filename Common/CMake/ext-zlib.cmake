if(NOT MSVC)

	find_package(ZLIB)

	if(ZLIB_FOUND)

		message(STATUS "zlib: include: ${ZLIB_INCLUDE_DIRS}")
		message(STATUS "zlib: libs:    ${ZLIB_LIBRARIES}")
		message(STATUS "zlib: defs:    ${ZLIB_DEFINITIONS}")

		set(ZLibIncludeDir "${ZLIB_INCLUDE_DIRS}")
		set(ZLibLibs       "${ZLIB_LIBRARIES}")
		set(ZLibSystemIncludeDir "${ZLIB_INCLUDE_DIRS}")
		set(ZLibSystemLibs       "${ZLIB_LIBRARIES}")

	else()

		message(SEND_ERROR "zlib not found.")
		message(SEND_ERROR "package: debian/ubuntu: zlib1g-dev")

	endif()

endif()


if (MONOLITIC)

  #jmo - Don't forget to update zconf.h for default symbol visibility
  set(ZLibRoot	${Depot}/zlib/1.2.5 CACHE INTERNAL "Path to zlib src.")
  set(ZLibProj	${ZLibRoot}/projects/CMake)
  set(ZLibBuild	${ZLibProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})
  
  set(ZLibLibs ZLib)
  add_subdirectory(${ZLibProj} ${ZLibBuild})
  	
endif()
