import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitEnquiry } from "@/hooks/useQueries";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function ContactPage() {
  const submitEnquiry = useSubmitEnquiry();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    message: "",
    department: "",
  });

  function handleField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.customerName ||
      !form.phone ||
      !form.message ||
      !form.department
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await submitEnquiry.mutateAsync(form);
      setSubmitted(true);
      setForm({
        customerName: "",
        phone: "",
        email: "",
        message: "",
        department: "",
      });
      toast.success("Enquiry submitted successfully!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    }
  }

  const contactDetails = [
    {
      icon: MapPin,
      label: "Location",
      value: "Main Market Road, Baramati, Pune District, Maharashtra",
      color: "computer",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210 / +91 87654 32109",
      color: "agriculture",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@pansare.in",
      color: "computer",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Monday – Saturday: 9:00 AM – 7:00 PM\nSunday: Closed",
      color: "agriculture",
    },
  ];

  return (
    <div className="py-10 md:py-14">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-foreground" />
            </div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Contact & Enquiry
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Have a question or need help? Reach out to us — we're happy to
            assist with computer services or agriculture supplies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            {contactDetails.map(({ icon: Icon, label, value, color }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-border">
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          color === "computer"
                            ? "bg-computer-light"
                            : "bg-agriculture-light"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            color === "computer"
                              ? "text-computer"
                              : "text-agriculture"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                          {label}
                        </p>
                        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                          {value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Quick Note */}
            <div className="rounded-xl bg-secondary/60 border border-border p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  Walk-ins Welcome.
                </span>{" "}
                You can also visit our store during business hours. Our team
                will be happy to assist you in person.
              </p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              Send an Enquiry
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-border rounded-xl p-10 text-center bg-card"
              >
                <CheckCircle2 className="w-14 h-14 text-agriculture mx-auto mb-4" />
                <h3 className="font-display font-bold text-foreground text-xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. We'll contact you within 1
                  business day.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <Card className="border-border">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ct-name">Full Name *</Label>
                        <Input
                          id="ct-name"
                          placeholder="Your full name"
                          value={form.customerName}
                          onChange={(e) =>
                            handleField("customerName", e.target.value)
                          }
                          autoComplete="name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ct-phone">Phone Number *</Label>
                        <Input
                          id="ct-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => handleField("phone", e.target.value)}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ct-email">Email Address</Label>
                      <Input
                        id="ct-email"
                        type="email"
                        placeholder="you@example.com (optional)"
                        value={form.email}
                        onChange={(e) => handleField("email", e.target.value)}
                        autoComplete="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ct-dept">Department *</Label>
                      <Select
                        value={form.department}
                        onValueChange={(v) => handleField("department", v)}
                      >
                        <SelectTrigger id="ct-dept">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer">
                            💻 Computer Services
                          </SelectItem>
                          <SelectItem value="agriculture">
                            🌾 Agriculture
                          </SelectItem>
                          <SelectItem value="general">
                            📋 General Enquiry
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ct-msg">Message *</Label>
                      <Textarea
                        id="ct-msg"
                        placeholder="How can we help you?"
                        rows={5}
                        value={form.message}
                        onChange={(e) => handleField("message", e.target.value)}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitEnquiry.isPending}
                      className="w-full font-semibold"
                    >
                      {submitEnquiry.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Enquiry"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
