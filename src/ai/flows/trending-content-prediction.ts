'use server';

/**
 * @fileOverview This file defines a Genkit flow for predicting trending content in the 'Listen' and 'Watch' tabs.
 * 
 * - predictTrendingContent - Predicts trending content for a given category.
 * - TrendingContentInput - The input type for the predictTrendingContent function.
 * - TrendingContentOutput - The output type for the predictTrendingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrendingContentInputSchema = z.object({
  category: z
    .enum(['Listen', 'Watch'])
    .describe(
      'The category to predict trending content for (Listen or Watch).'
    ),
});
export type TrendingContentInput = z.infer<typeof TrendingContentInputSchema>;

const TrendingContentOutputSchema = z.object({
  trendingContent: z
    .array(
      z.string().describe('A predicted trending content item (e.g., song title, video title).')
    )
    .describe('A list of predicted trending content items.'),
});
export type TrendingContentOutput = z.infer<typeof TrendingContentOutputSchema>;

export async function predictTrendingContent(
  input: TrendingContentInput
): Promise<TrendingContentOutput> {
  return trendingContentFlow(input);
}

const trendingContentPrompt = ai.definePrompt({
  name: 'trendingContentPrompt',
  input: {schema: TrendingContentInputSchema},
  output: {schema: TrendingContentOutputSchema},
  prompt: `You are an expert in predicting trending content for a media app called Kakee.

  Based on current trends and user preferences, predict 5 trending content items for the {{category}} tab.

  Format your response as a JSON array of strings.
  For the \"Listen\" category, provide song titles.
  For the \"Watch\" category, provide drama or video titles.

  Example Output:
  {
    \"trendingContent\": [\"Song Title 1\", \"Song Title 2\", \"Song Title 3\", \"Song Title 4\", \"Song Title 5\"]
  }`,
});

const trendingContentFlow = ai.defineFlow(
  {
    name: 'trendingContentFlow',
    inputSchema: TrendingContentInputSchema,
    outputSchema: TrendingContentOutputSchema,
  },
  async input => {
    const {output} = await trendingContentPrompt(input);
    return output!;
  }
);
