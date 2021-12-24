import { gql, useMutation } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { AuthTextInput, onNext } from '../components/auth/AuthShared';
import { LOG_IN } from '../constants';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) {
      navigation.navigate(LOG_IN, {
        username,
        password,
      });
    }
  };
  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register('firstName', { required: true });
    register('lastName', { required: true });
    register('username', { required: true });
    register('email', { required: true });
    register('password', { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        style={{
          width: '100%',
        }}
        behavior='padding'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
      >
        <AuthTextInput
          placeholder='First Name'
          returnKeyType='next'
          onSubmitEditing={() => onNext(lastNameRef)}
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          onChangeText={(text) => setValue('firstName', text)}
        />
        <AuthTextInput
          ref={lastNameRef}
          placeholder='Last Name'
          returnKeyType='next'
          onSubmitEditing={() => onNext(usernameRef)}
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          onChangeText={(text) => setValue('lastName', text)}
        />
        <AuthTextInput
          ref={usernameRef}
          placeholder='Username'
          autoCapitalize='none'
          returnKeyType='next'
          onSubmitEditing={() => onNext(emailRef)}
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          onChangeText={(text) => setValue('username', text)}
        />
        <AuthTextInput
          ref={emailRef}
          placeholder='Email'
          autoCapitalize='none'
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={() => onNext(passwordRef)}
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          onChangeText={(text) => setValue('email', text)}
        />
        <AuthTextInput
          ref={passwordRef}
          placeholder='Password'
          placeholderTextColor='gray'
          secureTextEntry
          returnKeyType='done'
          onChangeText={(text) => setValue('password', text)}
          onSubmitEditing={handleSubmit(onValid)}
        />
        <AuthButton
          text='Create Account'
          disabled={false}
          onPress={handleSubmit(onValid)}
        />
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}
