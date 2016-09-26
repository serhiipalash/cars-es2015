import fs from 'fs';

function carList (req, res, next) {
    fs.exists('./static/files/cars.json', exists => {
        if(!exists) {
            res.end();
        } else {
            let fileCars = './static/files/cars.json';

            fs.readFile(fileCars, 'utf8', (err, data) => {
                if (!err) {
                    let cars = JSON.parse(data);
                    res.send(cars);
                    res.end();
                } else {
                    console.log(`Error reading: ${fileCars}`);
                }
            });
        }
    });
}

export default carList;
