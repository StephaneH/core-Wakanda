
#ael - Don't forget to patch sqltypes.h for default symbol visibility
set(UnixODBCRoot  ${Depot}/unixODBC/2.3.1 CACHE INTERNAL "Path to UnixODBC src.")
set(UnixODBCProj  ${UnixODBCRoot}/Projects/CMake)
set(UnixODBCBuild ${UnixODBCProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${UnixODBCProj} ${UnixODBCBuild})


