'use client';

import { Button, Card, Section } from '@/components/ui';
import { useAutoReveal } from '@/lib/utils';

export function AboutPage() {
  useAutoReveal();
  
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400">About</p>
              <h2 className="mt-2 text-4xl font-extralight text-white">Hello, I&apos;m <span className="text-[var(--accent)]">[Your Name]</span>.</h2>
              <p className="mt-6 text-gray-400">
                I&apos;m a graphic designer specializing in branding and 3D visualization. My practice blends strategy,
                typography, and material sensibilities to build brand identities that last. In 3D, I focus on
                photoreal product renders and spatial storytelling.
              </p>
              <p className="mt-4 text-gray-400">
                Over the past 10+ years, I&apos;ve delivered systems for startups and established brands across
                consumer goods, hospitality, and tech. Work featured in design annuals and international blogs.
              </p>
              <div className="mt-8 flex gap-4">
                <Button href="#portfolio">View Portfolio</Button>
                <Button href="#" variant="outline">Download CV</Button>
              </div>
            </div>
            <div className="reveal">
              <Card className="overflow-hidden">
                <div className="relative aspect-[4/5] w-full">
                  <img
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1600&auto=format&fit=crop"
                    alt="Designer portrait"
                    className="h-full w-full object-cover opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Section id="highlights" subtitle="Highlights" title="Awards & Mentions">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {["AIGA Annual", "Communication Arts", "Behance Featured"].map((x) => (
            <Card key={x} className="p-6 text-center text-gray-300">{x}</Card>
          ))}
        </div>
      </Section>
    </>
  );
}