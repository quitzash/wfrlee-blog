import type { APIRoute } from 'astro';
import { generateGuide } from '@/lib/ai/gemini';
import { commitMarkdownFile } from '@/lib/publish/github';
import { toKebab } from '@/lib/utils';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const token = request.headers.get('x-admin-token');
  if (token !== import.meta.env.ADMIN_TOKEN) return new Response('Unauthorized', { status: 401 });
  try {
    const body = await request.json() as {
      lang: 'en' | 'ar';
      topic: string;
      city?: string;
      primaryKeyword: string;
      tags?: string[];
      includeFaq?: boolean;
      publishNow?: boolean;
    };
    const today = new Date().toISOString().slice(0, 10);
    const slug = toKebab(body.topic);
    const filename = today + '-' + slug + '.md';
    const content = await generateGuide(body);
    const targetPath = 'src/content/blog/' + body.lang + '/' + filename;
    await commitMarkdownFile(targetPath, content, 'feat(ai): add draft guide ' + filename + ' (' + body.lang + ')');
    return new Response(JSON.stringify({ ok: true, draft: true, path: targetPath, filename }), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message ?? 'error' }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
};
