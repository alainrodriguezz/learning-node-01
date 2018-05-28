const fs = require('fs')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3002

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('getYear',()=>{
	return new Date().getFullYear()
})
hbs.registerHelper('scream',(text)=>{
	return text.toUpperCase()
})

app.set('view engine','hbs')

app.use((req,res,next)=>{
	let now = new Date().toString()
	let log = `${now} : ${req.method} ${req.url}` 
	fs.appendFile('server.log',log + '\n')
	next()
})

/*
app.use((req,res,next)=>{
	res.render('maintenance.hbs')
})*/

app.use(express.static(`${__dirname}/public`))


app.get('/',(req,res)=>{
	res.render('home.hbs',{
		title:'Welcome Home'
	})
})

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		title:'About Title'
	})	
})

app.listen(port,()=>{
	console.log(`Server Running on ${port}`)
})