import csvToJSON from "../src/csv";

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
    get(fileURL).then((data) =>{
        const json = csvToJSON(data);
        console.log('json', json);
    });
};
  
initApp();
  


