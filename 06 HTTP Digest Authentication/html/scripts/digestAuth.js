// Set target of request
const domain = 'https://m183.gibz-informatik.ch';
const path = '/api/httpDigestAuth';
const url = `${domain}${path}`;

/**
 * Gets fired when the login form is submitted.
 * This is the main application logic where the server request with digest authentication happens.
 *
 * @param event
 * @returns {boolean}
 */
function loadData(event) {
    // Prevent submission of form
    event.preventDefault();

    // Make request (expected to fail with status code 401)
    console.log(url)
    fetch(url)
        .then(response => {
            console.log('ja')
            // Since you're not yet authenticated, we expect the request to fail...
            const unauthorized = 401; // TODO: Insert correct http response code here (Unauthorized) */
            if (response.status === unauthorized) {
                return extractWwwAuthenticateHeaderData(response);
            } else {
                // Hmmm, something really unexpected did happen here...!
                alert("Something unexpected happened!\nPlease have a look in the console output for further details!");
                console.log("Did not get expected response with status 401.\nWill print received response now...");
                console.log(response);
            }
        })
        .then(generateDigestAuthenticationData)
        .then(digestParameters => {
            console.log('jopasdf')
            console.log(digestParameters)
            const stringParts = Object.entries(digestParameters).map(([key, value]) => `${key}=${value}`);
            const digest = stringParts.join(', ');
            console.log('request header:')
            console.log(digest)
            return fetch(url, {
                headers: {
                    'Authorization': `Digest ${digest}`,
                }
            })
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw Error("Could not fetch data.");
            }
        })
        .then(processAuthenticationResponse)
        .catch(error => {
            console.error(error.message);
            processAuthenticationResponse('Login failed', false);
        });

    return false;
}

/**
 * Extracts the WWW-Authenticate header from the response object and returns an object containing the received
 * information as key-value-pairs.
 *
 * @param response
 */
function extractWwwAuthenticateHeaderData(response) {
    const wwwAuthenticateHeaderString = response.headers.get('WWW-Authenticate');
    const headerDataFragments = wwwAuthenticateHeaderString.substring(7).split(',');
    const wwwAuthenticateHeaderData = {};
    headerDataFragments.forEach(headerPart => {
        const [key, value] = headerPart.split('=');
        wwwAuthenticateHeaderData[key.trim()] = value.replace(/"/g, '');
    });
    return wwwAuthenticateHeaderData;
}

/**
 * Generates and returns on object containing all relevant data for manual http digest authentication.
 *
 * Hints:
 *  - Have a close look at this doc-block for a detailed description of the expected response
 *  - Spend some time to look up how to quote the values of the response object.
 *    You might find useful information at the end of page 10 of the HTTP Digest Access Authentication (RFC 7616)
 *    on https://tools.ietf.org/html/rfc7616#page-10.
 *  - The MD5 hashing algorithm is already implemented.
 *    You may just call md5('...') with any string you'd like to hash.
 *
 * @param wwwAuthenticationHeaderData
 * @returns {{qop: string, nc: string, response: string, realm: string, nonce: string, uri: string, cnonce: string, username: string, algorithm: string}}
 */
function generateDigestAuthenticationData(wwwAuthenticationHeaderData) {
    // Read credentials from input fields
    const [username, password] = getCredentials();

    console.log(username, password)
    console.log(wwwAuthenticationHeaderData)

    console.log(md5('test'))
    /**
     * TODO: Implement this function!
     * Stick to the structure given by the below comments and don't forget to read the doc-block of this function ;-)
     */

    // Generate values for 'nc' and 'cnonce'. These values might be fictional (but sensible).
    const nc = Date.now()

    var randomChars = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < 16; i++) {
        randomChars += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    console.log('nonce text', randomChars)

    const cnonce = randomChars


    // Generate hashes (usually called ha1, ha2 and response)

    const h1 = md5(`${username}:${wwwAuthenticationHeaderData.realm}:${password}`)
    // MD5(method:digestURI)
    const h2 = md5(`GET:${path}`)

    // MD5(HA1:nonce:HA2)
    const response = md5(`${h1}:${wwwAuthenticationHeaderData.nonce}:${nc}:${cnonce}:${wwwAuthenticationHeaderData.qop}:${h2}`)


    // Return digest header data as a javascript object containing all (nine) relevant directives.
    return {
        nonce: `"${wwwAuthenticationHeaderData.nonce}"`,
        algorithm: `"${wwwAuthenticationHeaderData.algorithm}"`,
        qop: `"${wwwAuthenticationHeaderData.qop}"`,
        realm: `"${wwwAuthenticationHeaderData.realm}"`,
        username: `"${username}"`,
        uri: `"${path}"`,
        cnonce: `"${cnonce}"`,
        nc: `"${nc}"`,
        response: `"${response}"`,
    };
}

/**
 * Returns the credentials the user entered in the login form inputs.
 *
 * @returns {[string, string]}
 */
function getCredentials() {
    const formData = new FormData(document.getElementById('loginForm'));
    return [formData.get('username'), formData.get('password')];
}

/**
 * Show result of authenticated request.
 *
 * @param response
 * @param success
 */
function processAuthenticationResponse(response, success = true) {
    const target = document.getElementById('output');
    const output = document.createElement('img');
    output.className = success ? 'success' : 'failure';
    output.src = success ? response : 'images/error-401.webp';

    while (target.firstChild) {
        target.removeChild(target.firstChild);
    }

    target.appendChild(output);
}