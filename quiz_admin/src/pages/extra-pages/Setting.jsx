import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import get_setting from 'api/get/get_setting';
import put_bank_setting from 'api/put/put_bank_setting';
import swal from 'sweetalert';

// Validation schema
const validationSchema = Yup.object({
  accountName: Yup.string().required('Tên tài khoản ngân hàng không được để trống'),
  bankName: Yup.string().required('Tên ngân hàng không được để trống'),
  accountNumber: Yup.string()
    .required('Số tài khoản không được để trống')
    .matches(/^[0-9]+$/, 'Số tài khoản phải là số')
});

const SamplePage = () => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      try {
        const result = await get_setting();
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(data);
  const [initialValues, setInitialValues] = useState({
    accountName: data?.account_name,
    bankName: data?.bank_name,
    accountNumber: data?.account_number
  });

  useEffect(() => {
    setInitialValues({
      accountName: data?.account_name,
      bankName: data?.bank_name,
      accountNumber: data?.account_number
    });
  }, [data]);

  const handleSubmit = async (values) => {
    try {
      const result = await put_bank_setting({ ...values });
      if (result?.ok === true) {
        swal('Thông báo ', 'Cập nhật thông tin thành công', 'success');
      }
    } catch (error) {
      console.log('Thông báo', 'Cập nhật thất bại', 'error');
    }
    // Handle form submission
  };

  return (
    <MainCard title="Cài đặt">
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched }) => {
              // Fetch initial values from API and set them in the form
              useEffect(() => {
                setFieldValue('accountName', data?.account_name);
                setFieldValue('accountNumber', data?.account_number);
                setFieldValue('bankName', data?.bank_name);
              }, [data, setFieldValue]);
              return (
                <Form onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h4" align="center">
                      Cài Đặt Tài Khoản Ngân Hàng
                    </Typography>
                    <Field
                      name="accountName"
                      as={TextField}
                      placeholder="Tên Chủ Tài Khoản Ngân Hàng"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.accountName}
                      helperText={<ErrorMessage name="accountName" />}
                      error={touched.accountName && !!errors.accountName}
                    />
                    <Field
                      name="bankName"
                      as={TextField}
                      placeholder="Tên Ngân Hàng"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bankName}
                      helperText={<ErrorMessage name="bankName" />}
                      error={touched.bankName && !!errors.bankName}
                    />
                    <Field
                      name="accountNumber"
                      as={TextField}
                      placeholder="Số Tài Khoản"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.accountNumber}
                      helperText={<ErrorMessage name="accountNumber" />}
                      error={touched.accountNumber && !!errors.accountNumber}
                    />
                    <Button type="submit" variant="contained" color="primary">
                      Cập Nhật
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default SamplePage;
