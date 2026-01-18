"use client";

import { useState } from "react";
import { Calendar, Clock, CheckCircle, CreditCard, ArrowRight, ArrowLeft } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, addDays, isBefore, isWeekend } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraffitiText } from "@/components/cultural/graffiti-text";
import { PinstripeBorder, PinstripeDivider } from "@/components/cultural/pinstripe-border";
import "react-day-picker/style.css";

// Initialize Stripe (client-side)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Service options
const services = [
  {
    id: "event",
    name: "Event Photography",
    description: "Car shows, quinceañeras, gatherings",
    duration: "4-8 hours",
    depositNote: "$50 deposit secures your date",
  },
  {
    id: "portrait",
    name: "Portrait Session",
    description: "Individual, family, with vehicles",
    duration: "1-2 hours",
    depositNote: "$50 deposit secures your date",
  },
  {
    id: "video",
    name: "Video Production",
    description: "Documentary, promo, event coverage",
    duration: "Varies",
    depositNote: "$50 deposit secures your date",
  },
  {
    id: "feature",
    name: "Car/Bike Feature",
    description: "Magazine quality shoots",
    duration: "2-4 hours",
    depositNote: "$50 deposit secures your date",
  },
];

// Time slots
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

// Simulated unavailable dates (in production, fetch from backend)
const unavailableDates = [
  addDays(new Date(), 3),
  addDays(new Date(), 7),
  addDays(new Date(), 10),
  addDays(new Date(), 14),
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Check if date is unavailable
  const isDateUnavailable = (date: Date) => {
    return (
      isBefore(date, new Date()) ||
      unavailableDates.some(
        (unavailable) =>
          unavailable.toDateString() === date.toDateString()
      )
    );
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Create payment intent
  const handleProceedToPayment = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !formData.name || !formData.email) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selectedService,
          date: `${format(selectedDate, "yyyy-MM-dd")} ${selectedTime}`,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setStep(4);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6">
              <span className="gold-text">Select a Service</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service.id);
                    setStep(2);
                  }}
                  className={`p-6 rounded-lg border text-left transition-all ${
                    selectedService === service.id
                      ? "border-[var(--gold)] bg-[var(--gold)]/10"
                      : "border-border/50 hover:border-[var(--gold)]/50"
                  }`}
                >
                  <h3 className="font-bold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {service.description}
                  </p>
                  <p className="text-xs text-[var(--chrome)]">
                    Duration: {service.duration}
                  </p>
                  <p className="text-xs text-[var(--gold)] mt-2">
                    {service.depositNote}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                <span className="gold-text">Choose Date & Time</span>
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(1)}
                className="text-muted-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[var(--gold)]" />
                  Select Date
                </h3>
                <div className="border border-border/50 rounded-lg p-4 bg-card">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isDateUnavailable}
                    fromDate={new Date()}
                    toDate={addDays(new Date(), 90)}
                    classNames={{
                      day: "hover:bg-[var(--gold)]/20 rounded-md",
                      selected: "bg-[var(--gold)] text-background",
                      today: "border border-[var(--chrome)]",
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  * Grayed out dates are unavailable
                </p>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[var(--gold)]" />
                  Select Time
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      disabled={!selectedDate}
                      className={`px-4 py-3 rounded-lg border text-sm transition-all ${
                        selectedTime === time
                          ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                          : "border-border/50 hover:border-[var(--gold)]/50 disabled:opacity-50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedDate && selectedTime && (
              <div className="pt-4">
                <Button
                  onClick={() => setStep(3)}
                  className="w-full chrome-gradient text-background"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                <span className="gold-text">Your Information</span>
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep(2)}
                className="text-muted-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>

            {/* Booking Summary */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
              <h3 className="text-sm font-medium mb-2 text-[var(--chrome)]">
                Booking Summary
              </h3>
              <p className="font-medium">
                {services.find((s) => s.id === selectedService)?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} at{" "}
                {selectedTime}
              </p>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-colors"
                    placeholder="(555) 555-5555"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Details about your shoot
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-colors resize-none"
                  placeholder="Tell me about your project, location, special requests..."
                />
              </div>
            </div>

            {/* Deposit Info */}
            <div className="p-4 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/30">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4 text-[var(--gold)]" />
                <span className="font-medium text-[var(--gold)]">
                  Deposit Required: $50
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                A $50 deposit is required to secure your booking. This amount
                will be applied toward your final session cost.
              </p>
            </div>

            <Button
              onClick={handleProceedToPayment}
              disabled={!formData.name || !formData.email || isLoading}
              className="w-full chrome-gradient text-background"
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );

      case 4:
        return clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#D4AF37",
                  colorBackground: "#111111",
                  colorText: "#e5e5e5",
                  colorDanger: "#8B0000",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <PaymentForm
              onBack={() => setStep(3)}
              onSuccess={() => setBookingComplete(true)}
              selectedService={selectedService}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              formData={formData}
            />
          </Elements>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading payment form...</p>
          </div>
        );

      default:
        return null;
    }
  };

  if (bookingComplete) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="bg-card border-border/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--gold)]/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-[var(--gold)]" />
              </div>
              <GraffitiText
                text="BOOKING CONFIRMED"
                variant="gold"
                size="lg"
                animated={false}
              />
              <p className="mt-4 text-muted-foreground mb-6">
                Thank you for booking with Hugo and His Camera! You&apos;ll receive
                a confirmation email shortly with all the details.
              </p>
              <div className="p-4 rounded-lg bg-secondary/50 text-left mb-6">
                <p className="font-medium">
                  {services.find((s) => s.id === selectedService)?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} at{" "}
                  {selectedTime}
                </p>
                <p className="text-sm text-[var(--gold)] mt-2">
                  Deposit paid: $50
                </p>
              </div>
              <Button
                asChild
                className="chrome-gradient text-background"
              >
                <a href="/">Return Home</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <GraffitiText
            text="BOOK A SESSION"
            variant="gradient"
            size="2xl"
            animated={false}
          />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Secure your date with a $50 deposit
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {["Service", "Date & Time", "Details", "Payment"].map((label, index) => (
              <div key={label} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step > index + 1
                      ? "bg-[var(--gold)] text-background"
                      : step === index + 1
                      ? "bg-[var(--gold)]/20 border-2 border-[var(--gold)] text-[var(--gold)]"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > index + 1 ? "✓" : index + 1}
                </div>
                <span
                  className={`hidden sm:block ml-2 text-sm ${
                    step >= index + 1 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {index < 3 && (
                  <div
                    className={`w-12 sm:w-24 h-0.5 mx-2 ${
                      step > index + 1 ? "bg-[var(--gold)]" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          <PinstripeBorder variant="gold">
            <Card className="bg-card border-0">
              <CardContent className="p-6 md:p-8">
                {renderStep()}
              </CardContent>
            </Card>
          </PinstripeBorder>
        </div>
      </div>
    </div>
  );
}

// Payment Form Component
function PaymentForm({
  onBack,
  onSuccess,
  selectedService,
  selectedDate,
  selectedTime,
  formData,
}: {
  onBack: () => void;
  onSuccess: () => void;
  selectedService: string;
  selectedDate?: Date;
  selectedTime: string;
  formData: { name: string; email: string; phone: string; message: string };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/book/success`,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed");
      setIsProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          <span className="gold-text">Complete Payment</span>
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Booking Summary */}
      <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
        <h3 className="text-sm font-medium mb-2 text-[var(--chrome)]">
          Booking Summary
        </h3>
        <p className="font-medium">
          {services.find((s) => s.id === selectedService)?.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} at{" "}
          {selectedTime}
        </p>
        <p className="text-sm mt-2">{formData.name}</p>
        <p className="text-sm text-muted-foreground">{formData.email}</p>
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex justify-between">
            <span className="font-medium">Deposit Amount</span>
            <span className="text-[var(--gold)] font-bold">$50.00</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement />

        {error && (
          <p className="text-sm text-[var(--accent-red)]">{error}</p>
        )}

        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full chrome-gradient text-background font-semibold"
        >
          {isProcessing ? "Processing..." : "Pay $50 Deposit"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Your payment is secured by Stripe. The $50 deposit will be applied to
          your final session cost.
        </p>
      </form>
    </div>
  );
}
