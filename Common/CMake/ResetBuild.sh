#!/bin/bash

#Utilisation : ./ResetBuild.sh [clang] [eclipse]

usage()
{
    echo "usage : ./ResetBuild.sh [-DSOME_DEFINE=xxx] [-DSOME_OTHER_DEFINE=yyy]"
    exit 1
}

while getopts :D: opt
do
case ${opt} in
	D) ExtraDefs="$ExtraDefs -D${OPTARG}";;
    ?) echo "Bad option : ${OPTARG}" ; usage ;;
  esac
done

shift $((OPTIND-1))

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


find "${repo}" -regextype posix-egrep -iregex ".*/Build/(Main|WAK[0-9]+)?(Debug|Beta|Release)(32|64).*$" -prune -exec rm -Rf "{}" \;


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
			
			#Verrue pour avoir un repertoire xxx par defaut qui pointe sur xxx64
			if [ ${arch} = "64" ]
			then
				ln -sf "${repo}/Wakanda/${branch}/Common/CMake/Build/${conf}${tag}" "${repo}/Wakanda/${branch}/Common/CMake/Build/${conf}"		
			fi

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
${cmake} -G "\${Generator}" \${Defs} ${ExtraDefs} -DCMAKE_BUILD_TYPE=${conf} -DARCH=${arch} -DBRANCH=${branch} ../..
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

			cat > "${dir}/Clean.sh" <<EOF
echo "Cleaning branch ${branch}, conf ${conf}, arch ${arch}"

refresh_org="${dir}/Refresh.sh"
clean_org="${dir}/Clean.sh"

refresh_tmp="/tmp/Refresh${RANDOM}.sh"
clean_tmp="/tmp/Clean${RANDOM}.sh"

mv "\${refresh_org}" "\${refresh_tmp}"
mv "\${clean_org}" "\${clean_tmp}"

#jmo - Le /.* à la fin de la regexp evite que les répertoires dans lesquels les shells sont ouverts soient supprimés 
find "${repo}" -regextype posix-egrep -iregex ".*/${branch}/.*/CMake/Build/${conf}${tag}/.*" -prune -exec rm -Rf -- {} \;

#jmo - Le .* à la fin de la regexp permet de prendre les xxx.done des target non gérées par CMake (ie OpenSSL)
find "${repo}" -regextype posix-egrep -iregex ".*/Build/${branch}${conf}${tag}.*" -prune -exec rm -Rf -- {} \;

mv "\${refresh_tmp}" "\${refresh_org}"
mv "\${clean_tmp}" "\${clean_org}"

"${dir}/Refresh.sh"

EOF

			chmod +x ${dir}/Refresh.sh ${dir}/Clean.sh

    		if ${dir}/Refresh.sh ${*} > ${dir}/${log} 2>&1
    		then
				printf "   - Branch %s Conf %-7s %-3s ok\n" "${branch}" "${conf}" "${arch}"
    		else
				printf "   - Branch %s Conf %-7s %-3s KO (see %s)\n" "${branch}" "${conf}" "${arch}" "${dir}/${log}"
    		fi
		done
	done
done
