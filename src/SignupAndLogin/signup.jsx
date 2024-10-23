import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const url_api = "http://82.180.145.66/api/v1";

const SignUp = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  // Yup validation schema
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
  });

  // Formik initial values
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
        confirm_password: values.confirmPassword
      };

      const response = await axios.post(`${url_api}/register/`, formData);
      console.log(response);
      toast.success('Successfully signed up!');
      setFormSubmitted(true);
      resetForm();
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);

      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Sign Up</h2>
        <Formik initialValues={initialValues} validationSchema={SignUpSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name Fields Side by Side */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <ErrorMessage name="firstName" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <ErrorMessage name="lastName" component="p" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage name="username" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="flex-1">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 text-white rounded-md ${isSubmitting ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                    } transition-all duration-200`}
                >
                  {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
                <span>Already a User? <Link className='text-blue-600' to={'/login'}>Go to Login</Link></span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;