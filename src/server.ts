import dotenv from 'dotenv'
import next from 'next'
import nextBuild from 'next/dist/build'
import cron from 'node-cron';
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import cors from 'cors'
import express from 'express'
import payload from 'payload'

import { scheduleFetchProductsFromBusinessCentral } from './payload/bc/services/scheduleFetchItemsFromBCByCategory';
import { seed } from './payload/seed'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload)
    process.exit()
  }

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })

    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })

  const nextHandler = nextApp.getRequestHandler()

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Starting Next.js...')

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)

      cron.schedule('0 6 * * *', scheduleFetchProductsFromBusinessCentral);
    })
  })
}

start()
