

message(STATUS "configuring tests")



set(VTaskTestsRoot  ${XBoxRoot}/Tests/Tasks CACHE INTERNAL "Path to VTaskTests")
set(VTaskTestsProj  ${VTaskTestsRoot}/Projects/CMake)
set(VTaskTestsBuild ${VTaskTestsProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${VTaskTestsProj} ${VTaskTestsBuild})


set(VFileTestsRoot  ${XBoxRoot}/Tests/Files CACHE INTERNAL "Path to VFileTests")
set(VFileTestsProj  ${VFileTestsRoot}/Projects/CMake)
set(VFileTestsBuild ${VFileTestsProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${VFileTestsProj} ${VFileTestsBuild})


set(VStringTestsRoot  ${XBoxRoot}/Tests/Strings CACHE INTERNAL "Path to VStringTests")
set(VStringTestsProj  ${VStringTestsRoot}/Projects/CMake)
set(VStringTestsBuild ${VStringTestsProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${VStringTestsProj} ${VStringTestsBuild})


set(ServerNetTestsRoot  ${XBoxRoot}/Tests/ServerNet CACHE INTERNAL "Path to VServerNetTests")
set(ServerNetTestsProj  ${ServerNetTestsRoot}/Projects/CMake)
set(ServerNetTestsBuild ${ServerNetTestsProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${ServerNetTestsProj} ${ServerNetTestsBuild})


set(VFSNTestsRoot  ${XBoxRoot}/Tests/Notifications CACHE INTERNAL "Path to VFSNTests")
set(VFSNTestsProj  ${VFSNTestsRoot}/Projects/CMake)
set(VFSNTestsBuild ${VFSNTestsProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${VFSNTestsProj} ${VFSNTestsBuild})


set(JSContextTestsRoot  ${XBoxRoot}/Tests/JSContexts CACHE INTERNAL "Path to VJSContextTests")
set(JSContextTestsProj  ${JSContextTestsRoot}/Projects/CMake)
set(JSContextTestsBuild ${JSContextTestsRoot}/build/${CMAKE_BUILD_TYPE})

add_subdirectory(${JSContextTestsProj} ${JSContextTestsBuild})


if (USE_V8_ENGINE)
	set(JavaScriptV8Root  ${XBoxRoot}/Tests/V8 CACHE INTERNAL "Path to JavaScript src.")
	set(JavaScriptV8Proj  ${JavaScriptV8Root}/Projects/CMake)
	set(JavaScriptV8Build ${JavaScriptV8Proj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

	add_subdirectory(${JavaScriptV8Proj} ${JavaScriptV8Build})
endif()


