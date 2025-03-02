import { NextResponse } from 'next/server';
import supabase from '@/utils/supabaseClient';

// DELETE endpoint to clear all chats
export async function DELETE() {
  try {
    // First, check if there are any rows to delete
    const { data: existingData, error: checkError } = await supabase
      .from('chats')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking existing chats:', checkError);
      return NextResponse.json(
        { error: `Failed to check existing chats: ${checkError.message}` },
        { status: 500 }
      );
    }

    // If there are rows, delete them all
    if (existingData && existingData.length > 0) {
      // Get all IDs first
      const { data: allIds, error: idsError } = await supabase
        .from('chats')
        .select('id');

      if (idsError) {
        console.error('Error fetching chat IDs:', idsError);
        return NextResponse.json(
          { error: `Failed to fetch chat IDs: ${idsError.message}` },
          { status: 500 }
        );
      }

      if (allIds && allIds.length > 0) {
        console.log(`Found ${allIds.length} chats to delete on server`);

        // Delete each chat one by one
        for (const item of allIds) {
          const { error: itemError } = await supabase
            .from('chats')
            .delete()
            .eq('id', item.id);

          if (itemError) {
            console.error(`Error deleting chat ${item.id}:`, itemError);
            return NextResponse.json(
              { error: `Failed to clear chat history: ${itemError.message}` },
              { status: 500 }
            );
          }
        }

        console.log("Successfully cleared all chat history on server");
      }
    } else {
      console.log("No existing chats to clear on server");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error clearing chats:', err);
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
      role: 'user',
      message_text: body.message_text || null,
      image_url: body.image_url || null
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
