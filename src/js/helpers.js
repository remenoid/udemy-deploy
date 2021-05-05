import { async } from 'regenerator-runtime';

import { TIMEOUT_SEC } from './config';

const timeout = function(second) {
  return new Promise(function(_, reject) {
    setTimeout( function() {
      reject( new Error(`Request too much loonger! Timout ${second} sec passed.`))
    }, second * 1000);
  });
} 

export const getJSON = async function(url) {

  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    //console.log(res);
    if (!res.ok) throw new Error(`code: ${res.status} /${res.statusText}`);
    const data = await res.json();

    return data;

  } catch (err) {
    //에러처리를 한곳(model.js)에서 하도록
    throw err;
    //console.error(err);
  }
}