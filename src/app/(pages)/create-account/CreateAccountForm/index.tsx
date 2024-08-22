'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'
import { addNewCustomerIfNonExist } from '../../../hook/createAccounts'

import classes from './index.module.scss'

type FormData = {
  name: string
  email: string
  phoneNumber: number
  password: string
  passwordConfirm: string

  
}

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      if (response.ok) {
        addNewCustomerIfNonExist(
          {
          "Name": data.name,
          "Phone_No": data.phoneNumber.toString(),
          "E_Mail": data.email,
          "Customer_Price_Group":"RETAIL MKT",
          "Customer_Disc_Group":"CASH",
          "Customer_Posting_Group":"TRADE",
          "Gen_Bus_Posting_Group":"LOCAL",
          "VAT_Bus_Posting_Group":"LOCAL",
          "Payment_Terms_Code":"CASH",
          },
          setSuccess,
          setError
        )
        // getExistingCustomer(
        //   "254722679275"
        // )
      }

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) router.push(redirect as string)
        else router.push(`/`)
      window.location.href = '/'
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} success={success} className={classes.message} />
      <Input
        name="email"
        label="Email Address"
        required
        register={register}
        error={errors.email}
        type="email"
        placeholder="Enter your email"
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
      />
      <Input
        name="name"
        label="Full Name"
        required
        register={register}
        error={errors.name}
        type="text"
        placeholder="Enter your full name"
        pattern="^[a-zA-Z\s]+$"
      />
      <Input
        name="phoneNumber"
        label="Phone Number"
        required
        register={register}
        error={errors.phoneNumber}
        type="text"
        placeholder="072200000"
        pattern="^(07|01)\d{8}$"
      />
      
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
        placeholder='Password must be at least 8 characters long'
        pattern=".*" // Add the pattern property with a valid regular expression to enforce a password policy.
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
        required
        register={register}
        validate={value => value === password.current || 'The passwords do not match'}
        error={errors.passwordConfirm}
        pattern=".*" // Add the pattern property with a valid regular expression
        placeholder="Enter your password again"
      />
      <Button
        type="submit"
        label={loading ? 'Processing' : 'Sign Up'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />
      <div>
        {'Already have an account? '}
        <Link href={`/login${allParams}`}>Login</Link>
      </div>
    </form>
  )
}

export default CreateAccountForm
