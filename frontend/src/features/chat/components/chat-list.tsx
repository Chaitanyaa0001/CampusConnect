'use client';

import { Chat } from '@/data/chats';
import { ChatItem } from './chat-item';

interface ChatListProps {
  chats: Chat[];
  activeChat?: string;
}

export function ChatList({ chats, activeChat }: ChatListProps) {
  return (
    <div className='space-y-2'>
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} isActive={activeChat === chat.id} />
      ))}
    </div>
  );
}
