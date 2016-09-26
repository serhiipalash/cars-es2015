import fs from 'fs';

function readCar (req, res, next) {
    fs.exists('./static/files/cars.json', exists => {
        if(!exists) {
            res.end();
        } else {
            let carList = './static/files/cars.json';

            fs.readFile(carList, 'utf8', (err, data) => {
                if (!err) {
                    let cars = JSON.parse(data),
                        carsList = [];

                    cars.forEach(function (item, i, cars) {
                        carsList.push({model: item.id, url: `/files/${item.id}.json`})
                    })
                    res.send(carsList);
                    res.end();
                } else {
                    console.log(`Error reading: ${carList}`);
                }
            });
        }
    });
}

export default readCar;
