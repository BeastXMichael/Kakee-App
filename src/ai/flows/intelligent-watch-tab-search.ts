'use server';
/**
 * @fileOverview An intelligent search functionality for the 'Watch' tab.
 *
 * - intelligentWatchTabSearch - A function that handles the content search and suggestion process.
 * - IntelligentWatchTabSearchInput - The input type for the intelligentWatchTabSearch function.
 * - IntelligentWatchTabSearchOutput - The return type for the intelligentWatchTabSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentWatchTabSearchInputSchema = z.object({
  query: z.string().describe('The user search query.'),
  genrePreferences: z.array(z.string()).optional().describe('Optional list of preferred genres.'),
});
export type IntelligentWatchTabSearchInput = z.infer<
  typeof IntelligentWatchTabSearchInputSchema
>;

const IntelligentWatchTabSearchOutputSchema = z.object({
  suggestedContent: z
    .array(z.string())
    .describe('List of suggested content based on the query and preferences.'),
  suggestedGenres: z
    .array(z.string())
    .describe('List of suggested genres based on the query and preferences.'),
});
export type IntelligentWatchTabSearchOutput = z.infer<
  typeof IntelligentWatchTabSearchOutputSchema
>;

export async function intelligentWatchTabSearch(
  input: IntelligentWatchTabSearchInput
): Promise<IntelligentWatchTabSearchOutput> {
  return intelligentWatchTabSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentWatchTabSearchPrompt',
  input: {schema: IntelligentWatchTabSearchInputSchema},
  output: {schema: IntelligentWatchTabSearchOutputSchema},
  prompt: `You are an AI assistant designed to provide intelligent search functionality for a video streaming app\'s \'Watch\' tab.

Given the user\'s query and optional genre preferences, suggest relevant content and genres to enhance content discovery.

User Query: {{{query}}}
Genre Preferences: {{#if genrePreferences}}{{#each genrePreferences}}{{{this}}}, {{/each}}{{else}}None{{/if}}

Response Format:
{
  "suggestedContent": ["Content Title 1", "Content Title 2", ...],
  "suggestedGenres": ["Genre 1", "Genre 2", ...]
}

Suggest content and genres that align with the user\'s query and specified preferences. Return the data as a valid JSON object.
`,
});

const intelligentWatchTabSearchFlow = ai.defineFlow(
  {
    name: 'intelligentWatchTabSearchFlow',
    inputSchema: IntelligentWatchTabSearchInputSchema,
    outputSchema: IntelligentWatchTabSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
