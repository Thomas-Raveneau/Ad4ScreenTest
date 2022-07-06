import express from 'express';
import sequelize from './utils/database.js';

import router from './modules/user/route.js';

const app = express();
const port = process.env.EXPRESS_PORT;

sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.use(express.json());    
app.use("/user", router);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})