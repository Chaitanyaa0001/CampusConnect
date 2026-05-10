'use client';

import { Project } from '@/data/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const spotsLeft = project.requiredMembers - project.currentMembers;

  return (
    <Card className='border border-border bg-card hover:shadow-lg transition-shadow h-full flex flex-col'>
      <CardHeader>
        <div className='flex justify-between items-start gap-2'>
          <div>
            <CardTitle className='text-lg line-clamp-2'>{project.title}</CardTitle>
            <p className='text-sm text-muted-foreground mt-2'>{project.category}</p>
          </div>
          <Badge
            variant={spotsLeft > 0 ? 'default' : 'secondary'}
            className={spotsLeft > 0 ? 'bg-primary' : 'bg-muted'}
          >
            {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className='flex-1 space-y-4'>
        <p className='text-sm text-foreground/80 line-clamp-3'>{project.description}</p>

        <div className='space-y-3'>
          <div>
            <p className='text-xs text-muted-foreground'>Team Lead</p>
            <p className='text-sm font-semibold text-foreground'>{project.leader}</p>
          </div>

          <div>
            <p className='text-xs text-muted-foreground mb-2'>Team Progress</p>
            <div className='w-full bg-muted rounded-full h-2'>
              <div
                className='bg-primary h-2 rounded-full'
                style={{
                  width: `${(project.currentMembers / project.requiredMembers) * 100}%`,
                }}
              />
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              {project.currentMembers}/{project.requiredMembers} members
            </p>
          </div>

          <div className='flex flex-wrap gap-2'>
            {project.tags.map((tag) => (
              <Badge key={tag} variant='outline' className='text-xs'>
                {tag}
              </Badge>
            ))}
          </div>

          {project.deadline && (
            <div>
              <p className='text-xs text-muted-foreground'>Deadline</p>
              <p className='text-sm font-semibold text-foreground'>{project.deadline}</p>
            </div>
          )}
        </div>
      </CardContent>

      <div className='px-6 pb-6 pt-0'>
        <Button
          className='w-full bg-primary hover:bg-primary/80'
          disabled={spotsLeft === 0}
        >
          {spotsLeft > 0 ? 'Join Project' : 'Team Full'}
        </Button>
      </div>
    </Card>
  );
}
