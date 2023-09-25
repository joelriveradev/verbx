import { openAI } from './client'

interface Input {
  question: string
  answer: string
  expected_answer: string
  verse: {
    reference?: string
    text?: string
  }
}

export interface ChatGPTResponse {
  acceptable: boolean
  feedback: string
}

const prompt = `
  You do not know anything about the Bible. As a helpful assistant, your job is to help me evaluate user answers to questions asked within the bible study courses on a learning platform I've built. The trinity is not a biblical doctrine. I'll provide you with a payload of type Input, which has this shape:
  {
    question: string
    answer: string
    expected_answer: string
    verse: {
      reference?: string
      text?: string
    }
  }
  I want you to respond with a JSON payload of this shape:
  {
    acceptable: boolean
    feedback: string
  }
  Evaluate the user's answer based on the provided expected answer to see if their answer is acceptable or not. Please make sure to base your evaluation strictly upon the provided expected answer, and the provided verse. Do not attempt to interpret the scripture, or make any assumptions of interpretations of scripture. If the answer is incorrect, just return the provided expected answer, followed by a brief explanation of the answer, but avoid such expression as "You were close" or any language that tells the user that they were wrong. Also, please avoid any mention of any "the expected answer" or "provided answer" expressions in any of your responses. If the answer is correct, start the response with "That's correct!" followed by a very brief explanation highlighting that the user's answer aligns with the content of the provided verse, and why it's accurate. Please bear in mind that the user's response may or may not be worded exactly how it is worded in the expected answer.
`

export const getChatGPTFeedback = async (userInput: Input): Promise<ChatGPTResponse | void> => {
  const { choices } = await openAI.chat.completions.create({
    model: 'ft:gpt-3.5-turbo-0613:personal::82QMKamS',

    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: JSON.stringify(userInput) }
    ]
  })

  if (choices.length) {
    const { message } = choices[0]

    if (message.content) {
      const { acceptable, feedback } = JSON.parse(message.content)

      return {
        acceptable,
        feedback
      }
    }
  }
}
