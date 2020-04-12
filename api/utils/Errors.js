// https://cloud.google.com/storage/docs/json_api/v1/status-codes#302_Found

exports.Error = {
    found: {
        code: 302,
        title: "Found",
        message: "Resource temporarily located elsewhere according to the Location header.",
        description: "Resource temporarily located elsewhere according to the Location header.",
        details: "https://tools.ietf.org/html/rfc7231#section-6.4.3"
    },
    mediaDownloadRedirect: {
        code: 303,
        title: "See Other",
        message: "Auth failure",
        description: "When requesting a download using alt=media URL parameter, the direct URL path "
            + "to use is prefixed by /download. If this is omitted, the service will issue this "
            + "redirect with the appropriate media download path in the Location header.",
        details: "https://tools.ietf.org/html/rfc7235#section-3.1"
    },
    notModified: {
        code: 304,
        title: "Unauthorized",
        message: "Auth failure",
        description: "This error indicates a problem with the authorization provided in the request to Cloud Storage. The following are some situations where that will occur:\n"
            + "The OAuth access token has expired and needs to be refreshed. This can be avoided by refreshing the access token early, but code can also catch this error, refresh the token and retry automatically.\n"
            + "Multiple non-matching authorizations were provided; choose one mode only.\n"
            + "The OAuth access token's bound project does not match the project associated with the provided developer key.\n"
            + "The Authorization header was of an unrecognized format or uses an unsupported credential type.\n",
        details: "https://tools.ietf.org/html/rfc7235#section-3.1"
    },
    temporaryRedirect: {
        code: 307,
        title: "Unauthorized",
        message: "Auth failure",
        description: "This error indicates a problem with the authorization provided in the request to Cloud Storage. The following are some situations where that will occur:\n"
            + "The OAuth access token has expired and needs to be refreshed. This can be avoided by refreshing the access token early, but code can also catch this error, refresh the token and retry automatically.\n"
            + "Multiple non-matching authorizations were provided; choose one mode only.\n"
            + "The OAuth access token's bound project does not match the project associated with the provided developer key.\n"
            + "The Authorization header was of an unrecognized format or uses an unsupported credential type.\n",
        details: "https://tools.ietf.org/html/rfc7235#section-3.1"
    },
    resumeIncomplete: {
        code: 308,
        title: "Unauthorized",
        message: "Auth failure",
        description: "This error indicates a problem with the authorization provided in the request to Cloud Storage. The following are some situations where that will occur:\n"
            + "The OAuth access token has expired and needs to be refreshed. This can be avoided by refreshing the access token early, but code can also catch this error, refresh the token and retry automatically.\n"
            + "Multiple non-matching authorizations were provided; choose one mode only.\n"
            + "The OAuth access token's bound project does not match the project associated with the provided developer key.\n"
            + "The Authorization header was of an unrecognized format or uses an unsupported credential type.\n",
        details: "https://tools.ietf.org/html/rfc7235#section-3.1"
    },
    badRequest: {
        code: 400,
        title: "Unauthorized",
        message: "Auth failure",
        description: "This error indicates a problem with the authorization provided in the request to Cloud Storage. The following are some situations where that will occur:\n"
            + "The OAuth access token has expired and needs to be refreshed. This can be avoided by refreshing the access token early, but code can also catch this error, refresh the token and retry automatically.\n"
            + "Multiple non-matching authorizations were provided; choose one mode only.\n"
            + "The OAuth access token's bound project does not match the project associated with the provided developer key.\n"
            + "The Authorization header was of an unrecognized format or uses an unsupported credential type.\n",
        details: "https://tools.ietf.org/html/rfc7235#section-3.1"
    },
    authError: {
        code: 401,
        title: "Unauthorized",
        message: "Auth failure",
        description: "This error indicates a problem with the authorization provided in the request to Cloud Storage. The following are some situations where that will occur:\n"
            + "The OAuth access token has expired and needs to be refreshed. This can be avoided by refreshing the access token early, but code can also catch this error, refresh the token and retry automatically.\n"
            + "Multiple non-matching authorizations were provided; choose one mode only.\n"
            + "The OAuth access token's bound project does not match the project associated with the provided developer key.\n"
            + "The Authorization header was of an unrecognized format or uses an unsupported credential type.\n",
        details: "https://tools.ietf.org/html/rfc7235#section-3.1"
    },
    forbidden: {
        code: 403,
        title: "Forbidden",
        message: "Forbidden",
        description: "According to access control policy, the current user does not have access to perform the requested action. This code applies even if the resource being acted on doesn't exist."
    }


}