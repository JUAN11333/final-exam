import Head from "next/head";
import Link from "next/link";

export default function Home({ suppliers }) {
  function deleteSupplier(id) {
    fetch(`/api/supplier/article/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // alert("Deleting " + id)
        window.location.reload(false);
      });
  }

  return (
    <>
      <Head>
        <title>Suppliers</title>
      </Head>
      <h1>Suppliers</h1>
      <p style={{ margin: "0.4rem" }}>
        <Link href="/suppliers/add">+New Supplier</Link>
      </p>
      <table>
        <thead>
          <tr>
            <th style={{ width: "20rem" }}>Supplier Name</th>
            <th style={{ width: "10rem" }}>Adress</th>
            <th style={{ width: "10rem" }}>Phone Number</th>
            <th style={{ width: "10rem" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => {
            return (
              <tr key={supplier._id}>
                <td style={{ textAlign: "center" }}>
                  <Link href={`/suppliers/${supplier._id}`}>
                    {supplier.supplier_name}
                  </Link>
                </td>
                <td style={{ textAlign: "center" }}>{supplier.adress}</td>
                <td style={{ textAlign: "center" }}>{supplier.phone_number}</td>
                <td style={{ textAlign: "center" }}>
                  {
                    <>
                      <Link href={`/suppliers/update/${supplier._id}`}>
                        Update
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <button onClick={() => deleteSupplier(supplier._id)}>
                        Delete
                      </button>
                    </>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/supplier/article/`);
  const suppliers = await res.json();

  return { props: { suppliers } };
}
