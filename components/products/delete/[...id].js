// import Layout from "@/components/Layout";
// import {useRouter} from "next/router";
// import {useEffect, useState} from "react";
// import axios from "axios";

// export default function DeleteProductPage() {
//   const router = useRouter();
//   const [productInfo,setProductInfo] = useState();
//   const {id} = router.query;
//   useEffect(() => {
//     if (!id) {
//       return;
//     }
//     axios.get('/api/products?id='+id).then(response => {
//       setProductInfo(response.data);
//     });
//   }, [id]);
//   function goBack() {
//     router.push('/products');
//   }
//   async function deleteProduct() {
//     await axios.delete('/api/products?id='+id);
//     goBack();
//   }
//   return (
//     <Layout>
//       <h1 className="text-center">Do you really want to delete
//         &nbsp;&quot;{productInfo?.title}&quot;?
//       </h1>
//       <div className="flex gap-2 justify-center">
//         <button
//           onClick={deleteProduct}
//           className="btn-red">Yes</button>
//         <button
//           className="btn-default"
//           onClick={goBack}>
//           NO
//         </button>
//       </div>
//     </Layout>
//   );
// }
import Layout from "@/app/admin/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/products?id=' + id)
      .then(response => {
        setProductInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        alert('Failed to load product details. Please try again later.');
      });
  }, [id]);

  function goBack() {
    router.push('/products');
  }

  async function deleteProduct() {
    try {
      await axios.delete('/api/products?id=' + id);
      goBack();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product. Please try again later.');
    }
  }

  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete
        &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="btn-red">Yes</button>
        <button
          className="btn-default"
          onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
