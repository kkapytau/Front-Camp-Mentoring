import AddBlogForm from '../components/blogForm/addBlog';
import LoginForm from '../components/loginForm/loginForm';
import RegisterForm from '../components/registerForm/registerForm';
import Wrapper from '../components/app/wrapper';

export default [
  {
    path: '/',
    exact: true,
    component: LoginForm
  },
  {
    path: '/signup',
    exact: false,
    component: RegisterForm
  },
  {
    path: '/add-blog',
    exact: false,
    component: AddBlogForm
  },
  {
    path: '/blogs',
    exact: false,
    component: Wrapper
  }
];