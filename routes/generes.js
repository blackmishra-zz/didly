const express = require('express');
const router = express.Router();

const generes = [
    { id: 1, name: "Horror" },
    { id: 2, name: "Action" },
    { id: 3, name: "Comedy" }

];

router.get('/', (req, res) => {
    res.send(generes);
});

router.get('/:id', (req, res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if (!genere) {
        res.status(404).send('Unable to locate Genere with provided ID');
        return;
    }
    res.send(genere);
});

router.post('/', (req, res) => {

    const { error } = validGenere(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const genere = {
        id: generes.length + 1,
        name: req.body.name
    }
    generes.push(genere);
    res.send(genere);
});

router.put('/:id', (req, res) => {

    const { error } = validGenere(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if (!genere) {
        res.status(400).send('Could not find Genere with ID');
        return;
    }
    genere.name = req.body.name;
    res.send(genere);

});

router.delete('/:id', (req, res) => {
    const genere = generes.find(g => g.id === parseInt(req.params.id));
    if (!genere) {
        res.status(400).send('Unable to locate Genere with given ID');
        return;
    }
    const index = generes.indexOf(genere);
    generes.splice(index, 1);
    res.send(genere);

});

function validGenere(genere) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });
    return schema.validate(genere);
}


module.exports = router;