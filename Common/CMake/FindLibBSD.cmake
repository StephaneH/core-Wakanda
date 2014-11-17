set(LIBBSD_FOUND false)
set(LIBBSD_DEFINITIONS "")

if(NOT WIN32)

	find_path(LIBBSD_INCLUDE_DIR "bsd/stdlib.h"
		/usr/include
		/usr/local/include
		/opt/local/include)

	find_library(LIBBSD_LIBRARIES NAMES bsd PATH
		/usr/lib
		/usr/local/lib
		/opt/local/lib
		/usr/lib64)

	if(LIBBSD_INCLUDE_DIR AND LIBBSD_LIBRARIES)
		set(LIBBSD_FOUND true)
	endif()

endif()

