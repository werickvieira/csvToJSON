const get = (url = `${URL}A.csv?id=10`, options = { method: 'GET' }) => (
  new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => response.text())
      .then(data => resolve(data))
      .catch(err => reject(err));
  })
);

export default get;
