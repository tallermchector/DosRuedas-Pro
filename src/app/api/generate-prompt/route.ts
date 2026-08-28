import { NextRequest, NextResponse } from 'next/server';
import { generateAssetPrompt } from '@/ai/flows/generate-asset-prompt';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await generateAssetPrompt(body);
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('API Error in /api/generate-prompt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error interno al procesar el prompt con Genkit';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
