// Define the interfaces for BCItem and Value
export interface BCItem {
    "@odata.context": string;
    value: Value[];
}

export interface Value {
    "@odata.etag": string;
    No: string;
    Item_Category_Code: string;
    Product_Model: string;
    Description: string;
    Unit_Price: number;
    Item_Disc_Group: string;
    VAT_Prod_Posting_Group: string;
    Inventory: number;
    Gen_Prod_Posting_Group: string;
    Global_Dimension_1_Filter: string;
    Global_Dimension_2_Filter: string;
    Location_Filter: string;
    Drop_Shipment_Filter: string;
    Variant_Filter: string;
    Lot_No_Filter: string;
    Serial_No_Filter: string;
    Unit_of_Measure_Filter: string;
}

// Function to fetch data from Business Central
export async function fetchBCItems(apiUrl: string, token: string): Promise<BCItem> {
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data: BCItem = await response.json();
    return data;
}

// Function to process the fetched data
export function processBCItems(data: BCItem): Value[] {
    return data.value.map(item => ({
        ...item,
        // Add any additional processing logic here if needed
    }));
}