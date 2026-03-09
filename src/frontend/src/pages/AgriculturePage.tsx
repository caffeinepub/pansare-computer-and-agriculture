import { Department } from "@/backend.d";
const SKEL_8 = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];
const SKEL_6 = ["s1", "s2", "s3", "s4", "s5", "s6"];
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAllAgricultureTips,
  useProductsByDepartment,
  useSubmitEnquiry,
} from "@/hooks/useQueries";
import { CheckCircle2, Leaf, Lightbulb, Loader2, Package } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function AgriculturePage() {
  const { data: products, isLoading: productsLoading } =
    useProductsByDepartment(Department.agriculture);
  const { data: tips, isLoading: tipsLoading } = useAllAgricultureTips();
  const submitEnquiry = useSubmitEnquiry();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customerName || !form.phone || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await submitEnquiry.mutateAsync({ ...form, department: "agriculture" });
      setSubmitted(true);
      setForm({ customerName: "", phone: "", email: "", message: "" });
      toast.success("Enquiry submitted! We'll contact you soon.");
    } catch {
      toast.error("Failed to submit enquiry. Please try again.");
    }
  }

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
            <div className="w-10 h-10 rounded-xl bg-agriculture-light flex items-center justify-center">
              <Leaf className="w-5 h-5 text-agriculture" />
            </div>
            <Badge className="dept-agriculture border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Agriculture Department
            </Badge>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Agriculture Supplies
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Premium seeds, fertilizers, pesticides, and farming tools from
            trusted brands. Supporting local farmers with quality products and
            expert advice.
          </p>
        </motion.div>

        {/* Products Section */}
        <section className="mb-14">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Package className="w-5 h-5 text-agriculture" />
            Our Products
          </h2>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SKEL_8.map((id) => (
                <Skeleton key={id} className="h-44 rounded-xl" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product, i) => (
                <motion.div
                  key={product.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Card className="h-full border-border hover:border-agriculture/30 transition-colors card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-display text-sm text-foreground leading-tight">
                        {product.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <Badge
                          className={`text-xs border ${
                            product.inStock
                              ? "bg-agriculture-light text-agriculture border-agriculture/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-agriculture font-bold">
                        {formatPrice(product.price)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-agriculture-light/30 rounded-xl border border-agriculture/10">
              <Package className="w-10 h-10 text-agriculture/40 mx-auto mb-3" />
              <p className="text-muted-foreground">Products coming soon.</p>
            </div>
          )}
        </section>

        {/* Tips Section */}
        <section className="mb-14">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-agriculture" />
            Farming Tips & Advisory
          </h2>

          {tipsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKEL_6.map((id) => (
                <Skeleton key={id} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : tips && tips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tips.map((tip, i) => (
                <motion.div
                  key={tip.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Card className="h-full border-border hover:border-agriculture/30 transition-colors card-hover">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-display text-base text-foreground leading-tight">
                          {tip.title}
                        </CardTitle>
                      </div>
                      {tip.crop && (
                        <Badge className="dept-agriculture text-xs w-fit border">
                          🌾 {tip.crop}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                        {tip.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-agriculture-light/30 rounded-xl border border-agriculture/10">
              <Lightbulb className="w-10 h-10 text-agriculture/40 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Expert farming tips coming soon.
              </p>
            </div>
          )}
        </section>

        {/* Enquiry Form */}
        <section>
          <div className="max-w-2xl">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-agriculture" />
              Enquire About Products
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Need bulk pricing, custom orders, or have questions about our
              products?
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-agriculture-light border border-agriculture/20 rounded-xl p-8 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-agriculture mx-auto mb-3" />
                <h3 className="font-display font-bold text-agriculture text-lg mb-2">
                  Enquiry Submitted!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for your enquiry. Our team will contact you shortly.
                </p>
                <Button
                  className="mt-4 bg-agriculture text-white hover:bg-agriculture/90"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another
                </Button>
              </motion.div>
            ) : (
              <Card className="border-border">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ag-name">Full Name *</Label>
                        <Input
                          id="ag-name"
                          placeholder="Your name"
                          value={form.customerName}
                          onChange={(e) =>
                            handleField("customerName", e.target.value)
                          }
                          autoComplete="name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ag-phone">Phone Number *</Label>
                        <Input
                          id="ag-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => handleField("phone", e.target.value)}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ag-email">Email Address</Label>
                      <Input
                        id="ag-email"
                        type="email"
                        placeholder="you@example.com (optional)"
                        value={form.email}
                        onChange={(e) => handleField("email", e.target.value)}
                        autoComplete="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ag-msg">Your Enquiry *</Label>
                      <Textarea
                        id="ag-msg"
                        placeholder="Tell us what products you're looking for, quantities, etc."
                        rows={4}
                        value={form.message}
                        onChange={(e) => handleField("message", e.target.value)}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitEnquiry.isPending}
                      className="w-full bg-agriculture text-white hover:bg-agriculture/90 font-semibold"
                    >
                      {submitEnquiry.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Enquiry"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
