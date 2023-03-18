import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function AddSupplierPage() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const saveSupplier = async (data) => {
    const response = await fetch("/api/supplier/article", {
      method: "POST",
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
      alert("Upplier saved");
      window.location.href = "/suppliers";
    }
    console.log(result);
    setData(JSON.stringify(data));
  };

  return (
    <div style={{ margin: "1rem" }}>
      <Link href="/suppliers">〈Back</Link>
      <form onSubmit={handleSubmit(saveSupplier)}>
        <h1>New Supplier</h1>
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
      </form>
    </div>
  );
}
