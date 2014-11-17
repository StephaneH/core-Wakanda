unset(HAVE_TERMCAP)
unset(HAVE_CURSES)

if (NOT MSVC)

	find_package(Termcap)
	if (TERMCAP_FOUND)
		message(STATUS "termcap: include: ${TERMCAP_INCLUDE_DIR}")
		message(STATUS "termcap: libs:    ${TERMCAP_LIBRARIES}")
		message(STATUS "termcap: defs:    ${TERMCAP_DEFINITIONS}")
		set(HAVE_TERMCAP true)
	else()
		message(WARNING "termcap library is missing (debian: libncurses5-dev)")
	endif()

	#find_package(Curses)
	#if (CURSES_FOUND)
	#	message(STATUS "curses: include: ${CURSES_INCLUDE_DIR}")
	#	message(STATUS "curses: libs:    ${CURSES_LIBRARIES}")
	#	message(STATUS "curses: defs:    ${CURSES_DEFINITIONS}")
	#	set(HAVE_CURSES true)
	#else()
	#	message(WARNING "curses library is missing (debian: libncurses5-dev)")
	#endif()

endif()


