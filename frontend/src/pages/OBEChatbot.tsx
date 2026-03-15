import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  "Generate COs for this syllabus",
  "Map questions to CO",
  "Calculate attainment",
  "Explain PO mapping",
];

const OBEChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm the OBE Assistant for the CSE department at Vignan University. Ask me anything about Course Outcomes, PO mapping, or attainment calculations.\n\nNote: AI responses require backend integration. Currently showing template responses." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    const botMsg: Message = {
      role: "assistant",
      content: `Thank you for your query about "${input}". This feature requires backend AI integration to provide intelligent responses.`,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 flex flex-col h-[calc(100vh-140px)]">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-primary">OBE Assistant</h1>
          <p className="text-xs text-muted-foreground">Vignan CSE · AI-powered faculty assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground border border-border"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {quickPrompts.map((p) => (
          <button
            key={p}
            onClick={() => setInput(p)}
            className="text-xs px-3 py-1.5 rounded-md border border-border bg-muted/50 hover:bg-muted transition-colors text-foreground font-medium"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything about your course outcomes..."
          className="flex-1 rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <Button onClick={send} size="icon" disabled={!input.trim()} className="h-10 w-10">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OBEChatbot;
