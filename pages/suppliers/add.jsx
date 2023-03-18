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
      <Link
        href="/suppliers"
        style={{ color: "#555", textDecoration: "underline" }}
      >
        Back
      </Link>
      <form
        onSubmit={handleSubmit(saveSupplier)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "2rem",
        }}
      >
        <h1 style={{ color: "#7f7f7f", textAlign: "center" }}>New Supplier</h1>
        <label htmlFor="supplier_name" style={{ marginTop: "1rem" }}>
          Supplier Name
        </label>
        <br />
        <input
          id="supplier_name"
          {...register("supplier_name", { required: true })}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1.2rem",
            width: "100%",
            marginTop: "0.5rem",
          }}
          placeholder="Supplier Name"
        />
        <br />

        <label htmlFor="address">Adress</label>
        <br />
        <input
          id="adress"
          {...register("adress", { required: true })}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1.2rem",
            width: "100%",
            marginTop: "0.5rem",
          }}
          placeholder="Adress"
        />
        <br />

        <label htmlFor="phone_number">Phone Number</label>
        <br />
        <input
          id="phone_number"
          {...register("phone_number", { required: true })}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontSize: "1.2rem",
            width: "100%",
            marginTop: "0.5rem",
          }}
          placeholder="Phone Number"
        />
        <br />
        <input
          type="submit"
          className="button"
          style={{
            backgroundColor: "#7f7f7f",
            border: "none",
            color: "white",
            padding: "1rem 2rem",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "1rem",
            borderRadius: "5px",
            marginTop: "2rem",
            cursor: "pointer",
          }}
        />
        <p>{data}</p>
      </form>
    </div>
  );
}
