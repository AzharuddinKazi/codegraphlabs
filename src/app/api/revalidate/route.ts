import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

/**
 * Sanity webhook target: Studio publishes fire this, which revalidates
 * the homepage on-demand instead of waiting for the timed revalidate
 * window. Configure the webhook in manage.sanity.io once the project
 * exists (see SETUP.md).
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }

    revalidatePath('/');
    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }
}
