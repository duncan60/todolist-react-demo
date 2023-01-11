import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { 
  authLogin,
  selectAuth,
} from "../store/authSlice";

const LoginPage = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const auth = useSelector(selectAuth);
  console.log('[LoginPage] auth:', auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[LoginPage] useEffect auth:', auth);
    if (auth?.token.length) {
      navigate('/todos');
    }
  }, [navigate, dispatch, auth]);

  const handleClick = async () => {
    if (!userName.length|| !password.length) {
      return;
    }
    await dispatch(authLogin({
      username: userName,
      password: password,
    }));
  };

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label={'帳號'}
          value={userName}
          placeholder={'請輸入帳號'}
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label={'密碼'}
          value={password}
          placeholder={'請輸入密碼'}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
