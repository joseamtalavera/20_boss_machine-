const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId, deleteAllFromDatabase, createMeeting } = require('./db');
const { get } = require('../server');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// GET /api/minions to get an array of all minions

apiRouter.get('/minions', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    res.status(200).json(allMinions);
})


//POST /api/minions to create a new minion and save it to the database

apiRouter.post('/minions', (req, res, next) => {
    console.log('Requested body', req.body);
    const newMinion = addToDatabase('minions', req.body);
    console.log('New minion', newMinion);
    res.status(201).json(newMinion);
})


//GET /api/minions/:minionId to get a single minion by id.

apiRouter.get('/minions/:minionId', (req, res, next) => {
    const minion = getFromDatabaseById('minions', req.params.minionId);
    if(minion) {
        res.status(200).json(minion)
    } else {
        res.status(404).send();
    }
}
)

//PUT /api/minions/:minionId to update a single minion by id.

apiRouter.put('/minions/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    if(updatedMinion) {
        res.status(200).json(updatedMinion);
    } else {
        res.status(404).send();
    }
})

//DELETE /api/minions/:minionId to delete a single minion by id

apiRouter.delete('/minions/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions',req.params.minionId);
    if(deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})









//GET /api/ideas to get an array of all ideas.

apiRouter.get('/ideas', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    res.status(200).json(allIdeas);
});

// POST /api/ideas to create a new idea and save it to the database

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
})

//GET /api/ideas/:ideaId to get a single idea by id

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if(idea) {
        res.status(200).json(idea);
    } else {
        res.status(404).send();
    }

});

//PUT /api/ideas/:ideaId to update a single idea by id.

apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);

    const ideaId = Number(req.params.ideaId);
    if(isNaN(ideaId)) {
        res.status(404).send('Invalid Idea Id');
    }

    if(updatedIdea) {
        res.status(200).json(updatedIdea);
    } else {
        res.status(400).send('Idea not found');
    }

})

//DELETE /api/ideas/:ideaId to delete a single idea by id

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(deleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }

});










//GET /api/meetings to get an array of all meetings.

apiRouter.get('/meetings', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
});

//POST /api/meetings to create a new meeting and save it to the database

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);

    /*let newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
  */
})

//DELETE /api/meetings to delete all meetings from the database

apiRouter.delete('/meetings', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})






module.exports = apiRouter;
