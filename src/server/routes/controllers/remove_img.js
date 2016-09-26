import fs from 'fs';

function removeImg (req, res, next) {
    var path = `./static/${req.body.file}`;

    fs.exists(path, exists => {
        if(!exists) {
            res.end();
        } else {
            fs.unlink(path, err => {
                if (!err) {
                    res.send('file deleted successfully')
                } else {
                    res.send(500, {error: 'Server error!'});
                }
            });
        }
    });
}

export default removeImg;
