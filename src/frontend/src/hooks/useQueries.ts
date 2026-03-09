import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AgricultureTip,
  AgricultureTipInput,
  ComputerService,
  ComputerServiceInput,
  Department,
  Enquiry,
  Product,
  ProductUpdateInput,
  ServiceRequest,
} from "../backend.d";
import { useActor } from "./useActor";

// ── Products ────────────────────────────────────────────────────────────────

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByDepartment(department: Department) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", department],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByDepartment(department);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProductUpdateInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: bigint; data: ProductUpdateInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateProduct(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// ── Computer Services ───────────────────────────────────────────────────────

export function useAllComputerServices() {
  const { actor, isFetching } = useActor();
  return useQuery<ComputerService[]>({
    queryKey: ["computerServices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllComputerServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddComputerService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ComputerServiceInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addComputerService(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["computerServices"] });
    },
  });
}

export function useDeleteComputerService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteComputerService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["computerServices"] });
    },
  });
}

export function useUpdateComputerService() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: bigint; data: ComputerServiceInput }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateComputerService(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["computerServices"] });
    },
  });
}

// ── Agriculture Tips ────────────────────────────────────────────────────────

export function useAllAgricultureTips() {
  const { actor, isFetching } = useActor();
  return useQuery<AgricultureTip[]>({
    queryKey: ["agricultureTips"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAgricultureTips();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddAgricultureTip() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AgricultureTipInput) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addAgricultureTip(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agricultureTips"] });
    },
  });
}

export function useDeleteAgricultureTip() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteAgricultureTip(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agricultureTips"] });
    },
  });
}

// ── Enquiries ────────────────────────────────────────────────────────────────

export function useAllEnquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Enquiry[]>({
    queryKey: ["enquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEnquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitEnquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerName,
      phone,
      email,
      message,
      department,
    }: {
      customerName: string;
      phone: string;
      email: string;
      message: string;
      department: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitEnquiry(
        customerName,
        phone,
        email,
        message,
        department,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
}

// ── Service Requests ─────────────────────────────────────────────────────────

export function useAllServiceRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<ServiceRequest[]>({
    queryKey: ["serviceRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServiceRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitServiceRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      customerName,
      phone,
      serviceType,
      description,
    }: {
      customerName: string;
      phone: string;
      serviceType: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitServiceRequest(
        customerName,
        phone,
        serviceType,
        description,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceRequests"] });
    },
  });
}

export function useUpdateServiceRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateServiceRequestStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceRequests"] });
    },
  });
}
