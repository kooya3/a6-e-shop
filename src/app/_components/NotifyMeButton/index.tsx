'use client'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

import { Product } from '../../../payload/payload-types'
import { useAuth } from '../../_providers/Auth'
import { Button, Props } from '../Button'
import { Input } from '../Input'

type FormData = {
  email: string
}

export const NotifyMeButton: React.FC<{
  product: Product
  className?: string
  appearance?: Props['appearance']
}> = props => {
  const { user } = useAuth()
  const [isNotified, setIsNotified] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: user?.email,
    },
  })

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true)
      await fetch('/api/productNotifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productID: props.product.id,
          email: data.email,
        }),
      })
      setIsNotified(true)
      setIsLoading(false)
    },
    [props.product.id],
  )

  return (
    <>
      <Button
        type="button"
        label="Notify Me When in Stock"
        el="button"
        appearance="secondary"
        onClick={() => setIsOpen(true)}
      />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
              {!isNotified && (
                <>
                  <div className="flex justify-end">
                    <CloseButton>X</CloseButton>
                  </div>
                  <DialogTitle className="font-bold text-lg">
                    Would you like to be notified when this product is back in stock?
                  </DialogTitle>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <Input
                      name="email"
                      label="Email Address"
                      required
                      register={register}
                      error={errors.email}
                      type="email"
                      placeholder="Enter your email"
                      pattern="^[a-zA-Z\s]+$"
                    />
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        label={loading ? 'Processing' : 'Notify Me'}
                        disabled={loading}
                        appearance="primary"
                        className="w-full"
                      />
                      <Button
                        type="button"
                        label="Cancel"
                        disabled={loading}
                        appearance="secondary"
                        className="w-full"
                      />
                    </div>
                  </form>
                </>
              )}

              {isNotified && (
                <p>Thank you! You will be notified when the product is back in stock</p>
              )}
            </DialogPanel>
          </div>
        </DialogBackdrop>
      </Dialog>
    </>
  )
}
