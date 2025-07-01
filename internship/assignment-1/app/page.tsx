"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Quote = {
  category: string;
  text: string;
};

const quotes: Quote[] = [
  { category: "fear", text: "Do one thing every day that scares you." },
  { category: "fear", text: "Fear is temporary. Regret is forever." },
  { category: "fear", text: "Don’t let fear decide your future." },

  { category: "success", text: "Success is not final; failure is not fatal: It is the courage to continue that counts." },
  { category: "success", text: "The road to success and the road to failure are almost exactly the same." },
  { category: "success", text: "Success usually comes to those who are too busy to be looking for it." },
  
  { category: "failure", text: "Failure is not the opposite of success, it's part of success" },
  { category: "failure", text: "Only those who dare to fail greatly can ever achieve greatly." },
  { category: "failure", text: "I can accept failure, everyone fails at something. But I can't accept not trying." },
];

export default function Home() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = quotes
      .filter((q) => q.category.toLowerCase() === topic.toLowerCase())
      .map((q) => q.text)
      .slice(0, 3); // take up to 3 quotes
    setResults(matched.length ? matched : ["No quotes found for this topic."]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <Input
          placeholder="Enter a topic (e.g., fear, success, failure)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Get Quotes</Button>
      </form>

      {results.length > 0 && (
        <div className="mt-6 space-y-2 text-center">
          {results.map((quote, index) => (
            <p key={index} className="text-lg font-medium">{quote}</p>
          ))}
        </div>
      )}
    </main>
  );
}
