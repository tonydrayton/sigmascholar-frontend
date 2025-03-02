'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Send, Image as ImageIcon } from 'lucide-react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ text?: string; image?: string }[]>([]);
  const [input, setInput] = useState('');
  async function sendMessage() {
	try {
	  const res = await fetch('/api/chat', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
		  message: input,
		  system_message: "You are a friendly Chatbot.",
		  max_tokens: 512,
		  temperature: 0.7,
		  top_p: 0.95,
		}),
	  });
	  const data = await res.json();
	  console.log(data);
	  if (data.generated_text) {
		setMessages((prev) => [...prev, { text: data.generated_text }]);
	  }
	} catch (error) {
	  console.error("Error fetching model response:", error);
	}
  }

  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessages([...messages, { image: reader.result as string }]);
      };
      reader.readAsDataURL(file);
    }
  };

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
			<h1 className="text-4xl font-bold text-emerald-800 mb-4">Welcome to Chat</h1>
			<p className="text-lg text-gray-600 mb-6">Start your AI-powered learning journey here!</p>

			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<div className="h-64 border border-gray-300 rounded-md p-4 overflow-y-auto">
					{messages.length === 0 ? (
						<p className="text-gray-500">Chat messages will appear here...</p>
					) : (
						messages.map((msg, index) => (
							<div key={index} className="mb-2">
								{msg.text && <p className="bg-gray-200 p-2 rounded">{msg.text}</p>}
								{msg.image && (
									<Image src={msg.image} alt="Uploaded" width={200} height={200} className="rounded mt-2" />
								)}
							</div>
						))
					)}
				</div>

                {/* Input Area */}
                <div className="mt-4 flex items-center border border-gray-300 rounded-md overflow-hidden">
                    {/* hidden file input */}
                    <input type="file" accept="image/*" className="hidden" id="fileInput" onChange={handleImageUpload} />
                
                    <label htmlFor="fileInput" className="p-3 bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-600" />
                    </label>

                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-grow p-3 focus:outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button onClick={sendMessage} className="bg-emerald-600 text-white p-3 hover:bg-emerald-700 flex items-center justify-center">
                        <Send className="h-6 w-6" />
                    </button>
                </div>

			</div>
		</div>
	);
}
