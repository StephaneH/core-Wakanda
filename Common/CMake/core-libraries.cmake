

set(KernelRoot  ${XBoxRoot}/Kernel CACHE INTERNAL "Path to Kernel src.")
set(KernelProj  ${KernelRoot}/Projects/CMake)
set(KernelBuild ${KernelProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${KernelProj} ${KernelBuild})


set(KernelIPCRoot  ${XBoxRoot}/KernelIPC CACHE INTERNAL "Path to KernelIPC src.")
set(KernelIPCProj  ${KernelIPCRoot}/Projects/CMake)
set(KernelIPCBuild ${KernelIPCProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${KernelIPCProj} ${KernelIPCBuild})


set(ServerNetRoot  ${XBoxRoot}/ServerNet CACHE INTERNAL "Path to ServerNet src.")
set(ServerNetProj  ${ServerNetRoot}/Projects/CMake)
set(ServerNetBuild ${ServerNetProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${ServerNetProj} ${ServerNetBuild})


set(XMLRoot  ${XBoxRoot}/XML CACHE INTERNAL "Path to XML src.")
set(XMLProj  ${XMLRoot}/Projects/CMake)
set(XMLBuild ${XMLProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${XMLProj} ${XMLBuild})


set(JavaScriptRoot  ${XBoxRoot}/JavaScript CACHE INTERNAL "Path to JavaScript src.")
set(JavaScriptProj  ${JavaScriptRoot}/Projects/CMake)
set(JavaScriptBuild ${JavaScriptProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${JavaScriptProj} ${JavaScriptBuild})


set(JsDebuggerRoot  ${XBoxRoot}/JSDebugger CACHE INTERNAL "Path to JsDebugger src.")
set(JsDebuggerProj  ${JsDebuggerRoot}/Projects/CMake)
set(JsDebuggerBuild ${JsDebuggerProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${JsDebuggerProj} ${JsDebuggerBuild})


set(GraphicsRoot  ${XBoxRoot}/Graphics CACHE INTERNAL "Path to Graphics src.")
set(GraphicsProj  ${GraphicsRoot}/Projects/CMake)
set(GraphicsBuild ${GraphicsProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${GraphicsProj} ${GraphicsBuild})

set(TextCoreRoot  ${XBoxRoot}/TextCore CACHE INTERNAL "Path to TextCore src.")
set(TextCoreProj  ${TextCoreRoot}/Projects/CMake)
set(TextCoreBuild ${TextCoreProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${TextCoreProj} ${TextCoreBuild})

set(SQLUtilitiesRoot  ${XBoxRoot}/SQL CACHE INTERNAL "Path to SQLUtilities src.")
set(SQLUtilitiesProj  ${SQLUtilitiesRoot}/Projects/CMake)
set(SQLUtilitiesBuild ${SQLUtilitiesProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${SQLUtilitiesProj} ${SQLUtilitiesBuild})


set(SQLModelRoot  ${XBoxRoot}/SQLModel CACHE INTERNAL "Path to SQLModel src.")
set(SQLModelProj  ${SQLModelRoot}/Projects/CMake)
set(SQLModelBuild ${SQLModelProj}/build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${SQLModelProj} ${SQLModelBuild})


