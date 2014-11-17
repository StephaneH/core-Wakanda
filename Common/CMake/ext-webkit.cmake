
if (${USE_JSCORE_ENGINE})

	message(STATUS "js engine : js-core (webkit)")

	set(WebKitRoot  ${Depot}/webkit/534.53 CACHE INTERNAL "Path to WebKit src.")
	set(WebCoreRoot ${WebKitRoot}/WebCore CACHE INTERNAL "Path to JavascriptCore src.")

	set(JsCoreRoot  ${WebKitRoot}/JavaScriptCore CACHE INTERNAL "Path to JavascriptCore src.")
	set(JsCoreProj  ${JsCoreRoot}/CMake)
	set(JsCoreBuild ${JsCoreProj}/build/${BRANCH_l}${CMAKE_BUILD_TYPE}${ARCH_TAG})


	add_subdirectory("${JsCoreProj}" "${JsCoreBuild}")

	set(JSEngineIncludeDir  "${JsCoreIncludeDir}" CACHE INTERNAL "JS Engine include dir")
	set(JSEngineLibs  "JsCore")
	set(JSEngineDeps  "JsCore" CACHE INTERNAL "JS Engine dependencies")

endif()

