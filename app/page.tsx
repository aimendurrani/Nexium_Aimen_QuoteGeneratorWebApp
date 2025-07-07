"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { quotes } from "@/lib/quotes";

export default function Home() {
  const [selection, setSelection] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [results, setResults] = useState<{ text: string }[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false); // ✅ new state

  const options = Array.from(
    new Set([
      ...quotes.map((q) => q.topic),
      ...quotes.flatMap((q) => q.tags),
    ])
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchTerm = selection.toLowerCase();

    const filtered = quotes
      .filter(
        (q) =>
          q.topic.toLowerCase().includes(searchTerm) ||
          q.tags.some((t) => t.toLowerCase().includes(searchTerm))
      )
      .slice(0, 3);

    setResults(filtered);
    setShowSuggestions(false);
    setHasSearched(true); // ✅ set after user submits
  };

  const filteredSuggestions = selection
    ? options.filter((opt) =>
        opt.toLowerCase().includes(selection.toLowerCase())
      )
    : [];

  return (
    <main
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
      }}
      className="flex flex-col items-center justify-center"
    >
      <div className="relative p-8 flex flex-col items-center gap-6 bg-white bg-opacity-70 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold">Random Quote Generator</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full relative"
        >
          <Input
            placeholder="Type topic or tag"
            value={selection}
            onChange={(e) => {
              setSelection(e.target.value);
              setShowSuggestions(true);
              setHasSearched(false); // reset search state while typing
            }}
          />

          {selection && showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-14 z-10 bg-white border rounded shadow w-full max-h-48 overflow-auto">
              {filteredSuggestions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setSelection(opt);
                    setShowSuggestions(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {opt}
                </div>
              ))}
            </div>
          )}

          <Button type="submit">Generate Quotes</Button>
        </form>

        <div className="grid gap-4 mt-6 w-full">
          {results.length > 0 ? (
            results.map((q, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <p>{q.text}</p>
                </CardContent>
              </Card>
            ))
          ) : hasSearched ? (
            <p className="text-gray-500">
              No quotes found. Try another topic or tag!
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
