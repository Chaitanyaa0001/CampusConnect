'use client';

import { AuthenticatedLayout } from '@/shared/layouts/authenticated-layout';
import { ChatList } from '@/features/chat/components/chat-list';
import { MessageList } from '@/features/chat/components/message-list';
import { MessageInput } from '@/features/chat/components/message-input';
import { chatsData } from '@/data/chats';
import { currentUser } from '@/data/user';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { useState } from 'react';
import Image from 'next/image';

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState(chatsData[0]?.id);
  const [messages, setMessages] = useState(chatsData[0]?.messages || []);

  const selectedChat = chatsData.find((chat) => chat.id === selectedChatId);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    const chat = chatsData.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
    }
  };

  const handleSendMessage = (messageText: string) => {
    const newMessage = {
      id: `m${Date.now()}`,
      sender: currentUser.name,
      senderAvatar: currentUser.avatar,
      content: messageText,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <AuthenticatedLayout>
      <div className='p-6 md:p-8 h-[calc(100vh-4rem)]'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-full'>
          {/* Chat List */}
          <Card className='lg:col-span-1 border border-border bg-card p-4 overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-bold text-foreground'>Messages</h2>
              <Button className='bg-primary hover:bg-primary/80 text-primary-foreground text-sm'>
                + New
              </Button>
            </div>
            <ChatList chats={chatsData} activeChat={selectedChatId} />
          </Card>

          {/* Chat Area */}
          <div className='lg:col-span-2 flex flex-col gap-4 h-full'>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <Card className='border border-border bg-card p-4 flex items-center gap-3'>
                  <div className='relative h-10 w-10 rounded-full overflow-hidden bg-muted'>
                    <Image
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      fill
                      className='object-cover'
                      sizes='40px'
                    />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground'>{selectedChat.name}</h3>
                    <p className='text-xs text-muted-foreground'>
                      {selectedChat.isGroup ? 'Group chat' : 'Direct message'}
                    </p>
                  </div>
                </Card>

                {/* Messages */}
                <Card className='flex-1 border border-border bg-card p-4 overflow-y-auto'>
                  <MessageList messages={messages} />
                </Card>

                {/* Message Input */}
                <MessageInput onSendMessage={handleSendMessage} />
              </>
            ) : (
              <Card className='border border-border bg-card flex items-center justify-center'>
                <div className='text-center'>
                  <p className='text-muted-foreground text-lg'>Select a chat to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
