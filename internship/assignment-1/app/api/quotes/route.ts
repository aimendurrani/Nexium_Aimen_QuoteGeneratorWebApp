import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') || '';
  const { data, error } = await supabase
    .from('quotes')
    .select('text, author, category')
    .ilike('category', category);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
