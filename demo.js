import express from "express";
import path from "path";

const PORT = process.env.PORT ?? 3000;

const app = express();

const __dirname = path.resolve();

app.use('/static',express.static(path.join(__dirname+'/static')));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/doc', function(request, response){
    response.send('To be continue...');
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`)
});
