import fs from 'fs';
import _ from 'lodash';

function deleteCar (req, res) {
    var carId = req.body.id;

    fs.readFile('./static/files/cars.json', 'utf8', (err, data) => {
        if (!err) {
            var carList = JSON.parse(data),
                car = _.find(carList, { id: carId });

            if (car) {
                fs.unlink('./static/files/' + carId + '.json', err => {
                    if (!err) {
                        console.log('Car was deleted successfully');
                    } else {
                        res.send(500, {error: 'Server error'});
                    }
                });

                _.each(car.images, image => {
                    fs.unlink('./static/' + image, err => {
                        if (!err) {
                            console.log('Image deleted successfully');
                        } else {
                            res.send(500, {error: 'Server error'});
                        }
                    });
                });

                var newCarList = _.reject(carList, { id: carId });

                fs.writeFile('./static/files/cars.json', JSON.stringify(newCarList, "", 4), 'utf8', err => {
                    if (!err) {
                        console.log('Car List was successfully written!');
                        res.end();
                    } else {
                        console.log('Error writing Car List');
                    }
                });
            }
        } else {
            console.log('Error reading Car List');
        }
    });
}

export default deleteCar;
