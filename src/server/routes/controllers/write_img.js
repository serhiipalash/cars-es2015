import fs from 'fs';

function writeImg (req, res) {
    var dataUrl = req.body.data,
        file = req.body.file,
        data = dataUrl.replace(/^data:image\/\w+;base64,/, ''),
        buf = new Buffer(data, 'base64');

    fs.writeFile('./static/images/' + file, buf, 'utf8', function(err) {
        if (!err) {
            res.send('images/' + file)
        } else {
            res.send(500, {error: 'Server error!'});
        }
    });
}

export default writeImg;
