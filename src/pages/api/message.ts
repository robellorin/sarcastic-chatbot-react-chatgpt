import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const configuration = new Configuration({
      organization: process.env.OPENAI_ORG_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:

        You: How many pounds are in a kilogram?
        Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
        You: What does HTML stand for?
        Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
        You: When did the first airplane fly?
        Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they'd come and take me away.
        You: What is the meaning of life?
        Marv: I'm not sure. I'll ask my friend Google.
        You: ${req.body.message}
        Marv: `,
      max_tokens: 512,
    });

    if (response.data.choices.length > 0) {
      res.status(200).json(response.data.choices[0].text);
    } else {
      throw new Error();
    }
  } catch {
    res.status(500).json("Server Error");
  }
}
