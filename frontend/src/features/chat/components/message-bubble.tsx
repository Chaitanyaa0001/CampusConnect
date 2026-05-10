'use client';

import { Message } from '@/data/chats';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex gap-3',
        message.isOwn ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div className='relative h-8 w-8 rounded-full overflow-hidden bg-muted flex-shrink-0'>
        <Image
          src={message.senderAvatar}
          alt={message.sender}
          fill
          className='object-cover'
          sizes='32px'
        />
      </div>

      <div
        className={cn(
          'flex flex-col gap-1 max-w-xs',
          message.isOwn ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-lg px-4 py-2 text-sm',
            message.isOwn
              ? 'bg-primary text-white'
              : 'bg-muted text-foreground'
          )}
        >
          {message.content}
        </div>
        <span className='text-xs text-muted-foreground'>{message.timestamp}</span>
      </div>
    </div>
  );
}
