
if (NOT MONOLITIC)

	find_package(CURL)

	if (CURL_FOUND)
		message(STATUS "libcurl: include: ${CURL_INCLUDE_DIRS}")
		message(STATUS "libcurl: libs:    ${CURL_LIBRARIES}")
		message(STATUS "libcurl: defs:    ${CURL_DEFINITIONS}")

		set(CurlIncludeDir "${CURL_INCLUDE_DIRS}")
		set(CurlLibs       "${CURL_LIBRARIES}")
	else()
		message(SEND_ERROR "curl not found.")
		message(SEND_ERROR "package: debian/ubuntu: libcurl4-openssl-dev")
	endif()

else()

  set(CurlRoot	${Depot}/curl/7.19.7 CACHE INTERNAL "Path to cURL src.")
  set(CurlProj	${CurlRoot}/CMake)
  set(CurlBuild	${CurlProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})
  
  set(CurlLibs    Curl)
  add_subdirectory(${CurlProj} ${CurlBuild})
  
endif()
