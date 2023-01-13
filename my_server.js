console.log("I am 'my server'");

const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let groceries = [
    {item: "Apple", qty: 3},
    {item: "Grapes", qty: 5},
    {item: "Honeydew Mellon", qty: 7}
]

app.get('/groceries', 
    (req, res, next) => {
        console.log("Running before res.send step... issue if not use next()");
        next();
    }, (req, res, next) => {
        res.send(groceries);
        next();
    }, (req, res, next) => {
        let x = tempRO(groceries);
        console.log("Finishing....");
        console.log(groceries);
        res.send(groceries);
    }
)

function tempRO(groceries){
    groceries.push({"item": "Peas", "qty": 0});
}

app.post('/item', (req, res) => {
    console.log("Hi")
    let items = req.body;
    for(let i = 0; i < items.length; i++){
        groceries.push(items[i]) 
    }
    res.status(201).send(groceries);
})

app.post('/snow', (req, res) => {
    groceries.push({"item": req.body.item, "price": req.body.qty});
    console.log(groceries);
    res.status(201).send(groceries);
})

// Middleware 
// If no url pattern matches, send back 404 status code
app.use((req, res) => {
    url_entered = req.url
    res.status(404).send(`Unable to find resource at url "${url_entered}."`);
})
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} for stuff.`);
});