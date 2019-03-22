function retrieveCookies() {
  let cookieStrings = document.cookie.split('; ');
  let cookieArrayOfTuples = cookieStrings.map(cookie => cookie.split('='));
  let cookieObject = {};
  cookieArrayOfTuples.forEach(cookie => {
    let key = cookie[0];
    let value = cookie[1];
    cookieObject[key] = value;
  });
  return cookieObject;
}

export default retrieveCookies;
