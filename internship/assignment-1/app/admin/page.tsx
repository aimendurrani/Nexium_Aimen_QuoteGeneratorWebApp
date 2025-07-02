"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const handleAddQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = tags.split(",").map((tag) => tag.trim());

    const { error } = await supabase.from("quotes").insert([
      {
        text,
        author,
        category,
        tags: tagArray,
      },
    ]);

    if (error) {
      alert("Error adding quote: " + error.message);
    } else {
      alert("Quote added successfully!");
      setText("");
      setAuthor("");
      setCategory("");
      setTags("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin: Add Quote</h1>
      <form onSubmit={handleAddQuote} className="flex flex-col gap-2">
        <Input
          placeholder="Quote text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Input
          placeholder="Category (e.g. success)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          placeholder="Tags (comma separated, e.g. motivation,courage)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Button type="submit">Add Quote</Button>
      </form>
    </div>
  );
}
