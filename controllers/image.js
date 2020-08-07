const Clarifai = require('clarifai');
const { json } = require('body-parser');

const clarifai = new Clarifai.App({apiKey: 'c57564281661483a88b52cc200e8780e'});

const handleApiCall = (req, res) => {
    clarifai.models
    .predict(Clarifai.FACE_DETECT_MODEL, {base64:req.body.b64})
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}