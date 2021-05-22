const parsePathParameterFromProxyEvent = (event, routingConfigs) => {
  const { path, httpMethod } = event

  for (const pattern in routingConfigs) {
    const routingData = routingConfigs[pattern]

    if (!routingData[httpMethod]) {
      continue
    }

    const normalizePattern =
      '^' + pattern.replace(new RegExp('{([^/]*)}', 'g'), '([^/]*)') + '$'
    const valueMatch = path.match(new RegExp(normalizePattern))
    const keyMatch = pattern.match(new RegExp(normalizePattern))
    if (valueMatch && keyMatch && valueMatch.length === keyMatch.length) {
      const pathParameters = {}
      for (let i = 1; i < keyMatch.length; i++) {
        const key = keyMatch[i].replace(/{/g, '').replace(/}/g, '')
        pathParameters[key] = valueMatch[i]
      }
      return {
        pattern,
        pathParameters,
        httpMethod
      }
    }
  }
}
//const event = {
//  "resource": "/{proxy+}",
//  "path": "/test/aaa",
//  "httpMethod": "GET",
//  "headers": {
//    "accept": "*/*",
//    "Host": "xxxx.execute-api.ap-southeast-1.amazonaws.com",
//    "test": "test_header",
//    "User-Agent": "curl/7.64.1",
//    "X-Amzn-Trace-Id": "Root=1-xxxxx",
//    "X-Forwarded-For": "xxx.xxx.xxx.xxx",
//    "X-Forwarded-Port": "443",
//    "X-Forwarded-Proto": "https"
//  },
//  "multiValueHeaders": {
//    "accept": [
//      "*/*"
//    ],
//    "Host": [
//      "xxxxxxx.execute-api.ap-southeast-1.amazonaws.com"
//    ],
//    "test": [
//      "test_header"
//    ],
//    "User-Agent": [
//      "curl/7.64.1"
//    ],
//    "X-Amzn-Trace-Id": [
//      "Root=1-xxxxxx-xxxxxxxxxxxxxxxxxxxxxx"
//    ],
//    "X-Forwarded-For": [
//      "xxx.xxx.xxx.xxx"
//    ],
//    "X-Forwarded-Port": [
//      "443"
//    ],
//    "X-Forwarded-Proto": [
//      "https"
//    ]
//  },
//  "queryStringParameters": null,
//  "multiValueQueryStringParameters": null,
//  "pathParameters": {
//    "proxy": "test"
//  },
//  "stageVariables": null,
//  "requestContext": {
//    "resourceId": "wzv9oy",
//    "resourcePath": "/{proxy+}",
//    "httpMethod": "GET",
//    "extendedRequestId": "ftnPSECtSQ0FubQ=",
//    "requestTime": "22/May/2021:04:16:20 +0000",
//    "path": "/test/test",
//    "accountId": "xxxxxxxxxxxx",
//    "protocol": "HTTP/1.1",
//    "stage": "test",
//    "domainPrefix": "xxxxxxx",
//    "requestTimeEpoch": 1621656980985,
//    "requestId": "fb0497e9-390e-4dae-8178-ba8e6eab2dee",
//    "identity": {
//      "cognitoIdentityPoolId": null,
//      "accountId": null,
//      "cognitoIdentityId": null,
//      "caller": null,
//      "sourceIp": "xxx.xxx.xxx.xxx",
//      "principalOrgId": null,
//      "accessKey": null,
//      "cognitoAuthenticationType": null,
//      "cognitoAuthenticationProvider": null,
//      "userArn": null,
//      "userAgent": "curl/7.64.1",
//      "user": null
//    },
//    "domainName": "xxxxxxx.execute-api.ap-southeast-1.amazonaws.com",
//    "apiId": "xxxxxxx"
//  ,
//  "body": null,
//  "isBase64Encoded": false
//  }
//}
//const routingConfigs = {
//'/test/{bbbb}': {
//  "GET": 'vvvv'
//},
//}
//console.log(parsePathParameterFromProxyEvent(event, routingConfigs))
module.exports = {
  parsePathParameterFromProxyEvent
}
