import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { text, context } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        console.log('API Key present:', !!apiKey);
        console.log('API Key first 10 chars:', apiKey?.substring(0, 10));
        console.log('Context:', context);

        if (!apiKey) {
            console.error('OpenRouter API key is missing');
            return NextResponse.json(
                { error: 'Server misconfiguration: Missing API Key' },
                { status: 500 }
            );
        }

        // Context-specific prompts
        const prompts: Record<string, string> = {
            personal: 'Rewrite this personal summary to be clear and professional. AVOID generic buzzwords like "results-driven", "team player", "passionate", "innovative", "dynamic", "dedicated". Focus on specific skills, technologies, and real achievements. Keep it 2-3 sentences. Return ONLY the rewritten text without quotes or introductions.',

            experience: 'Rewrite this work experience description. AVOID buzzwords like "responsible for", "worked on", "helped with", "managed". Use specific action verbs with measurable results. Focus on what was accomplished, not just duties. Keep it 2-3 sentences. Return ONLY the rewritten text without quotes or introductions.',

            project: 'Rewrite this project description. AVOID vague terms. Focus on specific technologies, frameworks, and features implemented. Include tangible outcomes like user counts, performance metrics, or functionality. Keep it 2-3 sentences. Return ONLY the rewritten text without quotes or introductions.',
        };

        // Fallback to generic prompt if context not recognized
        const systemPrompt = prompts[context as string] || 'You are a resume text editor. Rewrite the user\'s text to be professional and impactful. DO NOT include any introduction like "Here is the improved text:" or any quotes around your response. Return ONLY the rewritten text itself, nothing else. Keep it concise (2-3 sentences max). Use plain text without markdown formatting. Focus on strong action verbs and concrete achievements.';

        const requestBody = {
            model: 'meta-llama/llama-3.2-3b-instruct:free',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: text
                }
            ],
            temperature: 0.7,
        };

        console.log('Making request to OpenRouter with model:', requestBody.model);

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://cvbanao.netlify.app',
                'X-Title': 'BuildMyCV',
            },
            body: JSON.stringify(requestBody),
        });

        console.log('OpenRouter response status:', response.status, response.statusText);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter API full error:', JSON.stringify(errorData, null, 2));
            return NextResponse.json(
                { error: `AI Service Error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        let improvedText = data.choices[0]?.message?.content?.trim();

        if (!improvedText) {
            throw new Error('No content received from AI');
        }

        // Clean up unwanted prefixes and formatting
        improvedText = improvedText
            // Remove common conversational prefixes
            .replace(/^(here is the improved text:|here's the improved text:|improved text:|here you go:|sure,?\s*)/i, '')
            // Remove quotes at the beginning and end
            .replace(/^["']|["']$/g, '')
            // Remove any remaining leading/trailing whitespace
            .trim();

        return NextResponse.json({ improvedText });
    } catch (error) {
        console.error('AI Improve Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
