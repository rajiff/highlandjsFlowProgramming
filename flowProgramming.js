const highland = require('highland');

let logger = console;

highland([{
    data: '1'
  }])
  .map(function(data) {
    logger.log('[*] First Map method: ', data);
    return data;
  })
  .map(function(data) {
    logger.log('[-] Calling asynchronous method, which returns promise');
    let promise = somePromiseMethod();
    return promise;
  })
  .flatMap(promise => highland(
    promise
    .then(function(data) {
      return data;
    }, function(err) {
      return err;
    })
  ))
  .map(function(data) {
    logger.log('[*] Second map method: ', data);
    return data;
  }).map(function(data) {
    logger.log('[*] Third map method: ', data);
    return data;
  })
  .each(function(data) {
    logger.log('Final consumer: ', JSON.stringify(data));
  });

function somePromiseMethod(dataParam) {
  let promise = new Promise(function(resolve, reject) {

    setTimeout(function() {
      resolve({
        message: 'I am coming out of a promiseised method..!'
      });
    }, 5000);

  });

  return promise;
}
