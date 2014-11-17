set(LIBZIP_FOUND false)
set(LIBZIP_DEFINITIONS "")

if(NOT WIN32)

	find_path(LIBZIP_INCLUDE_DIR zip.h
		/usr/include
		/usr/local/include
		/opt/local/include)

	find_library(LIBZIP_LIBRARIES NAMES zip PATH
		/usr/lib
		/usr/local/lib
		/opt/local/lib
		/usr/lib64)

	if(LIBZIP_INCLUDE_DIR AND LIBZIP_LIBRARIES)
		set(LIBZIP_FOUND true)
	endif()

endif()

