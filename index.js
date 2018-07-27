const express = require('express');
const helmet = require('helmet');

const projectModel = require('./data/helpers/projectModel.js');
const actionModel = require('./data/helpers/actionModel.js');

const server = express();

server.use(helmet());
server.use(express.json());

// <--- Projects --->

// PROJECT.GET
server.get('/projects', (req, res) => {
    projectModel.get().then(response => {
        res.status(200).json({response: response});
    })
    .catch(err => res.status(500).json({ message: 'Error', err: err}));
})


// PROJECT.GETID
server.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    projectModel.get(id).then(response => {
        res.status(200).json({response: response});
    })
    .catch(err => res.status(500).json({ message: 'Error', err: err}));
})

// PROJECT.GETPROJECTACTIONS
server.get('/projects/:id/projectaction', (req, res) => {
    const { id } = req.params;
    projectModel.getProjectActions(id).then(response => {
        res.status(200).json({response: response});
    })
    .catch(err => res.status(500).json({ message: 'Error', err: err}));
})

// PROJECT.POST
server.post('/projects', (req, res) => {
    const { id, name, description, completed} = req.body;

    if ( !name ) {
        res.status(400).json(`Error: Please provide a name.`);
    };

    if ( name.length > 128 ) {
        res.status(400).json(`Error: Must be 128 characters or shorter.`);
    };

    if ( !description ) {
        res.status(400).json(`Error: Please provide a description.`);
    }

    if ( id === id ) {
        res.status(400).json(`Id already exist, please use another.`);
    }

    projectModel.insert({ id, name, description, completed }).then(response => {
        res.status(200).json({response: response});
    })
    .catch(err => res.status(500).json({ message: 'Error', err: err}));
})

// PROJECT.PUT
server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;

    if ( !id ) {
        res.status(400).json(`Error: Id do not exist, please choose another.`)
    }

    if ( !name ) {
        res.status(400).json(`Error: Please provide a name.`)
    };

    if ( name.length > 128 ) {
        res.status(400).json(`Error: Must be 128 characters or shorter.`);
    };

    if ( !description ) {
        res.status(400).json(`Error: Please provide a description.`)
    }

    projectModel.update({ id, name, description, completed}).then(response => {
        res.status(200).json({response: response});
    })
    .catch(err => res.status(500).json({ message: 'Error', err: err}));
})

// PROJECT.DELETE
server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    projectModel.remove(id).then(response => {
        res.status(204).json({response: response});
    })
    .catch(err => res.send(err));
})

// <--- Actions --->

// ACTION.GET
server.get('/actions', (req, res) => {
    actionModel.get().then(response => {
        res.status(200).json({response: response});
    })
    .catch(err => res.status(500).json({ message: 'Error', err: err}));
})

// ACTION.GETID
server.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    actionModel.get(id).then(response => {
        res.status(200).json({response: response});
    })
    .catch(err => res.status(500).json({ message: 'Error', err: err}));
})

// ACTION.POST
server.post('/actions', (req, res) => {
    const { id } = req.params;
    const { project_id, name, description, completed} = req.body;

    if ( !project_id ) {
        res.status(400).json(`Error: Please provide a Project ID.`);
    };

    if ( description.length > 128 ) {
        res.status(400).json(`Error: Must be 128 characters or shorter.`);
    };

    if ( !description ) {
        res.status(400).json(`Error: Please provide a description.`);
    }

    if ( !notes ) {
        res.status(400).json(`Error: Input needed for notes.`);
    }

    actionModel.insert({ id, project_id, name, description, completed }).then(response => {
        res.status(200).json({response: response});
    })
    .catch(err => res.status(500).json({ message: 'Error', err: err}));
})

// ACTION.PUT
server.put('/actions/:id', (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;

    if ( !project_id ) {
        res.status(400).json(`Error: Id do not exist, please choose another.`);
    }

    if ( description.length > 128 ) {
        res.status(400).json(`Error: Must be 128 characters or shorter.`);
    };

    if ( !description ) {
        res.status(400).json(`Error: Please provide a description.`);
    }

    if ( !notes ) {
        res.status(400).json(`Error: Inputs required.`);
    };

    actionModel.update({ id, project_id, description, notes, completed}).then(response => {
        res.status(200).json({response: response});
    })
    .catch(err => res.status(500).json({ message: 'Error', err: err}));
})

// ACTION.DELETE
server.delete('/actions/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    actionModel.remove(id).then(response => {
        res.status(204).json({response: response});
    })
    .catch(err => res.send(err));
})

server.listen(8000, () => console.log(`\n=== API running... ===\n`));