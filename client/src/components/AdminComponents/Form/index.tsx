import axios from "axios";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";

import "./form.scss";

const Form = () => {
  const token = window.localStorage.getItem("accessToken");
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      quantity: 0,
      img: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be less than 30 chars!!")
        .required("Required!!"),
      price: Yup.number().required("Required!!"),
      quantity: Yup.number().required("Required!!"),
      img: Yup.string().required("Required!!"),
      description: Yup.string().max(3000, "Must be less than 300 chars!!"),
    }),
    onSubmit: (values) => {
      alert("Added a new product");
      console.log("values: ", values);
      axios.post("http://localhost:3030/api/v1/products", values, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    },
  });

  const handleSubmit = () => {};

  return (
    <div className="formContainer">
      <h1>Adding new product</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="input__container">
          <label>Name</label>
          <input
            autoComplete="off"
            type="text"
            id="name"
            placeholder="Product name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <p style={{ color: "red" }}>{formik.errors.name}</p>
          ) : null}
          <label>Price (€)</label>
          <input
            autoComplete="off"
            type="text"
            id="price"
            placeholder="Price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {formik.errors.price ? (
            <p style={{ color: "red" }}>{formik.errors.price}</p>
          ) : null}
          <label>Quantity</label>
          <input
            autoComplete="off"
            type="text"
            id="quantity"
            placeholder="Quantity"
            onChange={formik.handleChange}
            value={formik.values.quantity}
          />
          <label>Img</label>
          <input
            autoComplete="off"
            type="text"
            id="img"
            placeholder="Image link of product "
            onChange={formik.handleChange}
            value={formik.values.img}
          />
          <label>Description</label>
          <textarea
            autoComplete="off"
            id="description"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description ? (
            <p style={{ color: "red" }}>{formik.errors.description}</p>
          ) : null}
          {/* <input
            autoComplete="off"
            type="text"
            id="categories"
            placeholder="Categories"
            onChange={(e) => setName(e.target.valueAsArray)}
            value={name}
          /> */}
          <div className="button__area">
            <Button type="submit" variant="contained" className="form__button">
              Add new product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
