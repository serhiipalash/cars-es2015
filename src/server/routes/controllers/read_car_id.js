import fs from 'fs';

function readCar (req, res, next) {
    let file ='./static/files/' + req.params.id + '.json';

    fs.readFile(file, 'utf8', (err, data) => {
        if (!err) {
            let car = JSON.parse(data);
            res.render('car-id', car);
        } else {
            console.log(`Error writing: ${file}`);
        }
    });
}

export default readCar;
