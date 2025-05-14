import * as Yup from 'yup';

const UserLogInSchema = Yup.object({

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


});

export default UserLogInSchema;
