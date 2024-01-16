import Input from "../../input";

import * as yup from "yup";
import { useFormik } from "formik";
import Button from "../../button";
import { useEffect } from "react";

function FirstStep({ setStep }: any) {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("This field is required"),
    name: yup.string().min(3).required("This field is required"),
    phoneNumber: yup
      .string()
      .length(11, "Must be exactly 11 digits")
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem("name", values.name);
      localStorage.setItem("email", values.email);
      localStorage.setItem("phoneNumber", values.phoneNumber);
      setStep(2);
    },
  });

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    formik.setValues({
      ...formik.values,
      name: storedName || "",
      email: storedEmail || "",
      phoneNumber: storedPhoneNumber || "",
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-3/4 h-[568px] px-20 pt-12 pb-6 rounded-xl">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-3xl w-full text-[#01265A] font-ubuntu-bold mb-2">
          Personal Info
        </p>
        <p className="text-[#01265A] w-full mb-4">
          Please provide your name, email address, and phone number.
        </p>
        <Input
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          handleBlur={formik.handleBlur}
          touched={formik.touched.name}
          placeholder="John Doe"
        />
        <Input
          label="Email Address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          handleBlur={formik.handleBlur}
          touched={formik.touched.email}
          placeholder="JohnDoe@gmail.com"
        />
        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          error={formik.errors.phoneNumber}
          touched={formik.touched.phoneNumber}
          handleBlur={formik.handleBlur}
          placeholder="08012345678"
        />
      </div>
      <div className="flex flex-row items-center justify-end w-full flex-nowrap">
        <Button
          label="Next Step"
          type="primary"
          onClick={() => formik.handleSubmit()}
          disabled={!formik.isValid}
        />
      </div>
    </div>
  );
}

export default FirstStep;
