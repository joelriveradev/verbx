import { OpenAI } from 'openai'
import type { FineTuningJobEvent } from 'openai/resources/fine-tuning'

import * as fs from 'node:fs'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config()

export const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function fineTune() {
  console.log('Uploading file...')

  let file = await openAI.files.create({
    file: fs.createReadStream(path.join(__dirname, 'formatted.jsonl')),
    purpose: 'fine-tune'
  })

  console.log(`Successfully uploaded file with ID: ${file.id}`)
  // console.log('-----')
  // console.log('Waiting for the file to be processed.')

  // while (true) {
  //   file = await openAI.files.retrieve(file.id)
  //   console.log(`File status: ${file.status}`)

  //   if (file.status === 'processed') {
  //     break
  //   }
  //   await new Promise((resolve) => setTimeout(resolve, 1000))

  //   console.log('-----')

  console.log(`Starting fine-tuning`)
  let fineTune = await openAI.fineTuning.jobs.create({
    model: 'gpt-3.5-turbo',
    training_file: file.id
  })
  //   console.log(`Fine-tuning ID: ${fineTune.id}`)
  //   console.log('-----')
  //   console.log(`Track fine-tuning progress:`)

  //   const events: Record<string, FineTuningJobEvent> = {}

  //   while (fineTune.status == 'running' || fineTune.status == 'created') {
  //     fineTune = await openAI.fineTuning.jobs.retrieve(fineTune.id)
  //     console.log(`${fineTune.status}`)

  //     const { data } = await openAI.fineTuning.jobs.listEvents(fineTune.id, {
  //       limit: 100
  //     })
  //     for (const event of data.reverse()) {
  //       if (event.id in events) continue
  //       events[event.id] = event

  //       const timestamp = new Date(event.created_at * 1000)
  //       console.log(`- ${timestamp.toLocaleTimeString()}: ${event.message}`)
  //     }

  //     await new Promise((resolve) => setTimeout(resolve, 5000))
  //   }
  // }
}

fineTune().catch((error) => {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`)
  }
  return {}
})
