import { OpenAI } from 'openai'
import { OPENAI_API_KEY } from '$env/static/private'

export const openAI = new OpenAI({ apiKey: OPENAI_API_KEY })
