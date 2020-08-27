const sendNotification = function(data) {
    let headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic ZTRmMDExNTYtYjllNy00ZmY2LWI3MWQtOGYyZjhiNGY1NmYw"
    };
    data['app_id'] = '7bc07c2d-c67d-4076-ab7f-00f33d640069';

    let options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    console.log(data);

    let https = require('https');
    let req = https.request(options, function(res) {
        res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};



module.exports = {
    sendNotification
};
