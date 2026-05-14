import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { User } from "./src/types/user";
import { Product } from "./src/types/product";
import { Order } from "./src/types/order";
import { Commission } from "./src/types/commission";
import { RewardTicket } from "./src/types/reward";
import { initialUsers, initialProducts } from "./src/data/seed";

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log(`Starting server in ${process.env.NODE_ENV || 'development'} mode...`);

  app.use(express.json());
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: process.env.NODE_ENV || 'development' });
  });

  app.use('/images', express.static(path.join(process.cwd(), 'images')));

  // --- Mock Database ---
  let users: User[] = [...initialUsers];
  let products: Product[] = [...initialProducts];
  let orders: Order[] = [
    {
      id: "ORD-101",
      orderCode: "BS-882291",
      customerName: "Lê Hoàng An",
      customerPhone: "0901234567",
      customerAddress: "123 Đường Song Hành, Phường An Phú, Quận 2, TP. Hồ Chí Minh",
      productId: "p1",
      supplierId: "supp1",
      quantity: 1,
      subtotal: 3200000,
      shippingFee: 30000,
      total: 3230000,
      paymentStatus: "paid",
      paymentMethod: "qr",
      deliveryMethod: "standard",
      fulfillmentStatus: "completed",
      reconciliationStatus: "reconciled",
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      paidAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 1).toISOString()
    },
    {
      id: "ORD-102",
      orderCode: "BS-119283",
      customerName: "Lê Hoàng An",
      customerPhone: "0901234567",
      customerAddress: "123 Đường Song Hành, Phường An Phú, Quận 2, TP. Hồ Chí Minh",
      productId: "p3",
      supplierId: "supp1",
      quantity: 1,
      subtotal: 7900000,
      shippingFee: 30000,
      total: 7930000,
      paymentStatus: "paid",
      paymentMethod: "qr",
      deliveryMethod: "standard",
      fulfillmentStatus: "shipped",
      reconciliationStatus: "pending",
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      paidAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      shippedAt: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      id: "ORD-103",
      orderCode: "BS-445566",
      customerName: "Lê Hoàng An",
      customerPhone: "0901234567",
      customerAddress: "123 Đường Song Hành, Phường An Phú, Quận 2, TP. Hồ Chí Minh",
      productId: "p5",
      supplierId: "supp1",
      quantity: 1,
      subtotal: 1250000,
      shippingFee: 30000,
      total: 1280000,
      paymentStatus: "pending",
      paymentMethod: "qr",
      deliveryMethod: "standard",
      fulfillmentStatus: "new",
      reconciliationStatus: "pending",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: "ORD-104",
      orderCode: "BS-778899",
      customerName: "Lê Hoàng An",
      customerPhone: "0901234567",
      customerAddress: "123 Đường Song Hành, Phường An Phú, Quận 2, TP. Hồ Chí Minh",
      productId: "p8",
      supplierId: "supp1",
      quantity: 1,
      subtotal: 39990000,
      shippingFee: 0,
      total: 39990000,
      paymentStatus: "paid",
      paymentMethod: "qr",
      deliveryMethod: "express",
      fulfillmentStatus: "completed",
      reconciliationStatus: "reconciled",
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      paidAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      id: "ORD-105",
      orderCode: "BS-223344",
      customerName: "Lê Hoàng An",
      customerPhone: "0901234567",
      customerAddress: "123 Đường Song Hành, Phường An Phú, Quận 2, TP. Hồ Chí Minh",
      productId: "p9",
      supplierId: "supp1",
      quantity: 2,
      subtotal: 7700000,
      shippingFee: 30000,
      total: 7730000,
      paymentStatus: "paid",
      paymentMethod: "qr",
      deliveryMethod: "standard",
      fulfillmentStatus: "completed",
      reconciliationStatus: "reconciled",
      createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      paidAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 12).toISOString()
    },
    {
      id: "ORD-106",
      orderCode: "BS-112233",
      customerName: "Lê Hoàng An",
      customerPhone: "0901234567",
      customerAddress: "123 Đường Song Hành, Phường An Phú, Quận 2, TP. Hồ Chí Minh",
      productId: "p14",
      supplierId: "supp1",
      quantity: 1,
      subtotal: 8490000,
      shippingFee: 0,
      total: 8490000,
      paymentStatus: "paid",
      paymentMethod: "qr",
      deliveryMethod: "express",
      fulfillmentStatus: "shipped",
      reconciliationStatus: "pending",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      paidAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "ORD-107",
      orderCode: "BS-445566",
      customerName: "Lê Hoàng An",
      customerPhone: "0901234567",
      customerAddress: "123 Đường Song Hành, Phường An Phú, Quận 2, TP. Hồ Chí Minh",
      productId: "p12",
      supplierId: "supp1",
      quantity: 1,
      subtotal: 34990000,
      shippingFee: 0,
      total: 34990000,
      paymentStatus: "pending",
      paymentMethod: "qr",
      deliveryMethod: "express",
      fulfillmentStatus: "new",
      reconciliationStatus: "pending",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ];
  let commissions: Commission[] = [];
  let rewardTickets: RewardTicket[] = [
    {
      id: "TKT-101-1",
      orderId: "ORD-101",
      customerPhone: "0901234567",
      status: "winner",
      ticketCode: "WIN-9999",
      rewardType: "DexSpace Lottery",
      issuedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      confirmedAt: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: "TKT-102-1",
      orderId: "ORD-102",
      customerPhone: "0901234567",
      status: "confirmed",
      ticketCode: "BX-12345",
      rewardType: "DexSpace Lottery",
      issuedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      confirmedAt: new Date(Date.now() - 86400000 * 1).toISOString()
    }
  ];
  let affiliateClicks: { id: string; partnerId: string; productId: string; timestamp: string }[] = [];

  // Seed some initial commissions for u2
  commissions = [
    {
      id: "COM-1",
      orderId: "ORD-1",
      partnerId: "u2",
      productId: "p1",
      commissionRate: 18,
      orderAmount: 3200000,
      commissionAmount: 576000,
      status: "confirmed",
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      confirmedAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "COM-2",
      orderId: "ORD-2",
      partnerId: "u2",
      productId: "p2",
      commissionRate: 18,
      orderAmount: 150000,
      commissionAmount: 27000,
      status: "pending",
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: "COM-3",
      orderId: "ORD-3",
      partnerId: "u2",
      productId: "p1",
      commissionRate: 18,
      orderAmount: 3200000,
      commissionAmount: 576000,
      status: "paid",
      createdAt: new Date(Date.now() - 86400000 * 35).toISOString(),
      paidAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ];

  // --- API Routes ---

  // Supplier Endpoints
  app.get("/api/supplier/stats", (req, res) => {
    const supplierId = req.headers["x-user-id"] as string;
    const myProducts = products.filter(p => p.supplierId === supplierId);
    const myOrders = orders.filter(o => o.supplierId === supplierId);
    
    res.json({
      totalProducts: myProducts.length,
      totalOrders: myOrders.length,
      totalRevenue: myOrders.reduce((a, b) => a + b.subtotal, 0),
      payableAmount: myOrders.reduce((a, b) => a + (b.subtotal * 0.7), 0), // 70% to supplier mock
      pendingFulfillment: myOrders.filter(o => o.fulfillmentStatus === "new").length
    });
  });

  app.get("/api/supplier/products", (req, res) => {
    const supplierId = req.headers["x-user-id"] as string;
    res.json(products.filter(p => p.supplierId === supplierId));
  });

  app.patch("/api/supplier/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
      Object.assign(product, req.body);
      res.json(product);
    } else res.status(404).json({ error: "Not found" });
  });

  app.get("/api/supplier/orders", (req, res) => {
    const supplierId = req.headers["x-user-id"] as string;
    res.json(orders.filter(o => o.supplierId === supplierId));
  });

  // Operator Endpoints
  app.get("/api/operator/stats", (req, res) => {
    res.json({
      gmv: orders.reduce((a, b) => a + b.total, 0),
      orders: orders.length,
      totalCommission: commissions.reduce((a, b) => a + b.commissionAmount, 0),
      totalTickets: rewardTickets.length,
      pendingReconciliation: orders.filter(o => o.fulfillmentStatus === "completed" && o.reconciliationStatus === "pending").length,
      pendingCommissions: commissions.filter(c => c.status === "pending").length,
      pendingTickets: rewardTickets.filter(t => t.status === "confirmed").length, // 'confirmed' means waiting for lottery results
      totalUsers: users.length
    });
  });

  app.get("/api/operator/users", (req, res) => {
    res.json(users);
  });

  app.get("/api/operator/reconciliation-queue", (req, res) => {
    res.json(orders.filter(o => o.fulfillmentStatus === "completed" && o.reconciliationStatus === "pending"));
  });

  app.post("/api/operator/reconcile/:id", (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (order) {
      order.reconciliationStatus = "reconciled";
      order.reconciledAt = new Date().toISOString();
      
      const comm = commissions.find(c => c.orderId === order.id);
      if (comm) {
        comm.status = "confirmed";
        comm.confirmedAt = new Date().toISOString();
      }

      const ticketsToConfirm = rewardTickets.filter(t => t.orderId === order.id);
      ticketsToConfirm.forEach(t => {
        t.status = "confirmed";
        t.confirmedAt = new Date().toISOString();
      });

      // Automatic Lottery Logic: Draw when we hit 10 confirmed tickets (for demo)
      const LOTTERY_THRESHOLD = 10;
      const pool = rewardTickets.filter(t => t.status === "confirmed");
      
      if (pool.length >= LOTTERY_THRESHOLD) {
         // Select 1 random winner
         const winnerIndex = Math.floor(Math.random() * pool.length);
         pool.forEach((t, idx) => {
            if (idx === winnerIndex) {
               t.status = "winner";
            } else {
               t.status = "expired";
            }
         });
      }
      
      res.json({ success: true, order });
    } else res.status(404).json({ error: "Order not found" });
  });

  // Auth (Mock)
  app.get("/api/auth/me", (req, res) => {
    const userId = req.headers["x-user-id"] || "u1";
    const user = users.find(u => u.id === userId);
    res.json(user);
  });

  // Products
  app.get("/api/products", (req, res) => res.json(products));
  app.get("/api/products/:id", (req, res) => {
    const p = products.find(p => p.id === req.params.id);
    p ? res.json(p) : res.status(404).json({ error: "Not found" });
  });

  app.get("/api/products/slug/:slug", (req, res) => {
    const p = products.find(p => p.slug === req.params.slug);
    if (p) {
      // Track affiliate click if partnerId is provided
      const partnerId = req.query.partner as string;
      if (partnerId) {
        affiliateClicks.push({
          id: `CLK-${Date.now()}`,
          partnerId,
          productId: p.id,
          timestamp: new Date().toISOString()
        });
      }
      res.json(p);
    } else res.status(404).json({ error: "Not found" });
  });

  // Orders
  app.post("/api/orders", (req, res) => {
    const { productId, checkoutInfo, partnerId, affiliateLinkId } = req.body;
    const customerId = req.headers["x-user-id"] as string || "u1";
    const product = products.find(p => p.id === productId);
    
    if (!product) return res.status(404).json({ error: "Product not found" });

    const order: Order = {
      id: `ORD-${Date.now()}`,
      orderCode: `BS-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: checkoutInfo.name,
      customerPhone: checkoutInfo.phone,
      customerAddress: checkoutInfo.address,
      productId,
      supplierId: product.supplierId,
      partnerId,
      affiliateLinkId,
      quantity: 1, // Default for MVP
      subtotal: product.price,
      shippingFee: 30000, // Default for MVP
      total: product.price + 30000,
      paymentStatus: "pending",
      paymentMethod: checkoutInfo.paymentMethod || "qr",
      deliveryMethod: "standard",
      fulfillmentStatus: "new",
      reconciliationStatus: "pending",
      createdAt: new Date().toISOString()
    };

    orders.push(order);

    // Create Reward Tickets immediately (status: pending)
    const TICKETS_PER_AMOUNT = 100000;
    const ticketCount = Math.floor(order.subtotal / TICKETS_PER_AMOUNT) || 1;
    
    for (let i = 0; i < ticketCount; i++) {
      const ticket: RewardTicket = {
        id: `TKT-${Date.now()}-${i}`,
        orderId: order.id,
        customerPhone: order.customerPhone,
        status: "pending",
        ticketCode: `BX-${Math.floor(10000 + Math.random() * 90000)}`,
        rewardType: "DexSpace Lottery",
        issuedAt: new Date().toISOString()
      };
      rewardTickets.push(ticket);
    }

    res.status(201).json(order);
  });

  // Simulate Payment Callback (Sepay Mock)
  // This endpoint simulates the webhook from a payment gateway like Sepay
  app.post("/api/orders/:id/simulate-payment", (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.paymentStatus = "paid";
    order.paidAt = new Date().toISOString();
    
    // Confirm existing tickets
    const tickets = rewardTickets.filter(t => t.orderId === order.id);
    tickets.forEach(t => {
      t.status = "confirmed";
      t.confirmedAt = new Date().toISOString();
    });

    // Create Commission if applicable
    if (order.partnerId) {
      const product = products.find(p => p.id === order.productId);
      const partner = users.find(u => u.id === order.partnerId);
      const rate = partner?.partnerType === "registered" ? product?.regCommission || 18 : product?.pubCommission || 5;
      
      const commission: Commission = {
        id: `COM-${Date.now()}`,
        orderId: order.id,
        partnerId: order.partnerId,
        productId: order.productId,
        commissionRate: rate,
        orderAmount: order.subtotal,
        commissionAmount: (order.subtotal * (rate || 0)) / 100,
        status: "pending",
        createdAt: new Date().toISOString()
      };
      commissions.push(commission);
    }

    res.json({ success: true, order });
  });

  app.get("/api/orders", (req, res) => {
    const userId = req.headers["x-user-id"] as string;
    const user = users.find(u => u.id === userId);
    
    if (user?.role === "customer") return res.json(orders.filter(o => o.customerPhone === user.phone)); // Use phone for customer identification in orders
    if (user?.role === "partner") return res.json(orders.filter(o => o.partnerId === userId));
    if (user?.role === "supplier") {
      return res.json(orders.filter(o => o.supplierId === userId));
    }
    res.json(orders);
  });

  app.patch("/api/orders/:id", (req, res) => {
    const { fulfillmentStatus, paymentStatus } = req.body;
    const order = orders.find(o => o.id === req.params.id);
    if (order) {
      if (fulfillmentStatus) {
        order.fulfillmentStatus = fulfillmentStatus;
        if (fulfillmentStatus === "processing") order.processingAt = new Date().toISOString();
        if (fulfillmentStatus === "shipped") order.shippedAt = new Date().toISOString();
        if (fulfillmentStatus === "completed") order.completedAt = new Date().toISOString();
      }
      if (paymentStatus) {
        order.paymentStatus = paymentStatus;
        if (paymentStatus === "paid") order.paidAt = new Date().toISOString();
      }
      
      // Update status tags 
      if (fulfillmentStatus === "completed") {
        order.completedAt = new Date().toISOString();
        // The order is now ready for Operator Reconciliation
        order.reconciliationStatus = "pending";
      }
      
      res.json(order);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });

  // Partner Stats
  app.get("/api/partner/stats", (req, res) => {
    const partnerId = req.headers["x-user-id"] as string;
    const myCommissions = commissions.filter(c => c.partnerId === partnerId);
    const myOrders = orders.filter(o => o.partnerId === partnerId);
    
    const pending = myCommissions.filter(c => c.status === "pending").reduce((a, b) => a + b.commissionAmount, 0);
    const confirmed = myCommissions.filter(c => c.status === "confirmed").reduce((a, b) => a + b.commissionAmount, 0);
    const paid = myCommissions.filter(c => c.status === "paid").reduce((a, b) => a + b.commissionAmount, 0);
    
    const revenue = myOrders.reduce((a, b) => a + b.subtotal, 0);
    const clicks = affiliateClicks.filter(c => c.partnerId === partnerId).length;
    const conversionRate = clicks > 0 ? (myOrders.length / clicks * 100).toFixed(1) : "0.0";
    
    res.json({
      clicks,
      orders: myOrders.length,
      revenue,
      pending,
      confirmed,
      paid,
      conversionRate
    });
  });

  app.get("/api/partner/commissions", (req, res) => {
    const partnerId = req.headers["x-user-id"] as string;
    const myCommissions = commissions.filter(c => c.partnerId === partnerId)
      .map(c => {
        const product = products.find(p => p.id === c.productId);
        return { ...c, productName: product?.name };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(myCommissions);
  });

  app.get("/api/partner/payouts", (req, res) => {
    const partnerId = req.headers["x-user-id"] as string;
    // Mocking monthly payouts
    res.json([
      { id: "P1", month: "04/2026", amount: 1250000, status: "paid", createdAt: "2026-04-15" },
      { id: "P2", month: "05/2026", amount: 850000, status: "pending", createdAt: "2026-05-15" }
    ]);
  });

  // Rewards
  app.get("/api/rewards", (req, res) => {
    const userId = req.headers["x-user-id"] as string;
    const user = users.find(u => u.id === userId);
    
    // Always include a winner mock for the first-time view to highlight the UI
    const myTickets = rewardTickets.filter(t => t.customerPhone === user?.phone || t.orderId?.includes(userId));
    
    if (myTickets.length === 0 && user) {
       return res.json([
         {
           id: `t-winner-mock`,
           orderId: "ORD-SAMPLE",
           customerPhone: user.phone,
           ticketCode: `WIN-7777`,
           status: 'winner',
           rewardType: 'DexSpace Lottery',
           issuedAt: new Date().toISOString()
         },
         {
           id: `t-pending-mock`,
           orderId: "ORD-SAMPLE-2",
           customerPhone: user.phone,
           ticketCode: `LUCK-8888`,
           status: 'confirmed',
           rewardType: 'DexSpace Lottery',
           issuedAt: new Date(Date.now() - 86400000).toISOString()
         }
       ]);
    }
    res.json(myTickets);
  });

  app.get("/api/rewards/:id", (req, res) => {
    const ticket = rewardTickets.find(t => t.id === req.params.id);
    if (ticket) {
      res.json(ticket);
    } else {
      // Mock lookup for demo tickets
      if (req.params.id === 't-winner-mock') {
        res.json({
          id: `t-winner-mock`,
          orderId: "ORD-SAMPLE",
          customerPhone: "0123456789",
          ticketCode: `WIN-7777`,
          status: 'winner',
          rewardType: 'DexSpace Lottery',
          issuedAt: new Date().toISOString(),
          confirmedAt: new Date().toISOString(),
          sequence: '777'
        });
      } else if (req.params.id === 't-pending-mock') {
        res.json({
          id: `t-pending-mock`,
          orderId: "ORD-SAMPLE-2",
          customerPhone: "0123456789",
          ticketCode: `LUCK-8888`,
          status: 'confirmed',
          rewardType: 'DexSpace Lottery',
          issuedAt: new Date(Date.now() - 86400000).toISOString(),
          confirmedAt: new Date().toISOString(),
          sequence: '888'
        });
      } else {
        res.status(404).json({ error: "Ticket not found" });
      }
    }
  });

  app.get("/api/rewards/track", (req, res) => {
    const query = req.query.q as string;
    if (!query) return res.json({ tickets: [], orders: [] });
    
    // Search tickets
    const matchedTickets = rewardTickets.filter(t => {
      const order = orders.find(o => o.id === t.orderId);
      return t.ticketCode.toLowerCase().includes(query.toLowerCase()) || 
             (order && (order.orderCode?.toLowerCase().includes(query.toLowerCase()) || order.customerPhone?.includes(query)));
    });

    // Search orders specifically
    const matchedOrders = orders.filter(o => 
      o.orderCode?.toLowerCase().includes(query.toLowerCase()) || 
      o.customerPhone?.includes(query)
    ).map(o => {
      const product = products.find(p => p.id === o.productId);
      return { ...o, productName: product?.name };
    });

    res.json({ tickets: matchedTickets, orders: matchedOrders });
  });

  // Operator Tickets
  app.get("/api/operator/tickets/pending", (req, res) => {
    const pending = rewardTickets.filter(t => t.status === "pending" || t.status === "confirmed").map(t => {
       const order = orders.find(o => o.id === t.orderId);
       return { ...t, orderCode: order?.orderCode, customerName: order?.customerName };
    });
    res.json(pending);
  });

  app.post("/api/operator/tickets/:id/:action", (req, res) => {
    const ticket = rewardTickets.find(t => t.id === req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    
    if (req.params.action === "confirm") {
      ticket.status = "confirmed";
      ticket.confirmedAt = new Date().toISOString();
    } else if (req.params.action === "winner") {
      ticket.status = "winner";
    } else if (req.params.action === "expired") {
      ticket.status = "expired";
    }
    res.json(ticket);
  });

  app.get("/api/operator/commissions/pending", (req, res) => {
    const pending = commissions.filter(c => c.status === "pending" || c.status === "confirmed").map(c => {
       const partner = users.find(u => u.id === c.partnerId);
       const order = orders.find(o => o.id === c.orderId);
       return { ...c, partnerName: partner?.name, orderCode: order?.orderCode };
    });
    res.json(pending);
  });

  app.post("/api/operator/commissions/:id/:action", (req, res) => {
    const commission = commissions.find(c => c.id === req.params.id);
    if (!commission) return res.status(404).json({ error: "Commission not found" });
    
    if (req.params.action === "confirm") {
      commission.status = "confirmed";
      commission.confirmedAt = new Date().toISOString();
    } else if (req.params.action === "pay") {
      commission.status = "paid";
      commission.paidAt = new Date().toISOString();
    }
    res.json(commission);
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BuyXShare Server running on http://localhost:${PORT}`);
  });
}

startServer();
