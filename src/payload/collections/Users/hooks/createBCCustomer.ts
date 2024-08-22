import type { BeforeChangeHook } from 'payload/dist/collections/config/types'

import { createNewBCCustomer } from '../../../bc/endpoints/createNewCutomer'
import { fetchCustomersFromBC } from '../../../bc/endpoints/fetchCustomersFromBC'

export const createBCCustomer: BeforeChangeHook = async ({ req, data, operation }) => {
  if (operation === 'create' && !data.bcCustomerID && data.roles !== 'admin') {
    try {
      const customerByEmail = await fetchCustomersFromBC({ filters: { E_Mail: data.email } });

      if (customerByEmail) {
        return {
          ...data,
          bcCustomerID: customerByEmail.value[0].No,
        }
      }

      const customerByPhone = await fetchCustomersFromBC({ filters: { Phone_No: data.phoneNumber } });

      if (customerByPhone) {
        return {
          ...data,
          bcCustomerID: customerByPhone.value[0].No,
        }
      }

      const payload = {
        Name: data.name,
        Phone_No: data.phoneNumber,
        E_Mail: data.email,
        Customer_Disc_Group: 'CASH',
        Customer_Posting_Group: 'TRADE',
        Gen_Bus_Posting_Group: 'LOCAL',
        VAT_Bus_Posting_Group: 'LOCAL',
        Payment_Terms_Code: 'CASH',
      }

      const newBCCustomer = await createNewBCCustomer(payload);

      return {
        ...data,
        bcCustomerID: newBCCustomer.No,
      }
    } catch (error: unknown) {
      req.payload.logger.error(`Error creating BC customer: ${error}`)
      throw new Error('We are having difficulties creating your account. Please try again or contact customer care for help');
    }
  }

  return data
}
