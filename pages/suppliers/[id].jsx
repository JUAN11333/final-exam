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

export async function getServerSideProps({ params }) {
  console.debug("params", params);
  const res = await fetch(
    `http://localhost:3000/api/supplier/article/${params.id}`
  );
  const supplier = await res.json();
  console.debug("supplier 1", supplier);
  return { props: { supplier } };
}
