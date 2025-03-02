'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Send, Image as ImageIcon } from 'lucide-react';
import supabase from '@/utils/supabaseClient';
import { Spinner } from '@/components/Spinner';

export default function ChatPage() {
  const [messages, setMessages] = useState<
    { text?: string; image?: string; isUser?: boolean }[]
  >([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Navbar height (adjust based on your actual navbar height)
  const navbarHeight = 64; // Example: 64px
  const chatHeight = `calc(100vh - ${navbarHeight}px)`;

  useEffect(() => {
    const clearChats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log('Clearing all chats on session restart');

        const response = await fetch('/api/chats', {
          method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Error clearing chats:', data.error);
          setError(`Failed to clear chat history: ${data.error}`);
        } else {
          console.log('Successfully cleared chat and file history');
          setMessages([]);
        }
      } catch (err) {
        console.error('Unexpected error clearing chats:', err);
        setError(
          `Unexpected error: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    clearChats();
  }, []);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setIsLoading(true);
    setError(null);

    try {
      // Add user message to UI
      const userMessage = { text: input, isUser: true };
      setMessages((prev) => [...prev, userMessage]);
      const currentInput = input;
      setInput('');

      // Save user message to Supabase via API
      const saveResponse = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message_text: currentInput }),
      });

      if (!saveResponse.ok) {
        const saveData = await saveResponse.json();
        console.error('Error saving message:', saveData.error);
        setError(`Failed to save message: ${saveData.error}`);
        return;
      }

      // Get AI response
      const aiResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const aiData = await aiResponse.json();

      if (!aiResponse.ok) {
        console.error('Error getting AI response:', aiData.error);
        setError(`Failed to get AI response: ${aiData.error}`);
        return;
      }

      if (aiData.generated_text) {
        const outputText =
          typeof aiData.generated_text === 'string'
            ? aiData.generated_text
            : String(aiData.generated_text);

        const splitMessages = outputText.includes('<|im_start|>')
          ? outputText
              .split('<|im_start|>')
              .filter(Boolean)
              .map((msg: string) => msg.split('<|im_end|>')[0].trim())
          : [outputText];

        splitMessages.forEach((message: string) => {
          const aiMessage = { text: message, isUser: false };
          setMessages((prev) => [...prev, aiMessage]);

          // Save AI response to Supabase
          fetch('/api/chats', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message_text: message,
              role: 'assistant',
            }),
          }).catch((err) =>
            console.error('Error saving AI response to Supabase:', err)
          );
        });
      }
    } catch (err) {
      console.error('Error in chat flow:', err);
      setError(
        `Unexpected error: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create a unique filename to prevent collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Uploading image:', filePath);

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('chat-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        setError(`Failed to upload image: ${uploadError.message}`);
        return;
      }

      console.log('Image uploaded successfully to Supabase Storage');

      // Get the public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from('chat-images')
        .getPublicUrl(filePath);

      if (!urlData || !urlData.publicUrl) {
        console.error('Failed to get public URL for uploaded image');
        setError('Failed to get public URL for uploaded image');
        return;
      }

      console.log('Image URL:', urlData.publicUrl);

      // Optimistically update UI with the image
      const newMessage = { image: urlData.publicUrl, isUser: true };
      setMessages((prev) => [...prev, newMessage]);

      // Save image URL via API route
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_url: urlData.publicUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error saving image URL:', data.error);
        setError(`Failed to save image: ${data.error}`);
      } else {
        console.log('Image saved successfully');
      }

      // Dynamically import Tesseract.js (client-side only)
      const { default: Tesseract } = await import('tesseract.js');

      console.log('Starting OCR process on image...');
      const {
        data: { text: extractedText },
      } = await Tesseract.recognize(urlData.publicUrl, 'eng', {
        logger: (m) => console.log(m),
      });
      console.log('OCR extracted text:', extractedText);

      if (extractedText.trim()) {
 
        // Send the OCR extracted text to the AI
        const aiResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: extractedText }),
        });

        const aiData = await aiResponse.json();

        if (!aiResponse.ok) {
          console.error(
            'Error getting AI response for OCR text:',
            aiData.error
          );
          setError(`Failed to get AI response: ${aiData.error}`);
        } else if (aiData.generated_text) {
          const outputText =
            typeof aiData.generated_text === 'string'
              ? aiData.generated_text
              : String(aiData.generated_text);
          const splitMessages = outputText.includes('<|im_start|>')
            ? outputText
                .split('<|im_start|>')
                .filter(Boolean)
                .map((msg: string) => msg.split('<|im_end|>')[0].trim())
            : [outputText];
          splitMessages.forEach((message: string) => {
            const aiMessage = { text: message, isUser: false };
            setMessages((prev) => [...prev, aiMessage]);
            // Save AI response
            fetch('/api/chats', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message_text: message,
                role: 'assistant',
              }),
            }).catch((err) =>
              console.error('Error saving AI response to Supabase:', err)
            );
          });
        }
      }
    } catch (err) {
      console.error('Error uploading image and processing OCR:', err);
      setError(
        `Unexpected error: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setIsLoading(false);
      event.target.value = ''; // Clear the file input
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="flex flex-col bg-emerald-50 p-4 mx-auto"
      style={{ height: chatHeight, maxWidth: '42rem' }}
    >
      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto p-4">
        {messages.length === 0 && !isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">
              Start chatting with the AI to begin your conversation!
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${
                msg.isUser ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block rounded-lg p-3 max-w-[80%] ${
                  msg.isUser
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text && <p>{msg.text}</p>}
                {msg.image && (
                  <div className="mt-2">
                    <Image
                      src={msg.image}
                      alt="Uploaded"
                      width={200}
                      height={200}
                      className="rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
  
        {isLoading && (
          <div className="flex justify-center my-2">
            <Spinner />
          </div>
        )}
      </div>
  
      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={handleImageUpload}
            disabled={isLoading}
          />
  
          <label
            htmlFor="fileInput"
            className={`p-2 cursor-pointer flex items-center justify-center ${
              isLoading
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200'
            } rounded-full mr-2`}
          >
            <ImageIcon className="h-5 w-5 text-gray-600" />
          </label>
  
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow p-3 rounded-full border border-gray-300 focus:outline-none focus:border-emerald-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            autoFocus
          />
  
          <button
            onClick={sendMessage}
            className={`p-3 ml-2 flex items-center justify-center ${
              isLoading || input.trim() === ''
                ? 'bg-emerald-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700'
            } text-white rounded-full`}
            disabled={isLoading || input.trim() === ''}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}