if(NOT MONOLITIC)

	find_package(LibZip)

	if(LIBZIP_FOUND)

		message(STATUS "libzip: include: ${LIBZIP_INCLUDE_DIRS}")
		message(STATUS "libzip: libs:    ${LIBZIP_LIBRARIES}")
		message(STATUS "libzip: defs:    ${LIBZIP_DEFINITIONS}")

		set(LibzipIncludeDir "${LIBZIP_INCLUDE_DIRS}" CACHE STRING "libzip include dirs")
		set(LibZipLibs       "${LIBZIP_LIBRARIES}" CACHE STRING "libzip libs")

	else()

		message(SEND_ERROR "libzip not found.")
		message(SEND_ERROR "package: debian/ubuntu: libzip-dev")

	endif()

else()

	set(LibZipRoot	${Depot}/libzip/0.10 CACHE INTERNAL "Path to zip lib src.")
	set(LibZipProj	${LibZipRoot}/Projects/CMake)
	set(LibZipBuild	${LibZipProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})
	add_subdirectory(${LibZipProj} ${LibZipBuild})
  
endif()
