import { NextResponse } from 'next/server';
import supabase from '@/utils/supabaseClient';

// DELETE endpoint to clear all chats
export async function DELETE() {
  try {
    const { data: fileList, error: listError } = await supabase.storage
      .from('chat-images')
      .list();

    if (listError) {
      console.error('Error listing files:', listError);
      return NextResponse.json(
        { error: `Failed to list files: ${listError.message}` },
        { status: 500 }
      );
    }

    if (fileList && fileList.length > 0) {
      const filesToDelete = fileList.map((file) => `${file.name}`);
      const { error: deleteError } = await supabase.storage
        .from('chat-images')
        .remove(filesToDelete);

      if (deleteError) {
        console.error('Error deleting files:', deleteError);
        return NextResponse.json(
          { error: `Failed to delete files: ${deleteError.message}` },
          { status: 500 }
        );
      }

      console.log('Successfully deleted all files from chat-images bucket');
    } else {
      console.log('No files found in chat-images bucket');
    }

    const { error: deleteChatsError } = await supabase
      .from('chats')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteChatsError) {
      console.error('Error clearing chats:', deleteChatsError);
      return NextResponse.json(
        { error: `Failed to clear chat history: ${deleteChatsError.message}` },
        { status: 500 }
      );
    }

    console.log('Successfully cleared all chat history on server');
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error clearing chats and files:', err);
    return NextResponse.json(
      { error: `Unexpected error: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }
}

// POST endpoint to add a new chat message
export async function POST(request: Request) {
  try {
      const body = await request.json();

      // Validate the request body
      if (!body || (!body.message_text && !body.image_url)) {
          return NextResponse.json(
              { error: 'Message text or image URL is required' },
              { status: 400 }
          );
      }

      // Prepare the data to insert
      const chatData = {
          role: body.role || 'user', // Default to 'user' if not specified
          message_text: body.message_text || null,
          image_url: body.image_url || null,
      };

      // Insert the chat message
      const { error } = await supabase
          .from('chats')
          .insert([chatData]);

      if (error) {
          console.error('Error saving message:', error);
          return NextResponse.json(
              { error: `Failed to save message: ${error.message}` },
              { status: 500 }
          );
      }

      return NextResponse.json({ success: true });
  } catch (err) {
      console.error('Error processing request:', err);
      return NextResponse.json(
          { error: `Unexpected error: ${err instanceof Error ? err.message : String(err)}` },
          { status: 500 }
      );
  }
}
