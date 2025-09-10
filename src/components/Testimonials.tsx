'use client';

import { Card } from '@/components/ui';
import { TESTIMONIALS } from '@/data';
import { useAutoCarousel, classNames } from '@/lib/utils';

export function Testimonials() {
  const [index] = useAutoCarousel(TESTIMONIALS.length, 4200);
  
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <Card key={i} className={classNames("p-6 transition", index === i ? "ring-white/30" : "opacity-70 hover:opacity-100")}> 
          <p className="text-gray-200">&ldquo;{t.quote}&rdquo;</p>
          <p className="mt-4 text-sm text-gray-400">{t.name} · {t.role}</p>
        </Card>
      ))}
    </div>
  );
}