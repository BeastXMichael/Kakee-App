// src/ai/flows/personalized-home-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized content recommendations for the Home tab based on user viewing and listening history.
 *
 * - getPersonalizedHomeRecommendations - A function that retrieves personalized content recommendations.
 * - PersonalizedHomeRecommendationsInput - The input type for the getPersonalizedHomeRecommendations function.
 * - PersonalizedHomeRecommendationsOutput - The return type for the getPersonalizedHomeRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHomeRecommendationsInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('List of content IDs representing the user viewing history.'),
  listeningHistory: z
    .array(z.string())
    .describe('List of content IDs representing the user listening history.'),
  userRank: z.string().describe('The user rank.'),
});
export type PersonalizedHomeRecommendationsInput = z.infer<
  typeof PersonalizedHomeRecommendationsInputSchema
>;

const PersonalizedHomeRecommendationsOutputSchema = z.object({
  recommendedContent: z.array(z.string()).describe('List of recommended content IDs.'),
});
export type PersonalizedHomeRecommendationsOutput = z.infer<
  typeof PersonalizedHomeRecommendationsOutputSchema
>;

export async function getPersonalizedHomeRecommendations(
  input: PersonalizedHomeRecommendationsInput
): Promise<PersonalizedHomeRecommendationsOutput> {
  return personalizedHomeRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHomeRecommendationsPrompt',
  input: {schema: PersonalizedHomeRecommendationsInputSchema},
  output: {schema: PersonalizedHomeRecommendationsOutputSchema},
  prompt: `You are an AI expert in content recommendation, specializing in media content for the Kakee app.

Based on the user's viewing and listening history, and their user rank, you will provide a list of recommended content IDs.

User Rank: {{{userRank}}}
Viewing History: {{#if viewingHistory}}{{#each viewingHistory}}{{{this}}}, {{/each}}{{else}}None{{/if}}
Listening History: {{#if listeningHistory}}{{#each listeningHistory}}{{{this}}}, {{/each}}{{else}}None{{/if}}

Consider both viewing and listening history to provide a diverse set of recommendations that the user is likely to enjoy.

Output a list of content IDs in the recommendedContent field.
`,
});

const personalizedHomeRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedHomeRecommendationsFlow',
    inputSchema: PersonalizedHomeRecommendationsInputSchema,
    outputSchema: PersonalizedHomeRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
