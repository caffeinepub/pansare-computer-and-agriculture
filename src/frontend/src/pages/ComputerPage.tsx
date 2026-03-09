import { Department } from "@/backend.d";
const SKEL_6 = ["s1", "s2", "s3", "s4", "s5", "s6"];
const SKEL_8 = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  useAllComputerServices,
  useProductsByDepartment,
  useSubmitServiceRequest,
} from "@/hooks/useQueries";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Monitor,
  Package,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SERVICE_TYPES = [
  "Laptop Repair",
  "Desktop Repair",
  "Screen Replacement",
  "Keyboard Replacement",
  "Battery Replacement",
  "Virus/Malware Removal",
  "Data Recovery",
  "Software Installation",
  "OS Installation",
  "Network/WiFi Setup",
  "Hardware Upgrade",
  "Annual Maintenance",
  "Other",
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ComputerPage() {
  const { data: services, isLoading: servicesLoading } =
    useAllComputerServices();
  const { data: products, isLoading: productsLoading } =
    useProductsByDepartment(Department.computer);
  const submitRequest = useSubmitServiceRequest();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    serviceType: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.customerName ||
      !form.phone ||
      !form.serviceType ||
      !form.description
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await submitRequest.mutateAsync(form);
      setSubmitted(true);
      setForm({
        customerName: "",
        phone: "",
        serviceType: "",
        description: "",
      });
      toast.success("Service request submitted! We'll contact you soon.");
    } catch {
      toast.error("Failed to submit request. Please try again.");
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
            <div className="w-10 h-10 rounded-xl bg-computer-light flex items-center justify-center">
              <Monitor className="w-5 h-5 text-computer" />
            </div>
            <Badge className="dept-computer border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Computer Department
            </Badge>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Computer Services
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Professional repair, maintenance, and IT services for laptops,
            desktops, and networks. Quality parts and expert technicians at your
            service.
          </p>
        </motion.div>

        {/* Services Section */}
        <section className="mb-14">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-computer" />
            Services We Offer
          </h2>

          {servicesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SKEL_6.map((id) => (
                <Skeleton key={id} className="h-36 rounded-xl" />
              ))}
            </div>
          ) : services && services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, i) => (
                <motion.div
                  key={service.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Card className="h-full border-border hover:border-computer/30 transition-colors card-hover">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-display text-base text-foreground leading-tight">
                          {service.name}
                        </CardTitle>
                        <span className="text-computer font-bold text-sm whitespace-nowrap">
                          {formatPrice(service.price)}
                        </span>
                      </div>
                      {service.duration && (
                        <Badge variant="secondary" className="text-xs w-fit">
                          ⏱ {service.duration}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-computer-light/30 rounded-xl border border-computer/10">
              <Monitor className="w-10 h-10 text-computer/40 mx-auto mb-3" />
              <p className="text-muted-foreground">
                Services will be listed here. Check back soon!
              </p>
            </div>
          )}
        </section>

        {/* Products Section */}
        <section className="mb-14">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Package className="w-5 h-5 text-computer" />
            Computer Products
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
                  <Card className="h-full border-border hover:border-computer/30 transition-colors card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-display text-sm text-foreground leading-tight">
                        {product.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <Badge
                          className={`text-xs ${product.inStock ? "bg-agriculture-light text-agriculture border-agriculture/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-computer font-bold">
                        {formatPrice(product.price)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-computer-light/30 rounded-xl border border-computer/10">
              <Package className="w-10 h-10 text-computer/40 mx-auto mb-3" />
              <p className="text-muted-foreground">Products coming soon.</p>
            </div>
          )}
        </section>

        {/* Service Request Form */}
        <section>
          <div className="max-w-2xl">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-computer" />
              Request a Repair / Service
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Fill in the form below and we'll get back to you within the same
              business day.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-computer-light border border-computer/20 rounded-xl p-8 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-computer mx-auto mb-3" />
                <h3 className="font-display font-bold text-computer text-lg mb-2">
                  Request Submitted!
                </h3>
                <p className="text-muted-foreground text-sm">
                  We've received your service request and will call you shortly.
                </p>
                <Button
                  className="mt-4 bg-computer text-white hover:bg-computer/90"
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
                        <Label htmlFor="sr-name">Full Name *</Label>
                        <Input
                          id="sr-name"
                          placeholder="Your name"
                          value={form.customerName}
                          onChange={(e) =>
                            handleField("customerName", e.target.value)
                          }
                          autoComplete="name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sr-phone">Phone Number *</Label>
                        <Input
                          id="sr-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => handleField("phone", e.target.value)}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sr-service">Service Type *</Label>
                      <Select
                        value={form.serviceType}
                        onValueChange={(v) => handleField("serviceType", v)}
                      >
                        <SelectTrigger id="sr-service">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sr-desc">Describe the Problem *</Label>
                      <Textarea
                        id="sr-desc"
                        placeholder="Please describe your issue in detail..."
                        rows={4}
                        value={form.description}
                        onChange={(e) =>
                          handleField("description", e.target.value)
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitRequest.isPending}
                      className="w-full bg-computer text-white hover:bg-computer/90 font-semibold"
                    >
                      {submitRequest.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Service Request"
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
