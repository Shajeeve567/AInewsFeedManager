"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { getUserSources, createUserSource, removeUserSource, UserSource } from "@/lib/api";
import { Rss, Plus, Trash, Globe, Code, Lightning, ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";

export default function ManageSourcesPage() {
  const { user } = useAuth();
  const [sources, setSources] = useState<UserSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newType, setNewType] = useState<"RSS" | "API">("RSS");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSources = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await getUserSources(user.id);
      setSources(res.data);
    } catch (err) {
      setError("Failed to load your sources");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    setError("");
    try {
      await createUserSource(user.id, { name: newName, url: newUrl, type: newType });
      setNewName("");
      setNewUrl("");
      await fetchSources();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add source");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveSource = async (sourceId: number) => {
    if (!user) return;
    if (!confirm("Are you sure you want to remove this source?")) return;
    try {
      await removeUserSource(user.id, sourceId);
      setSources((prev) => prev.filter((s) => s.sourceId !== sourceId));
    } catch (err) {
      setError("Failed to remove source");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link 
              href="/dashboard"
              className="p-2 rounded-full bg-white/40 hover:bg-white/60 border border-white/60 text-fedin-dark transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} weight="bold" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-fedin-dark">Manage Sources</h1>
          </div>
          <p className="mt-1 text-sm text-fedin-dark/70 ml-12">
            Control the feeds that power your AI newsfeed.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200/50 bg-red-50/50 px-4 py-3 text-sm text-red-600 backdrop-blur-sm">
          {error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Add New Source Form */}
        <div className="glass-widget rounded-3xl p-6 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <Plus size={20} className="text-fedin-green" />
            <h2 className="text-lg font-semibold text-fedin-dark">Add New Source</h2>
          </div>

          <form onSubmit={handleAddSource} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-fedin-dark/70 ml-1">Source Name</label>
              <input
                type="text"
                placeholder="e.g. Hacker News, TechCrunch"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="w-full bg-white/40 border border-white/60 focus:border-fedin-green focus:ring-1 focus:ring-fedin-green rounded-xl px-4 py-2.5 text-sm text-fedin-dark placeholder:text-fedin-dark/40 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-fedin-dark/70 ml-1">Feed URL</label>
              <input
                type="url"
                placeholder="https://example.com/rss"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
                className="w-full bg-white/40 border border-white/60 focus:border-fedin-green focus:ring-1 focus:ring-fedin-green rounded-xl px-4 py-2.5 text-sm text-fedin-dark placeholder:text-fedin-dark/40 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-fedin-dark/70 ml-1">Source Type</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewType("RSS")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    newType === "RSS" 
                      ? "bg-fedin-green text-white btn-shadow border border-fedin-green" 
                      : "bg-white/40 text-fedin-dark/70 border border-white/60 hover:bg-white/60"
                  }`}
                >
                  <Rss size={16} /> RSS
                </button>
                <button
                  type="button"
                  onClick={() => setNewType("API")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    newType === "API" 
                      ? "bg-fedin-green text-white btn-shadow border border-fedin-green" 
                      : "bg-white/40 text-fedin-dark/70 border border-white/60 hover:bg-white/60"
                  }`}
                >
                  <Code size={16} /> API
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-fedin-dark hover:bg-black text-white font-medium py-3 rounded-xl transition-all duration-300 disabled:opacity-70 mt-2"
            >
              {isSubmitting ? "Adding..." : "Add Source"}
            </button>
            <p className="text-xs text-fedin-dark/50 text-center mt-2 flex items-center justify-center gap-1">
              <Lightning size={12} /> The feed will be ingested immediately.
            </p>
          </form>
        </div>

        {/* Existing Sources List */}
        <div className="glass-widget rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-fedin-green" />
              <h2 className="text-lg font-semibold text-fedin-dark">Your Sources</h2>
            </div>
            <span className="text-xs font-medium bg-white/50 px-2.5 py-1 rounded-full text-fedin-dark/70 border border-white/60">
              {sources.length} active
            </span>
          </div>

          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse h-16 bg-white/40 rounded-2xl border border-white/60" />
              ))
            ) : sources.length === 0 ? (
              <div className="text-center py-10 bg-white/20 rounded-2xl border border-white/40 border-dashed">
                <p className="text-sm text-fedin-dark/60 font-medium">No sources added yet.</p>
                <p className="text-xs text-fedin-dark/40 mt-1">Add one using the form to populate your feed.</p>
              </div>
            ) : (
              sources.map((us) => (
                <div key={us.sourceId} className="group flex items-center justify-between bg-white/40 hover:bg-white/60 border border-white/60 p-3 rounded-2xl transition-all">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-fedin-green/20 to-emerald-100 flex items-center justify-center border border-white/50">
                      {us.source.type === "RSS" ? (
                        <Rss size={16} className="text-fedin-green" />
                      ) : (
                        <Code size={16} className="text-fedin-green" />
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-fedin-dark truncate">{us.source.name}</p>
                      <p className="text-xs text-fedin-dark/50 truncate max-w-[200px]">{us.source.url}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveSource(us.sourceId)}
                    className="p-2 text-fedin-dark/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Remove Source"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
