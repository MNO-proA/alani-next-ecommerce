import ProductForm from "@/components/ProductForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title:
    ` Create New Product | ${process.env.SITE_NAME}`,
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function NewProduct() {
  return (
    <DefaultLayout>
      <h1>New Product</h1>
      <ProductForm />
    </DefaultLayout>
  );
}