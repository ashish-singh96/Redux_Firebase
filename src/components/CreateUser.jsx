import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Box,
    Container,
    CssBaseline,
    createTheme,
    ThemeProvider,
    styled,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducers/userReducer';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const FormContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    textAlign: 'center',
}));


const CreateUser = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (formData.name.length < 3) {
            newErrors.name = 'Name should be at least 3 characters';
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
            valid = false;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Enter a valid 10-digit phone number';
            valid = false;
        }

        if (formData.password.length < 8) {
            newErrors.password = 'Password should be at least 8 characters';
            valid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        
        const isValid = validateForm();
        if (isValid) {
            // Submit the form data (you can add your logic here)
            console.log('Form data:', formData);
            dispatch(login(formData))
            setFormSubmitted(true);
        }


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
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Registration Form
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name !== undefined}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email !== undefined}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={errors.phone !== undefined}
                                    helperText={errors.phone}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password !== undefined}
                                    helperText={errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={errors.confirmPassword !== undefined}
                                    helperText={errors.confirmPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit">
                                    Register
                                </Button>
                            </Grid>
                            {formSubmitted && (
                                <Grid item xs={12}>
                                    <Box mt={2}>
                                        <Typography variant="body1" color="primary">
                                            Registration successful!
                                        </Typography>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </FormContainer>
            </Container>
        </ThemeProvider>

    );
};

export default CreateUser;
