'use client';

import { useEffect } from 'react';
import { ACCENT } from '@/data';
import { classNames } from '@/lib/utils';
import React from 'react';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen w-full bg-[#0b0b0f] text-gray-200 antialiased selection:bg-gray-700/60">
      <style>{`:root{--accent:${ACCENT}} .reveal{opacity:.001; transform:translateY(10px); transition:opacity .6s ease, transform .6s ease} .reveal.revealed{opacity:1; transform:none}`}</style>
      {children}
    </div>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
  rightIcon?: React.ReactNode;
}

export function Button({ children, onClick, href, variant = 'solid', className = '', rightIcon }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm tracking-wide transition';
  const solid = 'bg-[var(--accent)] text-black hover:brightness-110';
  const outline = 'border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black';
  const ghost = 'text-gray-300 hover:text-white hover:bg-white/5';
  const classes = classNames(base, variant === 'solid' ? solid : variant === 'outline' ? outline : ghost, className);
  const Cmp = href ? 'a' : 'button';
  
  return (
    <Cmp href={href} onClick={onClick} className={classes}>
      <span className="font-semibold">{children}</span>
      {rightIcon && <span className="opacity-80" aria-hidden>{rightIcon}</span>}
    </Cmp>
  );
}

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function Tag({ children, active, onClick }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'rounded-xl px-4 py-2 text-xs tracking-wide',
        active ? 'bg-white/10 text-white border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
      )}
    >
      {children}
    </button>
  );
}

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="reveal container mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10">
        {subtitle && <p className="text-xs uppercase tracking-[0.25em] text-gray-400">{subtitle}</p>}
        <h2 className="mt-2 text-3xl md:text-4xl font-extralight text-white">{title}</h2>
      </header>
      {children}
    </section>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return <div className={classNames('rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm', className)}>{children}</div>;
}

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export function Toast({ show, message, onClose }: ToastProps) {
  useEffect(() => {
    if (!show) return;
    const id = setTimeout(onClose, 2600);
    return () => clearTimeout(id);
  }, [show, onClose]);

  return (
    <div
      className={classNames(
        'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform rounded-2xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20 backdrop-blur-md',
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      {message}
    </div>
  );
}