'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { parsePhoneNumber } from 'libphonenumber-js'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  name: string
  email: string
  phoneNumber: string
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

  const validatePhoneNumber = (value: string) => {
    if (!value.startsWith('+')) {
      return 'Phone number must start with a country code (e.g, +254 for Kenya)'
    }

    try {
      const phoneNumber = parsePhoneNumber(value)
      return phoneNumber.isValid() || 'Please enter a valid phone number'
    } catch (error) {
      return 'Please enter a valid phone number'
    }
  }

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify({ ...data, phoneNumber: data.phoneNumber.replace('+', '') }),
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

      try {
        await login(data)
        if (redirect) router.push(redirect as string)
        else router.push(`/account?success=${encodeURIComponent('Account created successfully')}`)
      } catch (_) {
        setLoading(false)
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
        placeholder="Password must be at least 8 characters long"
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
        label={loading ? 'Creating account' : 'Create account'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />
      <div>
        {'Already have an account? '}
        <Link
          href={`/login${allParams}`}
          className="text-[var(--blue-9)] hover:text-[var(--blue-10)] hover:underline hover:decoration[var(--blue-4)]"
        >
          Login
        </Link>
      </div>
    </form>
  )
}

export default CreateAccountForm
