if(NOT MSVC)

	find_package(LibUUID)

	if (LIBUUID_FOUND)

		message(STATUS "libuuid: include: ${LIBUUID_INCLUDE_DIRS}")
		message(STATUS "libuuid: libs:    ${LIBUUID_LIBRARIES}")
		message(STATUS "libuuid: defs:    ${LIBUUID_DEFINITIONS}")

		set(UuidIncludeDir       "${LIBUUID_INCLUDE_DIRS}" CACHE STRING "libuuid include dirs")
		set(UuidLibs             "${LIBUUID_LIBRARIES}" CACHE STRING "libuuid libs")
		set(UuidSystemIncludeDir "${LIBUUID_INCLUDE_DIRS}" CACHE STRING "libuuid include dirs (system)")
		set(UuidSystemLibs       "${LIBUUID_LIBRARIES}" CACHE STRING "libuuid libs (system)")

	else()
		message(SEND_ERROR "libuuid not found.")
		message(SEND_ERROR "package: debian/ubuntu: uuid-dev")
	endif()

endif()




if (MONOLITIC)
	set(UuidRoot	${Depot}/libuuid/2.22 CACHE INTERNAL "Path to UUID src.")
	set(UuidProj	${UuidRoot}/CMake)
	set(UuidBuild	${UuidProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})

	set(UuidLibs Uuid)
	add_subdirectory(${UuidProj} ${UuidBuild})

endif()
