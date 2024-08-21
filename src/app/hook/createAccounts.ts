import axios, {AxiosRequestConfig} from "axios";


const username: string = 'davisapi'
const password: string = 'zheghH5w631+AQ8GkKK6AMTEHGaPHP23aK8okWWQmGE='
const token: string = Buffer.from(`${username}:${password}`).toString('base64');

const config: AxiosRequestConfig = {
  headers: {
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/json',
  },
};

export async function addNewCustomer(customer: object) {
  const res = axios.post("https://bctest.dayliff.com:7048/BC160/ODataV4/Company('KENYA')/Customer_Card", customer, config);

  try {
    if (res) {
    console.log("New customer created in BC")
  } else {
     console.log("Failed to create customer in BC")
  }
  } catch (error) {
    console.log("The error ", error.message)
  }
}
 
export async function getExistingCustomer(filterValue: string) {
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
} catch (error) {
  console.log("The error...", error.message);
  return false;
}
}

export async function addNewCustomerIfNonExist(customer: any, success:any, error:any) {
  const { Phone_No } = customer;
  const customerExistsByPhone: any = await getExistingCustomer(Phone_No)

  try {
    if (customerExistsByPhone) {
    error("Customer already exists in BC")
    console.log("User exists in BC no need to add ")
  } else {
    success("Customer nonExistent, creating a customer in BC")
    console.log("User doesn't exist in BC, needs to be created")
    addNewCustomer(customer)
  }
  } catch (error) {
    console.log("The error...", error.message)
  }
}

