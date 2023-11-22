import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/userReducer';

const BasicForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        name: false,
        password: false,
        confirmPassword: false,
        mobile: false,
        email: false,
    });

    const validateForm = () => {
        const newErrors = {
            name: formData.name === '',
            password: formData.password === '',
            confirmPassword: formData.confirmPassword !== formData.password,
            mobile: !/^\d{10}$/.test(formData.mobile),
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some((error) => error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
   const {name, password, confirmPassword, mobile, email } = formData;

   if(name && password && confirmPassword && mobile &&  email){
    const res = await fetch(
        "https://fir-dba28-default-rtdb.firebaseio.com/demoProject.json",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                password,
                confirmPassword,
                mobile,
                email,
            })
        } 
    )


    if(res){
        setFormData({
            name: '',
            password: '',
            confirmPassword: '',
            mobile: '',
            email: '', 
        })
        alert("Data Store Successfully.")
    }
   }else{
         alert("Please fill all data");
   }
        
        // if (validateForm()) {
        //   console.log('Form submitted:', formData);
        //   dispatch(login(formData))

        // } else {
        //   console.log('Form validation failed');
        // }

        const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    // Set errors and prevent form submission if there are errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Form is valid, you can proceed with storing the data or any other action
      console.log('Form data submitted:', formData);
    }
    };

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors({ ...errors, [field]: false });
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    Basic Form
                </Typography>
                <form onSubmit={handleSubmit} method='POST'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.name}
                                label="Name"
                                fullWidth
                                variant="outlined"
                                value={formData.name}
                                onChange={handleChange('name')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.password}
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                value={formData.password}
                                onChange={handleChange('password')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.confirmPassword}
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                value={formData.confirmPassword}
                                onChange={handleChange('confirmPassword')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.mobile}
                                label="Mobile"
                                fullWidth
                                variant="outlined"
                                value={formData.mobile}
                                onChange={handleChange('mobile')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.email}
                                label="Email"
                                fullWidth
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange('email')}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default BasicForm;
