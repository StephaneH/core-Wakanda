# Detect Redhat or Debian platform
# The following variable will be set
# LINUX_PLATFORM : debian, redhat, none
# LINUX_BIT_MODE 32|64


if (NOT WINDOWS)

	# detect linux
	if (${CMAKE_SYSTEM_NAME} MATCHES "Linux")
		set(LINUX 1 CACHE STRING "Linux edition")
	endif()

	if (${CMAKE_SYSTEM_PROCESSOR} MATCHES i386|i586|i686)
		set( BIT_MODE "32")
	else()
		set( BIT_MODE "64")
	endif()


	if (EXISTS "/etc/debian_version")
	   set( LINUX_PLATFORM "debian" CACHE INTERNAL "Linux platform")
	endif()

	if (EXISTS "/etc/redhat-release")
	   set(LINUX_PLATFORM "redhat"  CACHE INTERNAL "Linux platform")
	endif()

endif()

