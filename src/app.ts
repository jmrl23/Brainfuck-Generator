import express, { json } from 'express'
import { run, type Payload } from './brainfuck'
import { Cache } from 'memory-cache'

const app = express()
const cache = new Cache<string, string>()

app
  .use(function (request, response, done) {
    if (request.method !== 'POST') {
      return response.status(400).end('invalid method')
    }

    done()
  }, json())

  .post('/', async function (request, response) {
    if (!request.body?.input) {
      return response.status(400).end('no input')
    }

    const cached = cache.get(JSON.stringify(request.body))

    if (cached) {
      return response.end(cached)
    }

    try {
      const data = run(request.body as Payload)
      cache.put(JSON.stringify(request.body), data)
      response.end(data)
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).end('an error occurs')
      }
    }
  })

export { app }
