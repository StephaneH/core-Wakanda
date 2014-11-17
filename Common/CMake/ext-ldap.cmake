
#ael configuration are in portable.h
set(LibLDAPRoot ${Depot}/libldap/2.4.39 CACHE INTERNAL "Path to libLDAP src.")
set(LibLDAPProj ${LibLDAPRoot}/Projects/CMake)
set(LibLDAPBuild ${LibLDAPProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${LibLDAPProj} ${LibLDAPBuild})



