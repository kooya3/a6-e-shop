const policies = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://checkout.stripe.com',
    'https://js.stripe.com',
    'https://maps.googleapis.com',
    'https://bctest.dayliff.com:7048',
    'https://cybqa.pesapal.com',
    'https://pay.google.com',
    'https://google.com/pay',
  ],
  'child-src': ["'self'"],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'http://fonts.googleapis.com/css',
  ],
  'img-src': [
    "'self'",
    'https://*.stripe.com',
    'https://raw.githubusercontent.com',
    'https://www.gstatic.com/images/icons/material/system/1x/payment_white_36dp.png',
  ],
  'font-src': ["'self'"],
  'frame-src': [
    "'self'",
    'https://checkout.stripe.com',
    'https://js.stripe.com',
    'https://hooks.stripe.com',
    'https://bctest.dayliff.com:7048',
    'https://cybqa.pesapal.com',
    'https://pay.google.com',
    'https://google.com/pay',
  ],
  'connect-src': [
    "'self'",
    'https://checkout.stripe.com',
    'https://api.stripe.com',
    'https://maps.googleapis.com',
    'https://bctest.dayliff.com:7048',
    'https://cybqa.pesapal.com',
    'https://pay.google.com',
    'https://google.com/pay',
  ],
}

module.exports = Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(' ')}`
    }
    return ''
  })
  .join('; ')
