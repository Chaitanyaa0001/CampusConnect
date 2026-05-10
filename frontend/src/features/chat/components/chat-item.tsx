'use client';

import { Chat } from '@/data/chats';
import { Badge } from '@/shared/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ChatItemProps {
  chat: Chat;
  isActive?: boolean;
}

export function ChatItem({ chat, isActive }: ChatItemProps) {
  return (
    <Link href={`/chat/${chat.id}`}>
      <div
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border',
          isActive
            ? 'bg-primary/10 border-primary'
            : 'bg-card border-border hover:bg-muted'
        )}
      >
        <div className='relative h-12 w-12 rounded-full overflow-hidden bg-muted flex-shrink-0'>
          <Image
            src={chat.avatar}
            alt={chat.name}
            fill
            className='object-cover'
            sizes='48px'
          />
        </div>

        <div className='flex-1 min-w-0'>
          <div className='flex justify-between items-start gap-2'>
            <h3 className='font-semibold text-foreground truncate'>{chat.name}</h3>
            <span className='text-xs text-muted-foreground flex-shrink-0'>{chat.timestamp}</span>
          </div>
          <p className='text-sm text-muted-foreground truncate'>{chat.lastMessage}</p>
        </div>

        {chat.unreadCount > 0 && (
          <Badge className='bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center p-0 flex-shrink-0'>
            {chat.unreadCount}
          </Badge>
        )}
      </div>
    </Link>
  );
}
