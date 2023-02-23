import detect from 'detect-port'
import { server } from './server'

async function main() {
  const port = await detect(parseInt(process.env.PORT ?? '3001', 10))
  server.listen(port, () => {
    console.log('server is running.')
  })
}

void main()
