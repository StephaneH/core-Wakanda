﻿		var test = async_test("W3C WebSocket API - Create Secure WebSocket - Close the Connection - close(only reason) - INVALID_ACCESS_ERR is thrown");

        var wsocket = CreateWebSocket(true, false, false);

        wsocket.addEventListener('open', test.step_func(function (evt) {
            assert_throws("INVALID_ACCESS_ERR", function () { wsocket.close("Close with only reason") });
            clearTimeout(timeOut);
            test.done();
        }), true);