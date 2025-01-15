import ProductForm from "@/components/ProductForm";
import Layout from "@/app/admin/layout";

export default function NewProduct() {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
    </Layout>
  );
}