
const express=require('express');
const app=express()
const exphbs =require('express-handlebars');

const path = require('path');

const PORT=process.env.PORT || 5000;



const otherstuff = "hello there, this is otherstuff"





app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.get('/', function(req, res){
	res.render('home', {
		stuff: otherstuff
});

});
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () =>console.log('Server Listening on port' + PORT))
