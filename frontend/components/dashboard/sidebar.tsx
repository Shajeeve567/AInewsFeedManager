"use client";

import { TrendUp, Sparkle } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";

interface TrendingTopic {
  word: string;
  count: number;
  maxCount: number;
}

interface SidebarProps {
  trendingTopics: TrendingTopic[];
}

export function Sidebar({ trendingTopics }: SidebarProps) {
  return (
    <aside className="space-y-6">
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2">
            <TrendUp size={16} className="text-fedin-green animate-pulse" />
            <h3 className="text-sm font-semibold text-fedin-dark">Trending Topics</h3>
          </div>
          {trendingTopics.length === 0 ? (
            <p className="mt-3 text-xs text-fedin-dark/60">No topics trending yet.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {trendingTopics.map((topic) => (
                <div key={topic.word}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-fedin-dark/90">{topic.word}</span>
                    <span className="text-fedin-dark/60">{topic.count}</span>
                  </div>
                  <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-white/50">
                    <div
                      className="h-full rounded-full bg-fedin-green/80"
                      style={{ width: `${(topic.count / topic.maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2">
            <Sparkle size={16} className="text-fedin-green" />
            <h3 className="text-sm font-semibold text-fedin-dark">About Stratum</h3>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-fedin-dark/70">
            Stratum uses AI to aggregate, rank, and summarize technology news so you can stay informed without the noise.
          </p>
        </CardContent>
      </Card>
    </aside>
  );
}
