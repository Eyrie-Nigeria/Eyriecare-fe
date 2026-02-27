"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send, Loader2, BookOpen, User, Plus, Layers } from "lucide-react";

// Small helper: split NDJSON stream lines safely
async function* ndjsonStreamIterator(reader: ReadableStreamDefaultReader<Uint8Array>) {
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let i;
    while ((i = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, i).trim();
      buffer = buffer.slice(i + 1);
      if (line) {
        yield line;
      }
    }
  }
  // tail
  if (buffer.trim()) yield buffer.trim();
}

type Msg = { id: string; role: "user" | "assistant"; text: string; sources?: any[] };

export default function StreamingChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "sys-0",
      role: "assistant",
      text: "Hello — ask about lecture content. (Tip: mention the professor or course.)",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<{ id: string; title: string }[]>([
    { id: "s-1", title: "Session 1" },
  ]);
  const [activeSession, setActiveSession] = useState("s-1");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function addMessage(m: Msg) {
    setMessages((prev) => [...prev, m]);
  }

  function updateLastAssistant(appendText: string) {
    setMessages((prev) => {
      // find last assistant message
      const idx = prev.map((m) => m.role).lastIndexOf("assistant");
      if (idx === -1) {
        // create one
        return [...prev, { id: "a-temp", role: "assistant", text: appendText }];
      }
      const copy = [...prev];
      copy[idx] = { ...copy[idx], text: copy[idx].text + appendText };
      return copy;
    });
  }

  // Word-by-word typing reveal controller
  // We'll maintain a "buffer" of incoming text and reveal it word-by-word
  const typingQueueRef = useRef<string[]>([]); // words queued for reveal
  const revealingRef = useRef(false);
  const revealIntervalRef = useRef<number | null>(null);

  function enqueueWordsAndStartReveal(text: string) {
    // push words
    const words = text.split(/\s+/).filter(Boolean);
    typingQueueRef.current.push(...words);
    if (!revealingRef.current) startRevealLoop();
  }

  function startRevealLoop() {
    revealingRef.current = true;
    // reveal at ~80ms per word (adjust for readability). Use larger delay for long words if needed.
    const stepMs = 80;

    if (revealIntervalRef.current) window.clearInterval(revealIntervalRef.current);

    revealIntervalRef.current = window.setInterval(() => {
      const word = typingQueueRef.current.shift();
      if (!word) {
        // no words; stop
        if (revealIntervalRef.current) {
          window.clearInterval(revealIntervalRef.current);
          revealIntervalRef.current = null;
        }
        revealingRef.current = false;
        return;
      }
      // append with space
      updateLastAssistant((typingQueueRef.current.length === 0) ? word : word + " ");
    }, stepMs);
  }

  // Start streaming request
  async function startStream(question: string) {
    setLoading(true);
    abortControllerRef.current?.abort();
    const ac = new AbortController();
    abortControllerRef.current = ac;

    // Add user message
    const userId = `u-${Date.now()}`;
    addMessage({ id: userId, role: "user", text: question });

    // Create placeholder assistant message
    addMessage({ id: `a-${Date.now()}`, role: "assistant", text: "" });

    try {
      const resp = await fetch("/api/chat/lecturer-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: ac.signal,
      });

      if (!resp.ok || !resp.body) {
        const txt = await resp.text();
        addMessage({ id: `a-err-${Date.now()}`, role: "assistant", text: "Error: " + txt });
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      for await (const line of ndjsonStreamIterator(reader)) {
        // Each line is NDJSON JSON object
        let parsed;
        try {
          parsed = JSON.parse(line);
        } catch (err) {
          // fallback raw
          parsed = { text: line };
        }

        if (parsed.done) {
          // finalization: stop reveal
          // ensure queue empties
          if (typingQueueRef.current.length === 0) {
            // ensure any interval cleared
            if (revealIntervalRef.current) {
              window.clearInterval(revealIntervalRef.current);
              revealIntervalRef.current = null;
            }
            revealingRef.current = false;
          }
          break;
        }

        const tokenText = parsed.text ?? parsed.delta ?? "";
        if (!tokenText) continue;

        // For a chunked piece, we enqueue words for the typing animation
        enqueueWordsAndStartReveal(tokenText);
      }

      // stream finished
    } catch (err: any) {
      if (err.name === "AbortError") {
        updateLastAssistant("\n\n*(Stream aborted)*");
      } else {
        addMessage({ id: `a-err-${Date.now()}`, role: "assistant", text: "Stream error: " + String(err) });
      }
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;
    const q = input.trim();
    setInput("");
    await startStream(q);
  }

  // Sidebar: minimal vertical icons
  function Sidebar() {
    return (
      <aside className="w-14 bg-white border-r flex flex-col items-center py-4 gap-3 sticky top-0 h-screen">
        <button
          title="New"
          className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100"
          onClick={() => {
            const id = `s-${Date.now()}`;
            setSessions((s) => [{ id, title: "New chat" }, ...s]);
            setActiveSession(id);
            setMessages([{ id: "sys-0", role: "assistant", text: "New session — ask something." }]);
          }}
        >
          <Plus className="w-5 h-5 text-gray-700" />
        </button>

        <div className="w-px h-6 bg-gray-200" />

        {sessions.map((s) => (
          <button
            key={s.id}
            title={s.title}
            onClick={() => {
              setActiveSession(s.id);
              // For demo we don't persist per-session messages. You can extend this to store sessions.
            }}
            className={`w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 ${s.id === activeSession ? "ring-2 ring-blue-300" : ""}`}
          >
            <Layers className="w-5 h-5 text-gray-700" />
          </button>
        ))}

        <div className="mt-auto text-xs text-gray-400 px-1 text-center">
          EyrieCare
        </div>
      </aside>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold">Ask Your Lecturer</div>
            <div className="text-sm text-gray-500">Search lecture content with citations</div>
          </div>

          <div className="text-sm text-gray-500">
            {loading ? (
              <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> streaming…</span>
            ) : (
              <span>Ready</span>
            )}
          </div>
        </div>

        {/* Messages area */}
        <div ref={containerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="mr-3 w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <BookOpen className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-prose px-4 py-3 rounded-2xl ${m.role === "user" ? "bg-blue-600 text-white" : "bg-white border shadow-sm"}`}>
                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>

              {m.role === "user" && (
                <div className="ml-3 w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-700" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="border-t bg-white px-6 py-4">
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex items-center gap-3">
            <input
              className="flex-1 border rounded-lg px-4 py-3 outline-none"
              placeholder="Ask about a lecture (mention professor or topic)…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
            {loading && (
              <button type="button" onClick={() => { abortControllerRef.current?.abort(); setLoading(false); }} className="ml-2 px-3 py-2 border rounded-lg">
                Stop
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
