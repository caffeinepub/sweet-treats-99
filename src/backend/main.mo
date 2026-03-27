import AccessControl "./authorization/access-control";
import MixinAuth "./authorization/MixinAuthorization";
import BlobMixin "./blob-storage/Mixin";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";

actor {
  // --- Access Control
  let accessControlState = AccessControl.initState();
  include MixinAuth(accessControlState);

  // --- Blob Storage
  include BlobMixin();

  // --- Types
  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : Text;
    featured : Bool;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    customerPhone : Text;
    customerEmail : Text;
    cakeType : Text;
    size : Text;
    flavor : Text;
    quantity : Nat;
    deliveryDate : Text;
    specialNotes : Text;
    status : Text;
    createdAt : Int;
    owner : Principal;
  };

  public type BusinessSettings = {
    businessName : Text;
    location : Text;
    address : Text;
    phone : Text;
    whatsappNumber : Text;
    email : Text;
    openingHours : Text;
  };

  // --- State
  var products : [Product] = [
    { id = 1; name = "Classic Birthday Cake"; description = "A beautifully decorated vanilla sponge cake with colorful buttercream frosting, perfect for any birthday celebration."; price = 45.99; category = "Birthday"; imageUrl = ""; featured = true },
    { id = 2; name = "Elegant Wedding Cake"; description = "Three-tiered white fondant wedding cake with delicate floral decorations and gold accents."; price = 249.99; category = "Wedding"; imageUrl = ""; featured = true },
    { id = 3; name = "Chocolate Truffle Cake"; description = "Rich dark chocolate cake layered with silky chocolate ganache and topped with premium chocolate truffles."; price = 55.99; category = "Birthday"; imageUrl = ""; featured = false },
    { id = 4; name = "Cupcake Box (12 pcs)"; description = "A dozen freshly baked cupcakes in assorted flavors: vanilla, chocolate, red velvet, and lemon."; price = 28.99; category = "Cupcakes"; imageUrl = ""; featured = true },
    { id = 5; name = "Custom Photo Cake"; description = "Personalized cake featuring your chosen photo printed on edible paper, perfect for any occasion."; price = 65.99; category = "Custom"; imageUrl = ""; featured = true },
    { id = 6; name = "Red Velvet Cake"; description = "Classic Southern red velvet cake with cream cheese frosting and velvet crumb topping."; price = 48.99; category = "Birthday"; imageUrl = ""; featured = false }
  ];
  var nextProductId : Nat = 7;

  var orders : [Order] = [];
  var nextOrderId : Nat = 1;

  var settings : BusinessSettings = {
    businessName = "Sweet Treats 99";
    location = "New York, NY";
    address = "123 Bakery Lane, New York, NY 10001";
    phone = "+1 (555) 123-4567";
    whatsappNumber = "+15551234567";
    email = "hello@sweettreats99.com";
    openingHours = "Mon-Sat: 8am-8pm, Sun: 9am-6pm";
  };

  // --- Products
  public query func getProducts() : async [Product] {
    products
  };

  public query func getFeaturedProducts() : async [Product] {
    products.filter(func(p : Product) : Bool { p.featured })
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.filter(func(p : Product) : Bool { p.category == category })
  };

  public shared ({ caller }) func addProduct(
    name : Text, description : Text, price : Float,
    category : Text, imageUrl : Text, featured : Bool
  ) : async Nat {
    assert AccessControl.isAdmin(accessControlState, caller);
    let id = nextProductId;
    nextProductId += 1;
    let newProduct : Product = { id; name; description; price; category; imageUrl; featured };
    products := products.concat([newProduct]);
    id
  };

  public shared ({ caller }) func updateProduct(
    id : Nat, name : Text, description : Text, price : Float,
    category : Text, imageUrl : Text, featured : Bool
  ) : async Bool {
    assert AccessControl.isAdmin(accessControlState, caller);
    var found = false;
    products := products.map(func(p : Product) : Product {
      if (p.id == id) { found := true; { id; name; description; price; category; imageUrl; featured } } else p
    });
    found
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async Bool {
    assert AccessControl.isAdmin(accessControlState, caller);
    let before = products.size();
    products := products.filter(func(p : Product) : Bool { p.id != id });
    products.size() < before
  };

  // --- Orders
  public shared ({ caller }) func placeOrder(
    customerName : Text, customerPhone : Text, customerEmail : Text,
    cakeType : Text, size : Text, flavor : Text,
    quantity : Nat, deliveryDate : Text, specialNotes : Text
  ) : async Nat {
    let id = nextOrderId;
    nextOrderId += 1;
    let newOrder : Order = {
      id; customerName; customerPhone; customerEmail;
      cakeType; size; flavor; quantity; deliveryDate; specialNotes;
      status = "pending"; createdAt = Time.now(); owner = caller
    };
    orders := orders.concat([newOrder]);
    id
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    orders.filter(func(o : Order) : Bool { Principal.equal(o.owner, caller) })
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    assert AccessControl.isAdmin(accessControlState, caller);
    orders
  };

  public shared ({ caller }) func updateOrderStatus(id : Nat, status : Text) : async Bool {
    assert AccessControl.isAdmin(accessControlState, caller);
    var found = false;
    orders := orders.map(func(o : Order) : Order {
      if (o.id == id) { found := true; { o with status } } else o
    });
    found
  };

  // --- Settings
  public query func getSettings() : async BusinessSettings {
    settings
  };

  public shared ({ caller }) func updateSettings(
    businessName : Text, location : Text, address : Text,
    phone : Text, whatsappNumber : Text, email : Text, openingHours : Text
  ) : async () {
    assert AccessControl.isAdmin(accessControlState, caller);
    settings := { businessName; location; address; phone; whatsappNumber; email; openingHours };
  };
}
