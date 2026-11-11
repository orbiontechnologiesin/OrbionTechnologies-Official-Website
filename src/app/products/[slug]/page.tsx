import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PRODUCT_DETAILS } from "@/lib/product-detail-data";
import { getPublicProductBySlug } from "@/services/cms-products.service";
import { ProductHero } from "@/components/products/detail/ProductHero";
import { ProductStatus } from "@/components/products/detail/ProductStatus";
import { ProductOverview } from "@/components/products/detail/ProductOverview";
import { ProductProblem } from "@/components/products/detail/ProductProblem";
import { ProductAudience } from "@/components/products/detail/ProductAudience";
import { ProductFeatures } from "@/components/products/detail/ProductFeatures";
import { ProductWorkflow } from "@/components/products/detail/ProductWorkflow";
import { ProductVision } from "@/components/products/detail/ProductVision";
import { ProductCTA } from "@/components/products/detail/ProductCTA";
import { ProductNavigation } from "@/components/products/detail/ProductNavigation";

export function generateStaticParams() {
  return PRODUCT_DETAILS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Orbion Technologies",
    };
  }

  const isComingSoon = product.status === "COMING SOON";
  const statusSuffix = isComingSoon ? " (Coming Soon)" : "";

  return {
    title: `${product.name} — ${product.headline} | Orbion Technologies`,
    description: product.supportingDescription,
    openGraph: {
      title: `${product.name}${statusSuffix} | Orbion Technologies`,
      description: product.supportingDescription,
      url: `https://orbiontechnologies.in/products/${product.slug}`,
      siteName: "Orbion Technologies",
      type: "website",
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-limestone-light">
        <ProductHero product={product} />
        <ProductStatus
          statusNotice={product.statusNotice}
          stage={product.telemetry.stage}
        />
        <ProductOverview
          overview={product.overview}
          productName={product.name}
        />
        <ProductProblem
          problems={product.problems}
          productName={product.name}
        />
        <ProductAudience
          audiences={product.audiences}
          disclaimer={product.audienceDisclaimer}
          productName={product.name}
        />
        <ProductFeatures
          features={product.features}
          productName={product.name}
        />
        <ProductWorkflow
          workflow={product.workflow}
          productName={product.name}
        />
        <ProductVision
          vision={product.vision}
          productName={product.name}
        />
        <ProductCTA closing={product.closing} />
        <ProductNavigation currentSlug={product.slug} />
      </main>
      <Footer />
    </>
  );
}

