
if (${USE_V8_ENGINE})

	message(STATUS "js engine : v8")

	set(v8_version "3.25"  CACHE INTERNAL "V8 version")
	set(v8_with_snapshot  "off") # on/off

	# The macro USE_V8_ENGINE is set right before declaring internal libs
	# (in the main CMakeLists.txt)

	# V8 Target build
	# release or debug, according the current target
	if ("${CMAKE_BUILD_TYPE}" STREQUAL "Debug")
		set(v8_target_build "debug")
	else()
		set(v8_target_build "release")
	endif()

	# V8 arch, matching the current one
	if (${ARCH} STREQUAL "64")
		set(v8_arch "x64")
	else()
		set(v8_arch "ia32")
	endif()



	set(v8_root                   "${Depot}/V8/${v8_version}" CACHE INTERNAL "Path to JavascriptCore src.")
	set(v8_build_rootdir          "${v8_root}/build/4d/${BRANCH_l}/${v8_arch}.${v8_target_build}")
	set(v8_build_dir              "${v8_build_rootdir}/obj.target/tools/gyp/")
	set(v8_static_lib_base        "${v8_build_dir}/libv8_base.${v8_arch}.a")
	set(v8_static_lib_nosnapshot  "${v8_build_dir}/libv8_nosnapshot.${v8_arch}.a")
	math(EXPR v8_nbjobs "${PROCESSOR_COUNT}")
	math(EXPR v8_loadaverage "${PROCESSOR_COUNT} + ${PROCESSOR_COUNT} / 4") # far from ideal, but should be good enough.
	if ("${v8_loadaverage}" EQUAL 0)
		set(v8_loadaverage 1)
	endif()

	if (NOT EXISTS "${v8_root}")
		message(SEND_ERROR "The folder '${v8_root}' is missing")
	endif()
	set(JSEngineIncludeDir  "${v8_root}/include" CACHE INTERNAL "JS Engine include dir")
	set(JSEngineLibs        "${v8_static_lib_base}" "${v8_static_lib_nosnapshot}" CACHE INTERNAL "JS Engine libraries")
	set(JSEngineDeps        "extlib_v8" CACHE INTERNAL "JS Engine dependencies")

	# Command required for building V8 libraries
	set(v8_build_command "CC=clang CXX=clang++ CXXFLAGS=\"-fPIC\" GYP_DEFINES=\"clang=1\" ")
	set(v8_build_command "${v8_build_command} make ${v8_arch}.${v8_target_build}")
	set(v8_build_command "${v8_build_command}    -j ${v8_nbjobs} -l ${v8_loadaverage}")
	set(v8_build_command "${v8_build_command}    snapshot=${v8_with_snapshot}")
	set(v8_build_command "${v8_build_command}    OUTDIR=build/4d/${BRANCH_l}")


	# How to build V8 library
	if (NOT WIN32 AND NOT WIN64)
		add_custom_command(
			OUTPUT
				"${v8_static_lib_base}"
				"${v8_static_lib_nosnapshot}"
			DEPENDS
				Icu
			COMMENT "Building V8 static libraries"
			VERBATIM
			COMMAND sh -c "${v8_build_command}" WORKING_DIRECTORY "${v8_root}")

		add_custom_target(extlib_v8
			SOURCES "${v8_static_lib_base}" "${v8_static_lib_nosnapshot}")
	endif()


	# clean
	set_directory_properties(PROPERTIES ADDITIONAL_MAKE_CLEAN_FILES "${v8_build_rootdir}")

endif()
