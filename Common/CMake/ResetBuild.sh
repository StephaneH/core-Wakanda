#!/bin/bash

#Utilisation : ./ResetBuild.sh [clang] [eclipse]

#Initialisation des repertoires
RepC=`pwd`
RepS=`dirname $0`
if [ "${RepS:0:1}" = "." ] ; then
	RepS=${RepC}${RepS:1}
fi

#Initialisation de la commande CMake
if [ -x "${HOME}/local/bin/cmake" ]
then
    cmake="${HOME}/local/bin/cmake"
elif [ -x "/opt/cmake/bin/cmake" ]
then
    cmake="/opt/cmake/bin/cmake"
else
    cmake="cmake"
fi

#On intercepte le parametre 'clang' optionel en premiere position
if [ "${1}" = 'clang' ]
then
    shift

    clang="$(which clang)"
    clangpp="$(which clang++)"

    if [ "${clang}" -a "${clangpp}" ]
    then
	cmakeCompilers="-DCMAKE_C_COMPILER=${clang} -DCMAKE_CXX_COMPILER=${clangpp}"
	echo "Beta - Using clang compilers : ${clang} and ${clangpp}"
    else
	echo "Can't find clang and clang++ !"
	exit 1
    fi
fi

repo=$(echo $RepS | sed 's:/depot\(/.*\)\?::g')

if [ -z "${repo}" ]
then
    echo "Can't find repository root !"
    exit 1
else
    echo "Repository root is ${repo}"
fi

find "${repo}" -ipath "*/CMake/Build/*" -prune -exec rm -Rf "{}"  \;

log="cmake.log"

for conf in "Debug" "Beta" "Release"
do
    dir="${RepS}/Build/${conf}"
    mkdir -p "${dir}"

    cat > "${RepS}/Build/${conf}/Refresh.sh" <<EOF
#!/bin/bash

#Cmake generators are described here :
#http://www.vtk.org/Wiki/CMake_Generator_Specific_Information

#Infamous Eclipse stuff is documented here :
# - http://www.vtk.org/Wiki/CMake:Eclipse_UNIX_Tutorial
# - http://www.vtk.org/Wiki/Eclipse_CDT4_Generator
#Look for '.cproject' and '.project' files

Generator='Unix Makefiles'
Defs='-DASSERT_SHOULD_BREAK=No'

if [ -n "\${1}" ]
then
    choice=\$(echo \${1} | tr "[A-Z]" "[a-z]")
    case "\${choice}" in
     "make")
	  Generator='Unix Makefiles' ;;
      "eclipse")
	  Generator='Eclipse CDT4 - Unix Makefiles'
	  Defs='-DASSERT_SHOULD_BREAK=Yes'
	  FixIt=${repo}/depot/Wakanda/main/Common/CMake/FixEclipse.sh ;;
      "codeblocks")
	  Generator='CodeBlocks - Unix Makefiles' ;;
      "kdevelop")
	  Generator='KDevelop3 - Unix Makefiles' ;;
      *)
	  echo "Bad Generator '\${choice}'; Valid choices are : make, eclipse, codeblocks, kdevelop"
	  exit 1
    esac
fi

Defs="\${Defs} ${cmakeCompilers}"

#jmo - this pushd sucks but I can't find any good way to call cmake without going
#      to config directory first : cmake only generates its files in its CWD !
conf_dir=\$(dirname "\${0}")

pushd "\${conf_dir}" > /dev/null

echo "Selected generator is '\${Generator}' : "
${cmake} -G "\${Generator}" \${Defs} -DCMAKE_BUILD_TYPE=${conf} ../..
rv=\${?}

#Sometimes we need to apply some fix to cmake generated stuff.
\${FixIt:true}

popd > /dev/null

#If we are called with multiple generators, recurse and process them.
#jmo - ok, it's poorly written ;)
shift

if [ -n "\${1}" ]
then
    "\${0}" "\${*}"
fi

exit \${rv}

EOF

    chmod +x ${RepS}/Build/${conf}/Refresh.sh

    if ${RepS}/Build/${conf}/Refresh.sh ${*} > ${RepS}/Build/${conf}/${log} 2>&1
    then
	echo "   - Conf ${conf} ok"
    else
	echo "   - Conf ${conf} KO (see ${dir}/${log})"
    fi

done
