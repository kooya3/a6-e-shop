'use client'
import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { Category } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Checkbox } from '../../../_components/Checkbox'
import { useFilter } from '../../../_providers/Filter'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filters({ categories }: { categories: Category[] }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { categoryFilters, setCategoryFilters } = useFilter()

  const handleCategories = (categoryId: string) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId)
      setCategoryFilters(updatedCategories)
    } else {
      setCategoryFilters([...categoryFilters, categoryId])
    }
  }

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <Disclosure as="div" className="border-t border-gray-200 pb-4 pt-4 px-4">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                        <span className="text-sm font-medium text-gray-900">Categories</span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-5 w-5 transform',
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="px-4 pb-2 pt-4">
                        {categories.map(category => {
                          const isSelected = categoryFilters.includes(category.id)

                          return (
                            <Checkbox
                              key={category.id}
                              label={category.title}
                              value={category.id}
                              isSelected={isSelected}
                              onClickHandler={handleCategories}
                            />
                          )
                        })}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <aside>
        <h2 className="sr-only">Filters</h2>

        <div className="flex items-center lg:hidden py-4">
          <Button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            appearance="primary"
            className="flex-grow"
          >
            <span>Filters</span>
            <PlusIcon aria-hidden="true" />
          </Button>
        </div>

        {!mobileFiltersOpen && (
          <div className="hidden lg:block">
            <h4 className="text-sm py-2">Categories</h4>
            {categories.map(category => {
              const isSelected = categoryFilters.includes(category.id)

              return (
                <Checkbox
                  key={category.id}
                  label={category.title}
                  value={category.id}
                  isSelected={isSelected}
                  onClickHandler={handleCategories}
                />
              )
            })}
          </div>
        )}
      </aside>
    </div>
  )
}
