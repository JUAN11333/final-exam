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

      <div style={{ backgroundColor: "#F4F4F4", padding: "2rem" }}>
        <h1 style={{ color: "#7f7f7f", textAlign: "center" }}>Suppliers</h1>
        <p style={{ margin: "0.4rem" }}>
          <Link href="/suppliers/add">
            <button
              style={{
                backgroundColor: "#7f7f7f",
                color: "#FFF",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              + New Supplier
            </button>
          </Link>
        </p>
        <table
          style={{
            backgroundColor: "#FFF",
            borderCollapse: "collapse",
            marginTop: "1rem",
            width: "100%",
          }}
        >
          <thead style={{ backgroundColor: "#F4F4F4", textAlign: "center" }}>
            <tr>
              <th
                style={{ width: "20rem", padding: "1rem", fontWeight: "bold" }}
              >
                Supplier Name
              </th>
              <th
                style={{ width: "10rem", padding: "1rem", fontWeight: "bold" }}
              >
                Adress
              </th>
              <th
                style={{ width: "10rem", padding: "1rem", fontWeight: "bold" }}
              >
                Phone Number
              </th>
              <th
                style={{ width: "10rem", padding: "1rem", fontWeight: "bold" }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => {
              return (
                <tr
                  key={supplier._id}
                  style={{ borderBottom: "1px solid #F4F4F4" }}
                >
                  <td style={{ textAlign: "center", padding: "1rem" }}>
                    <Link href={`/suppliers/${supplier._id}`}>
                      {supplier.supplier_name}
                    </Link>
                  </td>
                  <td style={{ textAlign: "center", padding: "1rem" }}>
                    {supplier.adress}
                  </td>
                  <td style={{ textAlign: "center", padding: "1rem" }}>
                    {supplier.phone_number}
                  </td>
                  <td style={{ textAlign: "center", padding: "1rem" }}>
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
      </div>
    </>
  );
}

import axios from "axios";
export async function getServerSideProps() {
  const response = await axios.get(
    `http://final-exam-6218207.vercel.app/api/supplier/article/`
  );
  const suppliers = response.data;

  return { props: { suppliers } };
}
