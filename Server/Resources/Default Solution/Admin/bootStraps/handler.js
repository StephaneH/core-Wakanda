function ReadFile(request, response) {

    var i,
            str,
            file,
            stream,
            filePath,
            parameter,
            parameters,
            logFilePathHash;

    fileOption = {};
    parameters = request.urlQuery.split("&");

    for (i = 0; i < parameters.length; i++) {
        parameter = parameters[i].split("=");
        switch (parameter[0]) {
            case "name" :
            case "url" :
            case "download" :
            case "maxLength" :
                fileOption[parameter[0]] = parameter[1];
                break;
        }
    }

    logFilePathHash = storage.getItem("logFilePathHash");
    filePath = logFilePathHash[fileOption.name];

    if (fileOption.hasOwnProperty("url")) {
        fileOption.url = (fileOption.url === "true" ? true : false);
    }

    if (fileOption.hasOwnProperty("download")) {
        fileOption.download = (fileOption.download === "true" ? true : false);
    }

    try {
        if (File.isFile(filePath)) {
            file = File(filePath);

            if (fileOption.hasOwnProperty("url") && fileOption.url === true) {

                str = file.getURL();
                return str;
            } else if (fileOption.hasOwnProperty("download") && fileOption.download === true) {

                response.headers["CONTENT_TYPE"] = 'application/octet-stream';
                response.headers["content-disposition"] = 'attachement; filename=' + file.name;
                response.body = file.toBuffer().toBlob();

                response = str;
            } else {

                stream = TextStream(file, "read");

                if (fileOption.hasOwnProperty("maxLength") && fileOption.maxLength > 0) {

                    str = stream.read(fileOption.maxLength);
                } else {

                    str = stream.read();
                }
                return str;
            }
        }

    } catch (e) {
        console.log("Error on read file " + fileOption.name, e);
    }
}