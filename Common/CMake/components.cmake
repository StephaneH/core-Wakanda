
message(STATUS "")
message(STATUS "configuring components {community}")



set(ZipRoot  ${ComponentsRoot}/Zip CACHE INTERNAL "Path to Zip src.")
set(ZipProj  ${ZipRoot}/Projects/CMake)
set(ZipBuild ${ZipProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${ZipProj} ${ZipBuild})


set(UsersAndGroupsRoot  ${ComponentsRoot}/UsersAndGroups CACHE INTERNAL "Path to UsersAndGroups src.")
set(UsersAndGroupsProj  ${UsersAndGroupsRoot}/projects/CMake)
set(UsersAndGroupsBuild ${UsersAndGroupsProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${UsersAndGroupsProj} ${UsersAndGroupsBuild})


set(SecurityManagerRoot  ${ComponentsRoot}/Security\ Manager CACHE INTERNAL "Path to SecurityManager src.")
set(SecurityManagerProj  ${SecurityManagerRoot}/Projects/CMake)
set(SecurityManagerBuild ${SecurityManagerProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${SecurityManagerProj} ${SecurityManagerBuild})


set(HTTPServerRoot  ${ComponentsRoot}/HTTPServer CACHE INTERNAL "Path to HttpServer src.")
set(HTTPServerProj  ${HTTPServerRoot}/Projects/CMake)
set(HTTPServerBuild ${HTTPServerProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${HTTPServerProj} ${HTTPServerBuild})


set(DB4DRoot  ${ComponentsRoot}/DB4D CACHE INTERNAL "Path to DB4D src.")
set(DB4DProj  ${DB4DRoot}/projects/CMake)
set(DB4DBuild ${DB4DProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${DB4DProj} ${DB4DBuild})


set(LanguageSyntaxRoot  ${ComponentsRoot}/Language\ Syntax CACHE INTERNAL "Path to LanguageSyntax src.")
set(LanguageSyntaxProj  ${LanguageSyntaxRoot}/Projects/CMake)
set(LanguageSyntaxBuild ${LanguageSyntaxProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${LanguageSyntaxProj} ${LanguageSyntaxBuild})










add_custom_target(wakanda_components ALL
	COMMENT "Components for Wakanda Server"
	DEPENDS
	HTTPServer LanguageSyntax SecurityManager UsersAndGroups Zip)



