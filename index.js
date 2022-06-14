
const express=require('express');
const app=express()
const exphbs =require('express-handlebars');

const path = require('path');
const request = require('request')
const bodyParser= require('body-parser');

const PORT=process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


function call_api(finishedAPI, ticker){
	request('https://cloud.iexapis.com/stable/stock/' + ticker +'/quote?token=pk_2711a2706e924888a2a063e6e4cf4307', {json: true}, (err, res,body)=> {
	if(err){ return console.log(err);}
	if(res.statusCode ===200){
		finishedAPI(body);
		}
	});
};

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


//Set index handlebar index  GET routes
app.get('/', function(req, res){
		call_api(function(doneAPI){
            
			res.render('home', {
			stock: doneAPI
		
		});
	});

});

//Set index handlebar index  POST routes
app.post('/', function(req, res){
		call_api(function(doneAPI){
			//posted_stuff =req.body.stock_ticker;
			res.render('home', {
			stock: doneAPI,
			
			
				
		
		});
	}, req.body.stock_ticker);

});



//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () =>console.log('Server Listening on port' + PORT))
