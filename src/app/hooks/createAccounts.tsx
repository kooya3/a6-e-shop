
import type { Dispatch, SetStateAction } from 'react';
import type { AxiosRequestConfig } from "axios"
import axios from "axios";


const username = ''
const password = ''
const token = Buffer.from(`${username}:${password}`).toString('base64');

interface Customer {
          "Name": string,
          "Phone_No":string,
          "E_Mail": string,
          "Customer_Price_Group": string,
          "Customer_Disc_Group": string,
          "Customer_Posting_Group": string,
          "Gen_Bus_Posting_Group": string,
          "VAT_Bus_Posting_Group": string,
          "Payment_Terms_Code": string,
}

const config: AxiosRequestConfig = {
  headers: {
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
  },
};

export async function addNewCustomer(customer: Customer): Promise<void> {
  const res = axios.post("https://bctest.dayliff.com:7048/BC160/ODataV4/Company('KENYA')/Customer_Card", customer, config);

  try {
    if (res) {
    console.log("New customer created in BC")
  } else {
     console.log("Failed to create customer in BC")
  }
  } catch (error:unknown) {
    if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Unknown error occurred.");
  }
  }
}
 
export async function getExistingCustomer(filterValue: string): Promise<boolean> {
  const filter = `$filter=Phone_No eq '${filterValue}'`;

  try {
  const res = await axios.get(`https://bctest.dayliff.com:7048/BC160/ODataV4/Company('KENYA')/Customer_Card?${filter}`, config);
  if (res.data.value.length > 0) {
    console.log("User already exists in BC", res.data);
    return true;
  } else {
    console.log("No customer found with the given details.");
    return false;
  }
} catch (error:unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Unknown error occurred.");
  }
  return false;
}
}

export async function addNewCustomerIfNonExist(customer: Customer, success:Dispatch<SetStateAction<string | null>>, error:Dispatch<SetStateAction<string | null>>): Promise<void> {
  const { Phone_No } = customer;
  const customerExistsByPhone: boolean = await getExistingCustomer(Phone_No)

  try {
    if (customerExistsByPhone) {
    error("Customer already exists in BC")
    console.log("User exists in BC no need to add ")
  } else {
    success("Customer nonExistent, creating a customer in BC")
    console.log("User doesn't exist in BC, needs to be created")
    addNewCustomer(customer)
  }
  } catch (e:unknown) {
    if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error("Unknown error occurred.");
  }
  }
}
