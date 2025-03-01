'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Send, Image as ImageIcon } from 'lucide-react';
import supabase from '@/utils/supabaseClient'; 

export default function ChatPage() {
    const [messages, setMessages] = useState<{ text?: string; image?: string }[]>([]);
    const [input, setInput] = useState('');

    // Clear chat history on page load
    useEffect(() => {
        const clearChats = async () => {
            const { error } = await supabase
                .from('chats')
                .delete()
                .neq('id', ''); // Delete all rows
            if (error) {
                console.error('Error clearing chats:', error);
            } else {
                setMessages([]); // Clear the local state
            }
        };
        clearChats();
    }, []);

    const sendMessage = async () => {
        if (input.trim() !== '') {
            // Save text message to Supabase
            const { error } = await supabase
                .from('chats')
                .insert([{ role: 'user', message_text: input }]);

            if (error) {
                console.error('Error saving message:', error);
            } else {
                setMessages([...messages, { text: input }]);
                setInput('');
            }
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Upload image to Supabase Storage
            const filePath = `images/${file.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('chat-images') // Your Supabase Storage bucket
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                return;
            }

            // Get the public URL of the uploaded image
            const { data: urlData } = supabase.storage
                .from('chat-images')
                .getPublicUrl(filePath);

            // Save image URL to Supabase
            const { error: dbError } = await supabase
                .from('chats')
                .insert([{ role: 'user', image_url: urlData.publicUrl }]);

            if (dbError) {
                console.error('Error saving image URL:', dbError);
            } else {
                setMessages([...messages, { image: urlData.publicUrl }]);
            }
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
                    {/* Hidden file input */}
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