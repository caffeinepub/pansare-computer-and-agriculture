import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type Product = {
    id : Nat;
    name : Text;
    category : Text;
    description : Text;
    price : Float;
    department : Department;
    inStock : Bool;
  };

  type Enquiry = {
    id : Nat;
    customerName : Text;
    phone : Text;
    email : Text;
    message : Text;
    department : Text;
    timestamp : Int;
  };

  type ServiceRequest = {
    id : Nat;
    customerName : Text;
    phone : Text;
    serviceType : Text;
    description : Text;
    status : Text;
    timestamp : Int;
  };

  type ComputerService = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    duration : Text;
  };

  type AgricultureTip = {
    id : Nat;
    title : Text;
    content : Text;
    crop : Text;
  };

  type Department = {
    #computer;
    #agriculture;
  };

  var productIdCounter = 9;
  var enquiryIdCounter = 3;
  var serviceRequestIdCounter = 2;
  var computerServiceIdCounter = 4;
  var agricultureTipIdCounter = 4;

  let products = Map.empty<Nat, Product>();
  let enquiries = Map.empty<Nat, Enquiry>();
  let serviceRequests = Map.empty<Nat, ServiceRequest>();
  let computerServices = Map.empty<Nat, ComputerService>();
  let agricultureTips = Map.empty<Nat, AgricultureTip>();

  public type ProductUpdateInput = {
    name : Text;
    category : Text;
    description : Text;
    price : Float;
    department : Department;
    inStock : Bool;
  };

  // Product Operations
  public shared ({ caller }) func addProduct(productData : ProductUpdateInput) : async Nat {
    let id = productIdCounter;
    let product : Product = {
      id;
      name = productData.name;
      category = productData.category;
      description = productData.description;
      price = productData.price;
      department = productData.department;
      inStock = productData.inStock;
    };
    products.add(id, product);
    productIdCounter += 1;
    id;
  };

  public shared ({ caller }) func updateProduct(id : Nat, productData : ProductUpdateInput) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name = productData.name;
          category = productData.category;
          description = productData.description;
          price = productData.price;
          department = productData.department;
          inStock = productData.inStock;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not products.containsKey(id)) { Runtime.trap("Product not found") };
    products.remove(id);
  };

  public query ({ caller }) func getProductsByDepartment(department : Department) : async [Product] {
    let iter = products.values().filter(
      func(p) { p.department == department }
    );
    iter.toArray();
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  // Enquiry Operations
  public shared ({ caller }) func submitEnquiry(customerName : Text, phone : Text, email : Text, message : Text, department : Text) : async Nat {
    let id = enquiryIdCounter;
    let enquiry : Enquiry = {
      id;
      customerName;
      phone;
      email;
      message;
      department;
      timestamp = Time.now();
    };
    enquiries.add(id, enquiry);
    enquiryIdCounter += 1;
    id;
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    enquiries.values().toArray();
  };

  public query ({ caller }) func getEnquiriesByDepartment(department : Text) : async [Enquiry] {
    let iter = enquiries.values().filter(
      func(e) { e.department == department }
    );
    iter.toArray();
  };

  // ServiceRequest Operations
  public shared ({ caller }) func submitServiceRequest(customerName : Text, phone : Text, serviceType : Text, description : Text) : async Nat {
    let id = serviceRequestIdCounter;
    let request : ServiceRequest = {
      id;
      customerName;
      phone;
      serviceType;
      description;
      status = "Pending";
      timestamp = Time.now();
    };
    serviceRequests.add(id, request);
    serviceRequestIdCounter += 1;
    id;
  };

  public query ({ caller }) func getAllServiceRequests() : async [ServiceRequest] {
    serviceRequests.values().toArray();
  };

  public shared ({ caller }) func updateServiceRequestStatus(id : Nat, status : Text) : async () {
    switch (serviceRequests.get(id)) {
      case (null) { Runtime.trap("Service request not found") };
      case (?request) {
        let updatedRequest : ServiceRequest = {
          id = request.id;
          customerName = request.customerName;
          phone = request.phone;
          serviceType = request.serviceType;
          description = request.description;
          status;
          timestamp = request.timestamp;
        };
        serviceRequests.add(id, updatedRequest);
      };
    };
  };

  public type ComputerServiceInput = {
    name : Text;
    description : Text;
    price : Float;
    duration : Text;
  };

  // ComputerService Operations
  public shared ({ caller }) func addComputerService(serviceData : ComputerServiceInput) : async Nat {
    let id = computerServiceIdCounter;
    let service : ComputerService = {
      id;
      name = serviceData.name;
      description = serviceData.description;
      price = serviceData.price;
      duration = serviceData.duration;
    };
    computerServices.add(id, service);
    computerServiceIdCounter += 1;
    id;
  };

  public query ({ caller }) func getAllComputerServices() : async [ComputerService] {
    computerServices.values().toArray();
  };

  public shared ({ caller }) func updateComputerService(id : Nat, serviceData : ComputerServiceInput) : async () {
    switch (computerServices.get(id)) {
      case (null) { Runtime.trap("Computer service not found") };
      case (?_) {
        let updatedService : ComputerService = {
          id;
          name = serviceData.name;
          description = serviceData.description;
          price = serviceData.price;
          duration = serviceData.duration;
        };
        computerServices.add(id, updatedService);
      };
    };
  };

  public shared ({ caller }) func deleteComputerService(id : Nat) : async () {
    if (not computerServices.containsKey(id)) { Runtime.trap("Computer service not found") };
    computerServices.remove(id);
  };

  public type AgricultureTipInput = {
    title : Text;
    content : Text;
    crop : Text;
  };

  // AgricultureTip Operations
  public shared ({ caller }) func addAgricultureTip(tipData : AgricultureTipInput) : async Nat {
    let id = agricultureTipIdCounter;
    let tip : AgricultureTip = {
      id;
      title = tipData.title;
      content = tipData.content;
      crop = tipData.crop;
    };
    agricultureTips.add(id, tip);
    agricultureTipIdCounter += 1;
    id;
  };

  public query ({ caller }) func getAllAgricultureTips() : async [AgricultureTip] {
    agricultureTips.values().toArray();
  };

  public shared ({ caller }) func deleteAgricultureTip(id : Nat) : async () {
    if (not agricultureTips.containsKey(id)) { Runtime.trap("Agriculture tip not found") };
    agricultureTips.remove(id);
  };

  // Seed Data Initialization
  // Pre-load Computer Products
  products.add(
    1,
    {
      id = 1;
      name = "Laptop";
      category = "Electronics";
      description = "High-performance laptop for work and gaming";
      price = 750.0;
      department = #computer;
      inStock = true;
    },
  );

  products.add(
    2,
    {
      id = 2;
      name = "Desktop";
      category = "Electronics";
      description = "Powerful desktop PC with dual monitors";
      price = 650.0;
      department = #computer;
      inStock = true;
    },
  );

  products.add(
    3,
    {
      id = 3;
      name = "Printer";
      category = "Electronics";
      description = "All-in-one laser printer";
      price = 150.0;
      department = #computer;
      inStock = true;
    },
  );

  products.add(
    4,
    {
      id = 4;
      name = "Accessories Bundle";
      category = "Electronics";
      description = "Keyboard, mouse, headset combo";
      price = 100.0;
      department = #computer;
      inStock = true;
    },
  );

  // Pre-load Agriculture Products
  products.add(
    5,
    {
      id = 5;
      name = "Hybrid Seeds";
      category = "Seeds";
      description = "High-yield wheat and rice seeds";
      price = 45.0;
      department = #agriculture;
      inStock = true;
    },
  );

  products.add(
    6,
    {
      id = 6;
      name = "Organic Fertilizer";
      category = "Fertilizers";
      description = "Eco-friendly nutrient-rich fertilizer";
      price = 35.0;
      department = #agriculture;
      inStock = true;
    },
  );

  products.add(
    7,
    {
      id = 7;
      name = "Pesticides";
      category = "Pesticides";
      description = "Safe and effective pest control";
      price = 40.0;
      department = #agriculture;
      inStock = true;
    },
  );

  products.add(
    8,
    {
      id = 8;
      name = "Drip Irrigation System";
      category = "Irrigation";
      description = "Water-saving irrigation equipment";
      price = 415.0;
      department = #agriculture;
      inStock = true;
    },
  );

  // Pre-load Computer Services
  computerServices.add(
    1,
    {
      id = 1;
      name = "Laptop Repair";
      description = "Comprehensive repair for all laptop brands";
      price = 120.0;
      duration = "3-5 days";
    },
  );

  computerServices.add(
    2,
    {
      id = 2;
      name = "Hardware Upgrade";
      description = "Install RAM, SSD, graphics cards, etc.";
      price = 65.0;
      duration = "1-2 days";
    },
  );

  computerServices.add(
    3,
    {
      id = 3;
      name = "Software Installation";
      description = "Operating system and software setup";
      price = 25.0;
      duration = "1 day";
    },
  );

  // Pre-load Sample Enquiries
  enquiries.add(
    1,
    {
      id = 1;
      customerName = "Samir";
      phone = "9876543210";
      email = "samir@test.com";
      message = "Interested in desktop PC configuration";
      department = "Computer";
      timestamp = Time.now();
    },
  );

  enquiries.add(
    2,
    {
      id = 2;
      customerName = "Anjali";
      phone = "9876543210";
      email = "anjali@test.com";
      message = "Need advice on using fertilizer for organic farming";
      department = "Agriculture";
      timestamp = Time.now();
    },
  );

  // Pre-load Sample Service Request
  serviceRequests.add(
    1,
    {
      id = 1;
      customerName = "Rahul";
      phone = "9876543210";
      serviceType = "Laptop Repair";
      description = "Screen and keyboard issue";
      status = "Pending";
      timestamp = Time.now();
    },
  );

  // Pre-load Agriculture Tips
  agricultureTips.add(
    1,
    {
      id = 1;
      title = "Soil Testing for Fruit Farming";
      content = "Test your soil before planting to ensure the right mix of nutrients. Use organic fertilizer for better fruit development.";
      crop = "Fruit";
    },
  );

  agricultureTips.add(
    2,
    {
      id = 2;
      title = "Pesticide Safety";
      content = "Use pesticides in recommended quantities and intervals for effectiveness in vegetable fields. Ensure personal protection during application.";
      crop = "Vegetable";
    },
  );

  agricultureTips.add(
    3,
    {
      id = 3;
      title = "Irrigation Practices";
      content = "Adopt drip irrigation for efficient water usage, especially in drought-prone areas for sugar cane crops.";
      crop = "Sugarcane";
    },
  );
};
