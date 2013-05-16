cmake_minimum_required(VERSION 2.8)
project(WakandaServer)


file(GLOB Sources ${WakandaServerRoot}/Sources/*.cpp)
list(REMOVE_ITEM Sources ${WakandaServerRoot}/Sources/testMySQLConnector.cpp)

file(GLOB SourcesCommon ${WakandaRoot}/Common/Sources/*.cpp)

list(APPEND Sources ${SourcesCommon})


add_executable(Wakanda ${Sources})


add_definitions(-DVERSION_LINUX=1 -DRIA_SERVER)


include_directories(
  ${ComponentsRoot}
  ${DB4DIncludeDir}
  ${IcuIncludeDir}
  ${JsCoreIncludeDir}
  ${WakandaRoot}/Common/Sources
  ${WakandaServerRoot}/Sources
  ${XBoxRoot}
  )


target_link_libraries(Wakanda Graphics JavaScript JsDebugger Kernel KernelIPC ServerNet Xml)


add_dependencies(Wakanda DB4D HTTPServer LanguageSyntax SecurityManager UsersAndGroups Zip)


add_custom_command(TARGET Wakanda PRE_BUILD
  COMMAND perl ${Depot}/Tools/Versionning/Wakanda_versionning_linux.perl ${WakandaRoot}/Server/Projet/Visual/WakandaVersNum.h)

#The default behavior is to copy resources each time Wakanda is linked sucessfully...
add_custom_command(TARGET Wakanda POST_BUILD
  COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${WakandaRoot}/walib/WAF/Loader.js
  COMMAND mkdir -p ${AppRoot}/Wakanda\ Server
  COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh ${AppRoot}/Wakanda\ Server E)

#But sometimes we need this more specific target that performs ressources copy only
add_custom_target(Resources
  COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${WakandaRoot}/walib/WAF/Loader.js
  COMMAND mkdir -p ${AppRoot}/Wakanda\ Server
  COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh ${AppRoot}/Wakanda\ Server E)
