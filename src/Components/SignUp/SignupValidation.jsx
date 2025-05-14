import * as Yup from 'yup';

const UserSignUPSchema = Yup.object({
    name: Yup.string()
        .matches(/^[A-Za-z\s]{2,}$/, 'Name can only contain letters and spaces.')
        .min(3, 'Name must be at least 3 characters long.')
        .max(50, 'Name cannot exceed 50 characters.')
        .required('Please enter your name.'),

    email: Yup.string()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address (e.g., example@mail.com).'
        )
        .email('Invalid email format.')
        .required('Email is required.'),

    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and include: one uppercase letter, one lowercase letter, one number, and one special character.'
        )
        .required('Password is required.'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required.'),
});

export default UserSignUPSchema;
