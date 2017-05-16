export function getAjax(resource) {
  return new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          var response;
          if (this.responseText) {
            try {
              response = JSON.parse(this.responseText);
            } catch(e) {
              try {
                response = new DOMParser().parseFromString(this.responseText, "text/html");
              } catch(e) {
                reject('Parse error: ' + e);
              }
            }
          }
          resolve(response);
        } else {
          reject('HTTP Error: ' + this.statusText);
        }
      }
    };
    xhttp.open('GET', resource, true);
    xhttp.send();
  });
}
