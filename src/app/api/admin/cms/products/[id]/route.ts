import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/permissions";
import { productUpdateSchema } from "@/lib/validation/cms.schema";
import { getProductById, updateProduct } from "@/services/cms-products.service";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "cms:read")) {
      return NextResponse.json({ success: false, message: "Access denied." }, { status: 403 });
    }

    const { id } = await props.params;
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve product.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Authentication required." }, { status: 401 });
    }

    if (!hasPermission(session.profile.role, "products:update")) {
      return NextResponse.json({ success: false, message: "Access denied. Only Super Admin and Admin can edit product catalog." }, { status: 403 });
    }

    const { id } = await props.params;
    const json = await request.json();
    const result = productUpdateSchema.partial().safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await updateProduct(id, result.data, session.user.id);
    if (!updated.success) {
      return NextResponse.json({ success: false, message: updated.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Product updated successfully.", product: updated.product });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to retrieve product.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
