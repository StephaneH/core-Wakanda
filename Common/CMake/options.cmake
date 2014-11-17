
# Monolitic mode
option(MONOLITIC "Monolitic mode (use embedded external libraries)" ON)


# Optional builds
option(BUILD_WAKANDA_SERVER_COMMUNITY   "Build Wakanda Server" ON)
option(BUILD_WAKANDA_SERVER_ENTERPRISE  "Build Wakanda Server" ON)
option(BUILD_WAKANDA_SHELL              "Build Wakanda Shell"  ON)

# experimental
option(BUILD_WAKANDA_TEST               "Build tests"  OFF)

# JS engine
option(USE_JSCORE_ENGINE                "Use JSCore engine {from webkit}" ON)
option(USE_V8_ENGINE                    "Use V8 engine"                   OFF)



# Configuration types
set(CMAKE_CONFIGURATION_TYPES Debug Beta Release)


# Arch
if (${CMAKE_SYSTEM_PROCESSOR} STREQUAL "x86")
	option(ARCH "Processor architecture" "32")
else()
	option(ARCH "Processor architecture" "64")
endif()












#
# Options checks
#

if (${USE_V8_ENGINE} AND ${USE_JSCORE_ENGINE})
	set(USE_JSCORE_ENGINE  OFF)
endif()

