import Head from "next/head";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Supplier({ supplier }) {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");

  useEffect(() => {
    reset(supplier);
  }, []);

  const updateSupplier = async (data) => {
    const response = await fetch(`/api/supplier/article/${supplier._id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },

      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.error) {
      alert("Error: " + result.error);
    } else {
      alert("Supplier updated");
      window.location.href = "/suppliers";
    }
    console.log(result);
    setData(JSON.stringify(data));
  };

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
        <title>Update{supplier.title}</title>
      </Head>

      <div style={{ margin: "1rem" }}>
        <Link href="/suppliers">Back</Link>
        <form onSubmit={handleSubmit(updateSupplier)}>
          <h1>Update Supplier</h1>
          <label htmlFor="supplier_name">Supplier Name</label>
          <br />
          <input
            id="supplier_name"
            {...register("supplier_name", { required: true })}
            placeholder="Supplier Name"
          />
          <br />

          <label htmlFor="address">Adress</label>
          <br />
          <input
            id="adress"
            {...register("adress", { required: true })}
            placeholder="Adress"
          />
          <br />

          <label htmlFor="phone_number">Phone Number</label>
          <br />
          <input
            id="phone_number"
            {...register("phone_number", { required: true })}
            placeholder="Phone Number"
          />
          <br />

          <input type="submit" />
          <p>{data}</p>
          <br />
        </form>
      </div>
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
