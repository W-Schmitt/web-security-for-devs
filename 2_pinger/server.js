const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const http = require('http')
const morgan = require('morgan')
const { exec } = require('child_process')

const app = express()
app.use(bodyParser.json())

app.use(helmet())
app.use(morgan('dev'))

app.set('view engine', 'pug')

app.use('/vendor/materialize', express.static(`${__dirname}/node_modules/materialize-css/dist/`))

app.use('/public', express.static(`${__dirname}/public/`))

app.put('/cmd', (req, res) => {
  console.log('IP body', req.body.ip)
  exec(`ping -c 4 ${req.body.ip}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      res.status(500).send({ text: 'There was an error' })
    } else if (stderr) {
      res.status(500).send({ text: stderr })
    } else {
      console.log(stdout)
      res.status(200).send({ text: stdout })
    }
  })
})

app.get('/', (req, res) => res.render('home', {
  title: 'Pinger'
}))


const server = http.createServer(app)

server.listen(3001, () => {
  console.log(`Server listening on port ${3001}`)
})
