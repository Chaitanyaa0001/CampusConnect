import { Feature } from '@/data/features';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card className='border border-border bg-card hover:shadow-lg transition-shadow'>
      <CardHeader>
        <div className='text-4xl mb-2'>{feature.icon}</div>
        <CardTitle className='text-xl'>{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className='text-muted-foreground leading-relaxed'>
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
