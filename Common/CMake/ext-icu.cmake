
set(IcuRoot  ${Depot}/icu/4.8 CACHE INTERNAL "Path to ICU distrib.")
set(IcuProj  ${IcuRoot}/projets/CMake)
set(IcuBuild ${IcuProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_definitions(-Dxbox_icu=icu_48)
add_subdirectory(${IcuProj} ${IcuBuild})


