"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function QuotePage() {
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [quotes, setQuotes] = useState<string[]>([]);

  const fetchQuotes = async () => {
    let query = supabase.from("quotes").select("text, author, category, tags");

    if (category) {
      query = query.ilike("category", category);
    }

    if (tag) {
      query = query.contains("tags", [tag]);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      setQuotes(["Error fetching quotes."]);
    } else if (!data || data.length === 0) {
      setQuotes(["No quotes found."]);
    } else {
      const shuffled = data.sort(() => 0.5 - Math.random());
      setQuotes(shuffled.slice(0, 3).map((q) => `${q.text} — ${q.author}`));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Motivational Quote Generator</h1>
      <div className="flex flex-col gap-2 mb-4">
        <Input
          placeholder="Enter category (e.g. success)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          placeholder="Enter tag (optional)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button onClick={fetchQuotes}>Get Quotes</Button>
      </div>
      <div className="space-y-2">
        {quotes.map((quote, idx) => (
          <div key={idx} className="p-2 rounded bg-gray-100">
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
}
