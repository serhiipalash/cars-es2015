import express from 'express';
import createCar from './controllers/create_car';
import readCar from './controllers/read_car';
import readCars from './controllers/car_list';
import writeImg from './controllers/write_img';
import removeImg from './controllers/remove_img';
import readCarId from './controllers/read_car_id';
import deleteCar from './controllers/delete_car';

const router = express.Router();

let routes = ['/', '/list', '/car', '/car/create', '/car/\\d+', '/car/update'];

    let routePattern = routes.reduce(function(pattern, route, index, array) {
        if (index == 0) {
            pattern += '^((' + route + ')|';
        } else if (index == array.length -1) {
            pattern += '(' + route + '))$';
        } else {
            pattern += '(' + route + ')|';
        }
        return pattern;
    }, ''),
    pages = new RegExp(routePattern);

router.get(pages, function(req, res, next) {
    res.render('layout', { DEBUG: process.env.NODE_ENV !== 'production' });
});
router.get('/ajax/home/', function(req, res, next) {
    res.render('home-page');
});
router.get('/ajax/list/', function(req, res, next) {
    res.render('car-list');
});
router.get('/ajax/get_car_list', readCars);
router.get('/ajax/car/', function(req, res, next) {
    res.render('read-car');
});
router.get('/ajax/get_car', readCar);
router.get('/ajax/create/', function(req, res, next) {
    res.render('create-car');
});
router.post('/ajax/post_remove_img', removeImg);
router.post('/ajax/post_img', writeImg);
router.post('/ajax/post_new_car', createCar);
router.post('/ajax/post_delete_car', deleteCar);
router.get('/ajax/update/', function(req, res, next) {
    res.render('update-car');
});
router.get('/ajax/car/:id/', readCarId);

export default router;
