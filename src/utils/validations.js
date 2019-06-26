import { object, string, ref, date, array } from "yup";
import axios from "axios";
import { BASE_API_URL } from "../constants";

axios.defaults.baseURL = BASE_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

const phoneRegExp = /^\d{10,12}$/;
const usernameRegExp = /^[a-zA-Z]+(?:[_]?[a-zA-Z0-9])*$/;
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const emailSchema = string().email();

const signUpSchema = object().shape({
  first_name: string().required("Enter first name"),
  last_name: string().required("Enter last name"),
  // username: string()
  //   // .required("Enter username")
  //   .matches(usernameRegExp, "Invalid username"),
  password: string()
    .required("Enter a password")
    .min(8, "Too Short!")
    // .matches(passwordRegExp, "Not strong enough")
    .notOneOf(
      [ref("fist_name"), ref("last_name"), ref("username")],
      "Can't be same as other values"
    ),
  // phone: string()
  //   // .required("Enter phone number")
  //   .min(10, "Minimum 10 digits")
  //   .max(10, "Maximum 10 digits")
  //   .matches(phoneRegExp, "Invalid"),
  email: string()
    .required("Enter email")
    .email("Invalid Email")
  // .test("is-email-unique", "Email already taken", function(value) {
  //   if (emailSchema.isValidSync(value)) {
  //     axios
  //       .post(`emailcheck`, { email: value })
  //       .then(res => {
  //         if (res.status == 200) {
  //           console.log(res);
  //           return false;
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //     return true;
  //   }
  // })
});

const loginSchema = object().shape({
  password: string().required("Enter a password"),
  email: string()
    .required("Enter email")
    .email("Invalid Email")
});

const changePasswordSchema = object().shape({
  passwordOld: string().required("Required"),
  newpassword: string()
    .required("Required")
    .min(8, "Too Short!")
    .matches(passwordRegExp, "Not strong enough"),
  passwordConfirm: string()
    .oneOf([ref("newpassword"), null], "Passwords don't match")
    .required("Required")
});

const createProjectSchema = object().shape({
  title: string().required("Enter title"),
  vision: string().required("Enter vision"),
  schedule: array().of(
    object().shape({
      timeline: date("Invalid Date")
        .transform((value, originalValue) => {
          return originalValue === "" ? undefined : value;
        })
        .min(new Date(), "Needs to after current date")
        .nullable()
        .notRequired()
    })
  )
});

const updateProfileSchema = object().shape({
  first_name: string().required("Enter first name"),
  last_name: string().required("Enter last name"),
  about: string().max(150, "Maximum 150 characters"),
  phone: string()
    // .required("Enter phone number")
    .nullable()
    .min(10, "Minimum 10 digits")
    .max(10, "Maximum 10 digits")
    .matches(phoneRegExp, "Invalid phone numer.")
  // email: string()
  //   .required("Enter email")
  //   .email("Invalid Email")
});

const createEventSchema = object().shape({
  eventName: string().required("Enter event name"),
  date:  date("Invalid Date").nullable().required("Enter date and time"),
  venue: string().required("Enter venue"),
  about: string().max(200, "Maximum 200 characters")
  // vision: string().required("Enter vision"),
  // schedule: array().of(
  //   object().shape({
  //     timeline: date("Invalid Date")
  //       .transform((value, originalValue) => {
  //         return originalValue === "" ? undefined : value;
  //       })
  //       .min(new Date(), "Needs to after current date")
  //       .nullable()
  //       .notRequired()
  //   })
  // )
});

export {
  loginSchema,
  signUpSchema,
  changePasswordSchema,
  createProjectSchema,
  updateProfileSchema,
  createEventSchema
};
