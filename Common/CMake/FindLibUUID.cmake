set(LIBUUID_FOUND false)
set(LIBUUID_DEFINITIONS "")

if(NOT WIN32)

	find_path(LIBUUID_INCLUDE_DIRS "uuid.h"
		/usr/include
		/usr/include/uuid
		/usr/local/include
		/opt/local/include)

	find_library(LIBUUID_LIBRARIES NAMES uuid PATH
		/usr/lib
		/usr/local/lib
		/opt/local/lib
		/usr/lib64
		/usr/lib/x86_64-linux-gnu)

	if(LIBUUID_INCLUDE_DIRS AND LIBUUID_LIBRARIES)
		set(LIBUUID_FOUND true)
	endif()

endif()

