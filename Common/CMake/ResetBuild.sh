#!/bin/bash

#Utilisation : ./ResetBuild.sh [clang] [eclipse]


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

repo=$(realpath "${0}" | sed -E 's:/depot.*:/depot:g')

if [ -z "${repo}" ]
then
    echo "Can't find repository root !"
    exit 1
else
    echo "Repository root is ${repo}"
fi

find "${repo}" -ipath "*/CMake/Build/*" -prune -exec rm -Rf "{}" \;

log="cmake.log"

for branch in $(ls "${repo}/Wakanda/" | sort)
do

	for conf in "Debug" "Beta" "Release"
	do

		for arch in "64" "32"
		do

			if [ ${arch} != "64" ]
			then
				tag=${arch}
			else
				tag=${arch}
			fi

			dir="${repo}/Wakanda/${branch}/Common/CMake/Build/${conf}${tag}"
			mkdir -p "${dir}"
		
			cat > "${dir}/Refresh.sh" <<EOF
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
	  FixIt=${repo}/depot/Wakanda/${branch}/Common/CMake/FixEclipse.sh ;;
      "codeblocks")
	  Generator='CodeBlocks - Unix Makefiles' ;;
      "kdevelop")
	  Generator='KDevelop3 - Unix Makefiles' ;;
      *)
	  echo "Bad Generator '\${choice}'; Valid choices are : make, eclipse, codeblocks, kdevelop"
	  exit 1
    esac
fi

#jmo - this pushd sucks but I can't find any good way to call cmake without going
#      to config directory first : cmake only generates its files in its CWD !
conf_dir=${dir}

pushd "\${conf_dir}" > /dev/null

echo "Selected generator is '\${Generator}' : "
${cmake} -G "\${Generator}" \${Defs} -DCMAKE_BUILD_TYPE=${conf} -DARCH=${arch} -DBRANCH=${branch} ../..
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

			chmod +x ${dir}/Refresh.sh

    		if ${dir}/Refresh.sh ${*} > ${dir}/${log} 2>&1
    		then
				printf "   - Branch %s Conf %-7s %-3s ok\n" "${branch}" "${conf}" "${arch}"
    		else
				printf "   - Branch %s Conf %-7s %-3s KO (see %s)\n" "${branch}" "${conf}" "${arch}" "${dir}/${log}"
    		fi
		done
	done
done
