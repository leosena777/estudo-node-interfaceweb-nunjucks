const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const logMiddleware = (req, res, next) => {
  console.log(
    `Host: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  )

  req.appName = 'Node com nunjucks'

  return next()
}

// middleware de todas as rotas
app.use(logMiddleware)
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const users = ['leandro', 'diego', 'juda', 'fabete']

// ex: http://localhost:3000/nunjucks/list
app.get('/', (req, res) => {
  return res.render('list', { users: users })
})

// ex: http://localhost:3000/nunjucks/leandro
app.get('/new', (req, res) => {
  return res.render('new', { name: req.params.name })
})

app.post('/create', (req, res) => {
  users.push(req.body.user)
  return res.redirect('/')
})

app.listen(3000)
