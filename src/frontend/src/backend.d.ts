import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ServiceRequest {
    id: bigint;
    customerName: string;
    status: string;
    serviceType: string;
    description: string;
    timestamp: bigint;
    phone: string;
}
export interface AgricultureTipInput {
    title: string;
    content: string;
    crop: string;
}
export interface AgricultureTip {
    id: bigint;
    title: string;
    content: string;
    crop: string;
}
export interface ProductUpdateInput {
    inStock: boolean;
    name: string;
    description: string;
    category: string;
    department: Department;
    price: number;
}
export interface ComputerService {
    id: bigint;
    duration: string;
    name: string;
    description: string;
    price: number;
}
export interface Enquiry {
    id: bigint;
    customerName: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
    department: string;
}
export interface ComputerServiceInput {
    duration: string;
    name: string;
    description: string;
    price: number;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    description: string;
    category: string;
    department: Department;
    price: number;
}
export enum Department {
    computer = "computer",
    agriculture = "agriculture"
}
export interface backendInterface {
    addAgricultureTip(tipData: AgricultureTipInput): Promise<bigint>;
    addComputerService(serviceData: ComputerServiceInput): Promise<bigint>;
    addProduct(productData: ProductUpdateInput): Promise<bigint>;
    deleteAgricultureTip(id: bigint): Promise<void>;
    deleteComputerService(id: bigint): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    getAllAgricultureTips(): Promise<Array<AgricultureTip>>;
    getAllComputerServices(): Promise<Array<ComputerService>>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllServiceRequests(): Promise<Array<ServiceRequest>>;
    getEnquiriesByDepartment(department: string): Promise<Array<Enquiry>>;
    getProductsByDepartment(department: Department): Promise<Array<Product>>;
    submitEnquiry(customerName: string, phone: string, email: string, message: string, department: string): Promise<bigint>;
    submitServiceRequest(customerName: string, phone: string, serviceType: string, description: string): Promise<bigint>;
    updateComputerService(id: bigint, serviceData: ComputerServiceInput): Promise<void>;
    updateProduct(id: bigint, productData: ProductUpdateInput): Promise<void>;
    updateServiceRequestStatus(id: bigint, status: string): Promise<void>;
}
