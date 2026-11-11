import React from "react";
import Link from "next/link";
import {
  Edit,
  ExternalLink,
  Info,
} from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductStatusBadge } from "@/components/admin/ProductStatusBadge";
import { getProductsAdmin } from "@/services/cms-products.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Product Catalog Management | Orbion Admin",
};

export default async function AdminProductsPage() {
  const session = await requireAdminSession("cms:read", "/admin/products");
  const products = await getProductsAdmin();

  return (
    <>
      <AdminHeader
        title="Orbion Software Products Catalog"
        description="Manage the 7 planned SaaS software products of the Orbion ecosystem."
        role={session.profile.role}
        fullName={session.profile.fullName}
      />

      <main className="p-8 space-y-6">
        {/* Compliance Notice Banner */}
        <div className="p-4 rounded-xl bg-copper-subtle/50 border border-copper/30 flex items-start gap-3">
          <Info className="w-4 h-4 text-copper shrink-0 mt-0.5" />
          <div className="text-xs text-graphite space-y-1">
            <p className="font-semibold text-copper-hover">
              Strict Product Status & Content Integrity Policy
            </p>
            <p className="text-graphite-muted leading-relaxed">
              These are planned software products. They must not be presented as launched or fully available unless officially authorized. Preserving honest &quot;Coming Soon&quot; notices protects Orbion&apos;s brand reputation and regulatory compliance.
            </p>
          </div>
        </div>

        {/* Products Grid / Table */}
        <div className="bg-limestone-card rounded-xl border border-graphite-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-limestone-light/60 font-mono uppercase text-[10px] tracking-wider text-graphite-muted border-b border-graphite-border">
                <tr>
                  <th className="px-6 py-3">No.</th>
                  <th className="px-6 py-3">Product Name & Category</th>
                  <th className="px-6 py-3">Headline</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Status Notice</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-border/60">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-limestone-light/40 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-copper text-sm">
                      {product.number}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-graphite text-sm">{product.name}</p>
                      <span className="font-mono text-[11px] text-graphite-subtle">
                        {product.category} ({product.categoryGroup})
                      </span>
                    </td>
                    <td className="px-6 py-4 text-graphite max-w-[280px]">
                      {product.headline}
                    </td>
                    <td className="px-6 py-4">
                      <ProductStatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-graphite-muted max-w-[220px] truncate">
                      {product.statusNotice || "In active development."}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 p-1.5 text-graphite-subtle hover:text-graphite rounded transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-copper hover:text-copper-hover bg-copper-subtle/50 rounded border border-copper/20 transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
