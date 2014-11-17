
set(XercesRoot  ${Depot}/xerces/3.0.1 CACHE INTERNAL "Path to xerces src.")
set(XercesProj  ${XercesRoot}/xerces/projects/CMake)
set(XercesBuild ${XercesProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_definitions(-DXERCES_3_0_1)
add_subdirectory(${XercesProj} ${XercesBuild})


