'use server';
/**
 * @fileOverview Generates multiple-choice, open response, and quiz questions from a document.
 *
 * - generateQuestionsFromDocument - A function that handles the question generation process.
 * - GenerateQuestionsFromDocumentInput - The input type for the generateQuestionsFromDocument function.
 * - GenerateQuestionsFromDocumentOutput - The return type for the generateQuestionsFromDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestionsFromDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document (PDF, DOCX, TXT, or Markdown) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  questionType: z
    .enum(['multiple-choice', 'open-response', 'quiz'])
    .describe('The type of questions to generate.'),
  numberOfQuestions: z
    .number()
    .int()
    .min(1)
    .max(10)
    .default(5)
    .describe('The number of questions to generate.'),
});
export type GenerateQuestionsFromDocumentInput = z.infer<
  typeof GenerateQuestionsFromDocumentInputSchema
>;

const GenerateQuestionsFromDocumentOutputSchema = z.object({
  questions: z
    .array(z.string())
    .describe('The generated questions in text format.'),
});
export type GenerateQuestionsFromDocumentOutput = z.infer<
  typeof GenerateQuestionsFromDocumentOutputSchema
>;

export async function generateQuestionsFromDocument(
  input: GenerateQuestionsFromDocumentInput
): Promise<GenerateQuestionsFromDocumentOutput> {
  return generateQuestionsFromDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionsFromDocumentPrompt',
  input: {schema: GenerateQuestionsFromDocumentInputSchema},
  output: {schema: GenerateQuestionsFromDocumentOutputSchema},
  prompt: `You are a question generator that can create questions from a document.

You will generate { {{numberOfQuestions}} } { {{questionType}} } questions from the following document.

Document: {{media url=documentDataUri}}`,
});

const generateQuestionsFromDocumentFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFromDocumentFlow',
    inputSchema: GenerateQuestionsFromDocumentInputSchema,
    outputSchema: GenerateQuestionsFromDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
