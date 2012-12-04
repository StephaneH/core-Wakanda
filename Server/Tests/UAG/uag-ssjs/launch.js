/**

* @author ouissam.gouni@4d.com

*/
//var pathToTest = application.getFolder("path") + "test-directory.js";
//require("unitTest").run(pathToTest).getReport();
//require("md5").MD5("default:Wakanda:password")
//directory.filterUsers("*Filter")
//directory.setLoginListener("xxx")
//directory.getLoginListener() + ""
directory.user("default")

var expected = [{
    ID: "1092D76D04DED84BBF761BD2312BE140",
    name: "userFilter1",
    fullName: ""
},

{
    ID: "D77BB7A86C990A4AB0B3A7730801485C",
    name: "userFilter2",
    fullName: ""
},

{
    ID: "24B20582DF76D74E9BAC2E3406165280",
    name: "userFilter3",
    fullName: ""
}];



Array.prototype.sortBy = function(property) {
    return this.sort(function(a, b) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    })
}

expected.sortBy("name")
//People.sort(dynamicSort("Surname"));