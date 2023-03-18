import Head from "next/head";
import Link from "next/link";

export default function Supplier({ supplier }) {
  console.log("supplier 2", supplier);
  if (!supplier)
    return (
      <div>
        <p>Supplier not found</p>
        <Link href="/suppliers">Back</Link>
      </div>
    );

  return (
    <>
      <Head>
        <title>{supplier.title}</title>
      </Head>
      <h1>{supplier.supplier_name}</h1>
      <p>{supplier.adress}</p>
      <p>{supplier.phone_number}</p>
      <Link href="/suppliers">Back</Link>
    </>
  );
}

import axios from "axios";

export async function getServerSideProps({ params }) {
  console.debug("params", params);
  try {
    const response = await axios.get(
      `http://final-exam-6218207.vercel.app/api/supplier/article/${params.id}`
    );
    const supplier = response.data;
    console.debug("supplier 1", supplier);
    return { props: { supplier } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
