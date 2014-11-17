#ifndef __Platform__
# define __Platform__


/* libcap-ng */
#cmakedefine HAVE_CAP_NG


/* getenv */
#cmakedefine HAVE_GETENV
/* secure_getenv */
#cmakedefine HAVE_SECURE_GETENV



/* termcap */
#cmakedefine HAVE_TERMCAP
/* curses.h */
#cmakedefine CURSES_HAVE_CURSES_H
/* ncurses.h */
#cmakedefine CURSES_HAVE_NCURSES_H
/* ncurses/ncurses.h */
#cmakedefine CURSES_HAVE_NCURSES_NCURSES_H
/* ncurses/curses.h */
#cmakedefine CURSES_HAVE_NCURSES_CURSES_H


#endif /* __Platform__ */
