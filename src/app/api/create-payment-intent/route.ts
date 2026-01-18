import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Deposit amount in cents ($50 deposit)
const DEPOSIT_AMOUNT = 5000;

// Initialize Stripe lazily to avoid build-time errors
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(secretKey, {
    apiVersion: '2025-04-30.acacia' as Stripe.LatestApiVersion,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, date, name, email, phone, message } = body;

    // Validate required fields
    if (!service || !date || !name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get service details for description
    const serviceNames: Record<string, string> = {
      event: 'Event Photography',
      portrait: 'Portrait Session',
      video: 'Video Production',
      feature: 'Car/Bike Feature Shoot',
    };

    const serviceName = serviceNames[service] || service;
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Create PaymentIntent
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: DEPOSIT_AMOUNT,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        service,
        date,
        name,
        email,
        phone: phone || '',
        message: message || '',
      },
      description: `Booking deposit for ${serviceName} on ${formattedDate}`,
      receipt_email: email,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: DEPOSIT_AMOUNT,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
