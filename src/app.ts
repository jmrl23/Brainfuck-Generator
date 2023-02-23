import express, { json } from 'express'
import { run } from './brainfuck'

const app = express()

interface Payload {
  input: string
  minified?: boolean
  divident?: number
  divisor?: number
}

app
  .use(function (request, response, done) {
    if (request.method !== 'POST')
      return response.status(400).end('invalid method')
    done()
  }, json())

  .post('/', function (request, response) {
    if (!request.body?.input) {
      return response.status(400).end('no input')
    }
    response.end(run(request.body as Payload))
  })

export { app }
