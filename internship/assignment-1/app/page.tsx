"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Quote = {
  text: string;
  author: string;
  category: string;
  tags: string[];
};

export default function QuotePage() {
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);

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
      setQuotes([]);
    } else if (!data || data.length === 0) {
      setQuotes([]);
    } else {
      const shuffled = data.sort(() => 0.5 - Math.random());
      setQuotes(shuffled.slice(0, 3));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Motivational Quote Generator</h1>

      <div className="flex flex-col gap-3 md:flex-row md:gap-4 mb-6">
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
        <Button onClick={fetchQuotes} className="btn btn-primary">Get Quotes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quotes.length === 0 && <p className="text-center">No quotes found. Try another category or tag!</p>}
        {quotes.map((q, idx) => (
          <div key={idx} className="card bg-base-100 shadow-md hover:scale-105 transition-transform">
            <div className="card-body">
              <p className="text-lg italic">"{q.text}"</p>
              <div className="mt-2 text-right font-semibold">— {q.author}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {q.tags && q.tags.map((t, i) => (
                  <span key={i} className="badge badge-secondary">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
