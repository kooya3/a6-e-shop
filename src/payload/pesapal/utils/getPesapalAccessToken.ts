const PESAPAL_URL = process.env.NEXT_PUBLIC_PESAPAL_URL
const PESAPAL_CONSUMER_KEY = process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_KEY
const PESAPAL_CONSUMER_SECRET = process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET

interface PesapalAuthToken {
  token: string;
  expiryDate: string;
  error: null,
  status: string;
  message: string;
}

const payload = {
  consumer_key: PESAPAL_CONSUMER_KEY,
  consumer_secret: PESAPAL_CONSUMER_SECRET,
}

export async function getPesapalAccessToken(): Promise<PesapalAuthToken> {
  const response = await fetch(`${PESAPAL_URL}/Auth/RequestToken`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`${response.status}`)
  }

  return await response.json()
}
