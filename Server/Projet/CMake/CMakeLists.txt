cmake_minimum_required(VERSION 2.8)
project(WakandaServer)


file(GLOB Sources ${WakandaServerRoot}/Sources/*.cpp)

file(GLOB SourcesCommon ${WakandaRoot}/Common/Sources/*.cpp)

list(APPEND Sources ${SourcesCommon})


add_executable(Wakanda ${Sources})


add_definitions(-DVERSION_LINUX=1 -DRIA_SERVER)


#jmo - need include path cleaning !
include_directories(
  ${ComponentsRoot}
  ${DB4DIncludeDir}
  ${IcuIncludeDir}
  ${InspectorDir}
  ${JsCoreIncludeDir}
  ${ServerNetIncludeDir}
  ${XBoxRoot}
  ${WakandaRoot}/Common/Sources
  ${WakandaServerRoot}/Sources)


target_link_libraries(Wakanda Icu JavaScript JsDebugger Kernel KernelIPC ServerNet Xerces Xml)


add_dependencies(Wakanda DB4D HTTPServer LanguageSyntax SQLServer UsersAndGroups Zip)


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
