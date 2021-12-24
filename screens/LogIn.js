import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar, logUserIn } from '../apollo';
import AuthButton from '../components/auth/AuthButton';
import { AuthTextInput, onNext } from '../components/auth/AuthShared';
import AuthLayout from '../components/auth/AuthLayout';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = ({ route: { params } }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      password: params?.password,
      username: params?.username,
    },
  });
  const passwordRef = useRef(null);
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register('username', { required: true });
    register('password', { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <AuthTextInput
        value={watch('username')}
        placeholder='Username'
        returnKeyType='next'
        autoCapitalize='none'
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue('username', text)}
      />
      <AuthTextInput
        value={watch('password')}
        ref={passwordRef}
        placeholder='Password'
        secureTextEntry
        returnKeyType='done'
        lastOne={true}
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue('password', text)}
      />
      <AuthButton
        text='Log In'
        disabled={!watch('username') || !watch('password')}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default Login;
