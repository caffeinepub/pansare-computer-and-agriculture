import { Department } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddAgricultureTip,
  useAddComputerService,
  useAddProduct,
  useAllAgricultureTips,
  useAllComputerServices,
  useAllEnquiries,
  useAllProducts,
  useAllServiceRequests,
  useDeleteAgricultureTip,
  useDeleteComputerService,
  useDeleteProduct,
  useUpdateServiceRequestStatus,
} from "@/hooks/useQueries";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Leaf,
  Loader2,
  MessageSquare,
  Monitor,
  Package,
  Plus,
  Trash2,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SKEL_IDS_5 = ["s1", "s2", "s3", "s4", "s5"];
const SKEL_IDS_4 = ["s1", "s2", "s3", "s4"];

function SkeletonRows({
  ids,
  height = "h-12",
}: { ids: string[]; height?: string }) {
  return (
    <div className="space-y-2">
      {ids.map((id) => (
        <Skeleton key={id} className={`${height} w-full`} />
      ))}
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ── Products Tab ─────────────────────────────────────────────────────────────

function ProductsTab() {
  const { data: products, isLoading } = useAllProducts();
  const addProduct = useAddProduct();
  const deleteProduct = useDeleteProduct();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    department: Department.computer,
    price: "",
    inStock: true,
  });

  function f(field: string, value: string | boolean | Department) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleAdd() {
    if (!form.name || !form.category || !form.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await addProduct.mutateAsync({
        name: form.name,
        description: form.description,
        category: form.category,
        department: form.department,
        price: Number.parseFloat(form.price),
        inStock: form.inStock,
      });
      toast.success("Product added");
      setOpen(false);
      setForm({
        name: "",
        description: "",
        category: "",
        department: Department.computer,
        price: "",
        inStock: true,
      });
    } catch {
      toast.error("Failed to add product");
    }
  }

  async function handleDelete(id: bigint, name: string) {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success(`"${name}" deleted`);
    } catch {
      toast.error("Failed to delete product");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-foreground">
          Products ({products?.length ?? 0})
        </h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the product details below.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 col-span-2">
                  <Label>Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => f("name", e.target.value)}
                    placeholder="Product name"
                  />
                </div>
                <div className="space-y-1 col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => f("description", e.target.value)}
                    rows={2}
                    placeholder="Short description"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Category *</Label>
                  <Input
                    value={form.category}
                    onChange={(e) => f("category", e.target.value)}
                    placeholder="e.g. Seeds, Laptop"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Price (₹) *</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => f("price", e.target.value)}
                    placeholder="0"
                    min={0}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Department *</Label>
                  <Select
                    value={form.department}
                    onValueChange={(v) => f("department", v as Department)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Department.computer}>
                        Computer
                      </SelectItem>
                      <SelectItem value={Department.agriculture}>
                        Agriculture
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Stock</Label>
                  <Select
                    value={form.inStock ? "yes" : "no"}
                    onValueChange={(v) => f("inStock", v === "yes")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">In Stock</SelectItem>
                      <SelectItem value="no">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={addProduct.isPending}>
                {addProduct.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <SkeletonRows ids={SKEL_IDS_5} />
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products && products.length > 0 ? (
                products.map((p) => (
                  <TableRow key={p.id.toString()}>
                    <TableCell className="font-medium text-sm">
                      {p.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {p.category}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          p.department === Department.computer
                            ? "dept-computer border text-xs"
                            : "dept-agriculture border text-xs"
                        }
                      >
                        {p.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatPrice(p.price)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs border ${p.inStock ? "bg-agriculture-light text-agriculture border-agriculture/20" : "bg-destructive/10 text-destructive border-destructive/20"}`}
                      >
                        {p.inStock ? "In Stock" : "Out"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(p.id, p.name)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No products yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ── Computer Services Tab ─────────────────────────────────────────────────────

function ComputerServicesTab() {
  const { data: services, isLoading } = useAllComputerServices();
  const addService = useAddComputerService();
  const deleteService = useDeleteComputerService();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  function f(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleAdd() {
    if (!form.name || !form.price) {
      toast.error("Name and price required");
      return;
    }
    try {
      await addService.mutateAsync({
        name: form.name,
        description: form.description,
        price: Number.parseFloat(form.price),
        duration: form.duration,
      });
      toast.success("Service added");
      setOpen(false);
      setForm({ name: "", description: "", price: "", duration: "" });
    } catch {
      toast.error("Failed to add service");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-foreground">
          Computer Services ({services?.length ?? 0})
        </h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="gap-2 bg-computer text-white hover:bg-computer/90"
            >
              <Plus className="w-4 h-4" /> Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Computer Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <Label>Service Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => f("name", e.target.value)}
                  placeholder="e.g. Laptop Screen Replacement"
                />
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => f("description", e.target.value)}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Price (₹) *</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => f("price", e.target.value)}
                    min={0}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Duration</Label>
                  <Input
                    value={form.duration}
                    onChange={(e) => f("duration", e.target.value)}
                    placeholder="e.g. 2–3 hours"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                disabled={addService.isPending}
                className="bg-computer text-white hover:bg-computer/90"
              >
                {addService.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <SkeletonRows ids={SKEL_IDS_4} />
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services && services.length > 0 ? (
                services.map((s) => (
                  <TableRow key={s.id.toString()}>
                    <TableCell className="font-medium text-sm">
                      {s.name}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {s.description}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {s.duration || "—"}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-computer">
                      {formatPrice(s.price)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={async () => {
                          try {
                            await deleteService.mutateAsync(s.id);
                            toast.success("Deleted");
                          } catch {
                            toast.error("Failed");
                          }
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No services yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ── Agriculture Tips Tab ──────────────────────────────────────────────────────

function AgricultureTipsTab() {
  const { data: tips, isLoading } = useAllAgricultureTips();
  const addTip = useAddAgricultureTip();
  const deleteTip = useDeleteAgricultureTip();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", crop: "" });

  function f(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  async function handleAdd() {
    if (!form.title || !form.content) {
      toast.error("Title and content required");
      return;
    }
    try {
      await addTip.mutateAsync({
        title: form.title,
        content: form.content,
        crop: form.crop,
      });
      toast.success("Tip added");
      setOpen(false);
      setForm({ title: "", content: "", crop: "" });
    } catch {
      toast.error("Failed to add tip");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-foreground">
          Agriculture Tips ({tips?.length ?? 0})
        </h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="gap-2 bg-agriculture text-white hover:bg-agriculture/90"
            >
              <Plus className="w-4 h-4" /> Add Tip
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Agriculture Tip</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => f("title", e.target.value)}
                  placeholder="e.g. How to prevent root rot"
                />
              </div>
              <div className="space-y-1">
                <Label>Crop/Category</Label>
                <Input
                  value={form.crop}
                  onChange={(e) => f("crop", e.target.value)}
                  placeholder="e.g. Wheat, Sugarcane, General"
                />
              </div>
              <div className="space-y-1">
                <Label>Content *</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) => f("content", e.target.value)}
                  rows={4}
                  placeholder="Detailed tip content..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                disabled={addTip.isPending}
                className="bg-agriculture text-white hover:bg-agriculture/90"
              >
                {addTip.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Add Tip
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <SkeletonRows ids={SKEL_IDS_4} />
      ) : (
        <div className="space-y-3">
          {tips && tips.length > 0 ? (
            tips.map((tip) => (
              <TipRow
                key={tip.id.toString()}
                tip={tip}
                onDelete={async () => {
                  try {
                    await deleteTip.mutateAsync(tip.id);
                    toast.success("Tip deleted");
                  } catch {
                    toast.error("Failed to delete");
                  }
                }}
              />
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground border border-border rounded-lg">
              No tips yet
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TipRow({
  tip,
  onDelete,
}: {
  tip: { id: bigint; title: string; content: string; crop: string };
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm text-foreground truncate">
              {tip.title}
            </h4>
            {tip.crop && (
              <Badge className="dept-agriculture border text-xs flex-shrink-0">
                🌾 {tip.crop}
              </Badge>
            )}
          </div>
          {expanded && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              {tip.content}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Enquiries Tab ─────────────────────────────────────────────────────────────

function EnquiriesTab() {
  const { data: enquiries, isLoading } = useAllEnquiries();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-foreground">
          Enquiries ({enquiries?.length ?? 0})
        </h3>
      </div>
      {isLoading ? (
        <SkeletonRows ids={SKEL_IDS_5} />
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries && enquiries.length > 0 ? (
                enquiries.map((enq) => (
                  <TableRow key={enq.id.toString()}>
                    <TableCell className="font-medium text-sm">
                      {enq.customerName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {enq.phone}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {enq.email || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs border ${
                          enq.department === "computer"
                            ? "dept-computer"
                            : enq.department === "agriculture"
                              ? "dept-agriculture"
                              : "bg-secondary text-foreground"
                        }`}
                      >
                        {enq.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(enq.timestamp)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {enq.message}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No enquiries yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

// ── Service Requests Tab ──────────────────────────────────────────────────────

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed", "Cancelled"];

function ServiceRequestsTab() {
  const { data: requests, isLoading } = useAllServiceRequests();
  const updateStatus = useUpdateServiceRequestStatus();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-foreground">
          Service Requests ({requests?.length ?? 0})
        </h3>
      </div>
      {isLoading ? (
        <SkeletonRows ids={SKEL_IDS_5} height="h-16" />
      ) : (
        <div className="space-y-3">
          {requests && requests.length > 0 ? (
            requests.map((req) => (
              <Card key={req.id.toString()} className="border-border">
                <CardContent className="pt-4 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">
                          {req.customerName}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          • {req.phone}
                        </span>
                        <Badge className="dept-computer border text-xs">
                          {req.serviceType}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {req.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        📅 {formatDate(req.timestamp)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Select
                        value={req.status}
                        onValueChange={async (v) => {
                          try {
                            await updateStatus.mutateAsync({
                              id: req.id,
                              status: v,
                            });
                            toast.success("Status updated");
                          } catch {
                            toast.error("Failed to update status");
                          }
                        }}
                      >
                        <SelectTrigger className="w-36 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <StatusBadge status={req.status} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground border border-border rounded-lg">
              No service requests yet
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    Pending:
      "bg-gold-light text-[oklch(0.52_0.14_75)] border-[oklch(0.72_0.14_75_/0.3)]",
    "In Progress": "bg-computer-light text-computer border-computer/20",
    Completed: "bg-agriculture-light text-agriculture border-agriculture/20",
    Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  };
  return (
    <Badge
      className={`text-xs border ${config[status] ?? "bg-secondary text-foreground border-border"}`}
    >
      {status}
    </Badge>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────

export function AdminPage() {
  return (
    <div className="py-10 md:py-14">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-foreground" />
            </div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            Manage products, services, tips, and customer enquiries.
          </p>
        </motion.div>

        <Card className="border-border">
          <CardContent className="pt-6">
            <Tabs defaultValue="products">
              <TabsList className="grid grid-cols-2 sm:grid-cols-5 mb-6 h-auto gap-1 bg-secondary/60 p-1">
                <TabsTrigger
                  value="products"
                  className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card"
                >
                  <Package className="w-3.5 h-3.5" /> Products
                </TabsTrigger>
                <TabsTrigger
                  value="computer"
                  className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card"
                >
                  <Monitor className="w-3.5 h-3.5" /> Computer
                </TabsTrigger>
                <TabsTrigger
                  value="agriculture"
                  className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card"
                >
                  <Leaf className="w-3.5 h-3.5" /> Tips
                </TabsTrigger>
                <TabsTrigger
                  value="enquiries"
                  className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Enquiries
                </TabsTrigger>
                <TabsTrigger
                  value="requests"
                  className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card"
                >
                  <Wrench className="w-3.5 h-3.5" /> Requests
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <ProductsTab />
              </TabsContent>
              <TabsContent value="computer">
                <ComputerServicesTab />
              </TabsContent>
              <TabsContent value="agriculture">
                <AgricultureTipsTab />
              </TabsContent>
              <TabsContent value="enquiries">
                <EnquiriesTab />
              </TabsContent>
              <TabsContent value="requests">
                <ServiceRequestsTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
