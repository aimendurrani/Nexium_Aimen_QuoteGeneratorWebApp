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
      alert("❌ Error adding quote: " + error.message);
    } else {
      alert("✅ Quote added successfully!");
      setText("");
      setAuthor("");
      setCategory("");
      setTags("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-2">Admin: Add Quote</h1>
          <form onSubmit={handleAddQuote} className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Quote text</span>
              </label>
              <Input
                placeholder="Quote text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <Input
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <Input
                placeholder="Category (e.g. success)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Tags (comma separated)</span>
              </label>
              <Input
                placeholder="e.g. motivation,courage"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <Button type="submit" className="btn btn-primary w-full">
              Add Quote
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
