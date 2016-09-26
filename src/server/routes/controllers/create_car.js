import fs from 'fs';

function createCar (req, res, next) {
    let dir = './static/files',
        carList = './static/files/cars.json',
        newCar = req.body,
        newCarData = JSON.stringify(newCar, "", 4),
        newCarFilePath = `./static/files/${newCar.id}.json`;

    fs.exists(carList, exists => {
        if(!exists) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            let list = [];

            list.push(newCar);

            let dataList = JSON.stringify(list, "", 4);

            fs.writeFile(carList, dataList, 'utf8', err => {
                if (!err) {
                    console.log('Cars write was successful!');

                    fs.writeFile(newCarFilePath, newCarData, 'utf8', err => {
                        if (!err) {
                            console.log('write was successful!');
                            res.end();
                        } else {
                            console.log(`Error writing: ${newCarFilePath}`);
                        }
                    });
                } else {
                    console.log(`Error writing: ${carList}`);
                }
            });
        } else {
            fs.readFile(carList, 'utf8', (err, data) => {
                if (!err) {
                    let cars = JSON.parse(data),
                        carExists = false,
                        index;

                    cars.forEach(function (item, i, cars) {
                        if (item.id === newCar.id) {
                            console.log('yes');
                            carExists = true;
                            index = i;
                        };
                    });

                    if (!carExists) {
                        cars.push(newCar);
                    } else {
                        cars[index] = newCar;
                    }

                    var dataCars = JSON.stringify(cars, "", 4);

                    fs.writeFile(carList, dataCars, 'utf8', err => {
                        if (!err) {
                            console.log(carList + ' - write was successful!');

                            fs.writeFile(newCarFilePath, newCarData, 'utf8', err => {
                                if (!err) {
                                    console.log(`${newCarFilePath} - write was successful!`);
                                    res.end();
                                } else {
                                    console.log(`Error writing: ${newCarFilePath}`);
                                }
                            });
                        } else {
                            console.log(`Error writing: ${carList}`);
                        }
                    });
                } else {
                    console.log(`Error reading: ${carList}`);
                }
            });
        }
    });
}

export default createCar;
