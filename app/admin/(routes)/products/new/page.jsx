import ProductForm from "@/components/ProductForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function NewProduct() {
  return (
    <DefaultLayout>
      <h1>New Product</h1>
      <ProductForm />
    </DefaultLayout>
  );
}