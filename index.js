const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const config = require('./config/keys');
const mongoose = require('mongoose');
require('./models/Registration');
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // JS and CSS
    app.use(express.static('client/build'));

    // index.html
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);