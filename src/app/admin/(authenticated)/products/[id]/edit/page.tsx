import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { requireAdminSession } from "@/lib/auth/session";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProductEditForm } from "@/components/admin/ProductEditForm";
import { getProductById } from "@/services/cms-products.service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Product Details | Orbion Admin",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdminSession("cms:read", "/admin/products");
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <AdminHeader
        title={`Edit Catalog: ${product.name}`}
        description={`Product No. ${product.number} • Category: ${product.category} (${product.categoryGroup})`}
        role={session.profile.role}
        fullName={session.profile.fullName}
        actions={
          <div className="flex items-center gap-2.5">
            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite rounded-md text-xs font-mono font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sage" />
              <span>Public Page</span>
            </Link>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-limestone-light border border-graphite-border hover:bg-limestone-card text-graphite rounded-md text-xs font-mono font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-sage" />
              <span>Back to Catalog</span>
            </Link>
          </div>
        }
      />

      <main className="p-8">
        <ProductEditForm product={product} userRole={session.profile.role} />
      </main>
    </>
  );
}

