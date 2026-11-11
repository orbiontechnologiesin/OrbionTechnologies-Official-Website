"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import type { ContactLeadStatus } from "@/types/database";

interface LeadFilterBarProps {
  currentSearch?: string;
  currentStatus?: ContactLeadStatus;
}

export function LeadFilterBar({
  currentSearch = "",
  currentStatus,
}: LeadFilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(currentSearch);

  function applyFilters(newStatus?: string, newSearch?: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (newSearch !== undefined) {
      if (newSearch.trim()) {
        params.set("search", newSearch.trim());
      } else {
        params.delete("search");
      }
    }

    if (newStatus !== undefined) {
      if (newStatus && newStatus !== "all") {
        params.set("status", newStatus);
      } else {
        params.delete("status");
      }
    }

    // Reset to page 1 on filter change
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    applyFilters(undefined, search);
  }

  function handleClearSearch() {
    setSearch("");
    applyFilters(undefined, "");
  }

  const statusTabs: { label: string; value: string }[] = [
    { label: "All Inquiries", value: "all" },
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Qualified", value: "qualified" },
    { label: "Closed", value: "closed" },
  ];

  return (
    <div className="space-y-4">
      {/* Search Input and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-limestone-card border border-graphite-border rounded-lg overflow-x-auto">
          {statusTabs.map((tab) => {
            const isSelected =
              (!currentStatus && tab.value === "all") ||
              currentStatus === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => applyFilters(tab.value, undefined)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-petrol text-pure-white shadow-xs"
                    : "text-graphite-muted hover:text-graphite hover:bg-limestone-light"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative min-w-[280px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-graphite-subtle">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company, or ref..."
            className="w-full pl-9 pr-8 py-2 bg-limestone-card border border-graphite-border rounded-lg text-xs text-graphite placeholder:text-graphite-subtle/70 focus:outline-none focus:ring-1 focus:ring-copper focus:border-copper transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-graphite-subtle hover:text-graphite"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
