module.exports = {

    //-- the current environment we are in
    "NODE_ENV": process.env.NODE_ENV || 'development',

    //-- base defults
    "DEFAULT": {
        //-- default port
        "PORT": 5000
    },

    //-- base url redirection
    "BASE_REDIRECT": "https://www.google.com",
    
	//-- https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
	"statusCodes": {
		"unauthorized": 401,
		"unauthorizedText": "Unauthorized"
    },
    
    //-- node environments
    "DEVELOPMENT": "development",
    "PRODUCTION": "production"
}