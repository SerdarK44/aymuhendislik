"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/types";
import { ArrowRight, Clock, ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { motion } from "framer-motion";

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (!posts?.length) return null;
  
  return (
    <section className="py-32 bg-brand-50 relative overflow-hidden section-divider">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-[2px] bg-brand-500" />
                <p className="text-xs font-bold text-brand-600 uppercase tracking-[0.2em]">Blog</p>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-ink-900 tracking-tight">Mühendislik Rehberi</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex text-sm font-bold text-ink-900 hover:text-brand-600 transition-colors items-center gap-2 group">
              Tümünü Gör 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.12}>
              <article>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <motion.div 
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative"
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 mb-6">
                      <Image
                        src={post.coverImage || "/images/2.png"}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                      />
                      {/* Hover arrow icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 text-ink-900">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-3 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </div>
                    <h3 className="font-bold text-ink-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug text-base">
                      {post.title}
                    </h3>
                  </motion.div>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* Mobile "see all" link */}
        <div className="sm:hidden mt-10 text-center">
          <Link href="/blog" className="text-sm font-bold text-ink-900 hover:text-brand-600 transition-colors inline-flex items-center gap-2">
            Tümünü Gör <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}