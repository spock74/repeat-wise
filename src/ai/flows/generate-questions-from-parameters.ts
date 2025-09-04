// src/ai/flows/generate-questions-from-parameters.ts
'use server';
/**
 * @fileOverview Generates questions based on user-defined parameters.
 *
 * - generateQuestionsFromParameters - A function that generates questions based on provided parameters.
 * - GenerateQuestionsFromParametersInput - The input type for the generateQuestionsFromParameters function.
 * - GenerateQuestionsFromParametersOutput - The return type for the generateQuestionsFromParameters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestionsFromParametersInputSchema = z.object({
  topic: z.string().describe('The topic of the questions.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the questions.'),
  numberOfQuestions: z.number().int().positive().describe('The number of questions to generate.'),
  questionType: z.enum(['multiple-choice', 'open-response', 'quiz']).describe('The type of questions to generate.'),
});
export type GenerateQuestionsFromParametersInput = z.infer<
  typeof GenerateQuestionsFromParametersInputSchema
>;

const GenerateQuestionsFromParametersOutputSchema = z.object({
  questions: z.array(z.string()).describe('An array of generated questions.'),
});
export type GenerateQuestionsFromParametersOutput = z.infer<
  typeof GenerateQuestionsFromParametersOutputSchema
>;

export async function generateQuestionsFromParameters(
  input: GenerateQuestionsFromParametersInput
): Promise<GenerateQuestionsFromParametersOutput> {
  return generateQuestionsFromParametersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionsFromParametersPrompt',
  input: {schema: GenerateQuestionsFromParametersInputSchema},
  output: {schema: GenerateQuestionsFromParametersOutputSchema},
  prompt: `You are a quiz generator. Please generate {{numberOfQuestions}} {{questionType}} questions about {{topic}} with {{difficulty}} difficulty. Return the questions as a JSON array of strings.`,
});

const generateQuestionsFromParametersFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFromParametersFlow',
    inputSchema: GenerateQuestionsFromParametersInputSchema,
    outputSchema: GenerateQuestionsFromParametersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
