import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET);

const stripePayment = options => {
    return new Promise((resolve, reject) => {
        stripe.paymentIntents
            .create(options)
            .then(charge => {
                if (charge.status !== 'succeeded') {
                    reject(new Error(charge.status));
                } else {
                    resolve(true);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};

export default { stripePayment };