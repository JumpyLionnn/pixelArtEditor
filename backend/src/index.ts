import express from 'express';

const app = express();

app.use("/src", express.static("frontend/out"));
app.use("/style", express.static("frontend/style"));
app.use("/assets", express.static("frontend/assets"));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/frontend/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});