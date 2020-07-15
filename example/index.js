import csvToJSON from '../src/csv';
import service from '../src/service';

const fileURL = `${URL}F.csv?id=10`;

const get = (url, options = { method: 'GET' }) => (
  new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => response.text())
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
);

const initApp = () => {
  get(fileURL).then((str) => {
    try {
      const dependency = service();
      csvToJSON(str, dependency);
      // console.log('json', json);
    } catch (e) {
      // console.log('error is: ', e);
    }
  });
};

initApp();
