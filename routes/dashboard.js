import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { PropertyService } from "../service/PropertyService.js";
import { AgentService } from "../service/AgentService.js";
import { CareerService } from "../service/CareerService.js";
import { JobApplicationService } from "../service/JobApplicationService.js";
import { ValuationRequestService } from "../service/ValuationRequestService.js";
import { ComplianceRequestService } from "../service/ComplianceRequestService.js";
import { BondApplicationService } from "../service/BondApplicationService.js";
import { PreQualificationApplicationService } from "../service/PreQualificationApplicationService.js";
import { OfferToPurchaseService } from "../service/OfferToPurchaseService.js";
import { LegalAdviceRequestService } from "../service/LegalAdviceRequestService.js";
import { ClientRequestService } from "../service/ClientRequestService.js";

const router = express.Router();
router.use(authMiddleware);

const createCrudRouter = (service, resourceName) => {
  const resource = express.Router();

  resource.get("/", async (req, res) => {
    const items = await service.getAll(req.query || {});
    res.json(items);
  });

  resource.get("/:id", async (req, res) => {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ message: `${resourceName} not found.` });
    res.json(item);
  });

  resource.post("/", async (req, res) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  });

  resource.put("/:id", async (req, res) => {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ message: `${resourceName} not found.` });
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  });

  resource.delete("/:id", async (req, res) => {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ message: `${resourceName} not found.` });
    await service.delete(req.params.id);
    res.json({ message: `${resourceName} deleted.` });
  });

  return resource;
};

router.use("/properties", createCrudRouter(PropertyService, "Property"));
router.use("/agents", createCrudRouter(AgentService, "Agent"));
router.use("/careers", createCrudRouter(CareerService, "Career"));

router.get("/submissions", async (req, res) => {
  const [jobApplications, valuations, complianceRequests, bondApplications, prequalificationApplications, offers, legalRequests, contactMessages] =
    await Promise.all([
      JobApplicationService.getAll(),
      ValuationRequestService.getAll(),
      ComplianceRequestService.getAll(),
      BondApplicationService.getAll(),
      PreQualificationApplicationService.getAll(),
      OfferToPurchaseService.getAll(),
      LegalAdviceRequestService.getAll(),
      ClientRequestService.findAll(),
    ]);

  res.json({
    jobApplications,
    valuations,
    complianceRequests,
    bondApplications,
    prequalificationApplications,
    offers,
    legalRequests,
    contactMessages,
  });
});

router.get("/submissions/job-applications", async (req, res) => {
  const items = await JobApplicationService.getAll();
  res.json(items);
});

router.get("/submissions/valuation-requests", async (req, res) => {
  const items = await ValuationRequestService.getAll();
  res.json(items);
});

router.get("/submissions/compliance-requests", async (req, res) => {
  const items = await ComplianceRequestService.getAll();
  res.json(items);
});

router.get("/submissions/bond-applications", async (req, res) => {
  const items = await BondApplicationService.getAll();
  res.json(items);
});

router.get("/submissions/prequalification-applications", async (req, res) => {
  const items = await PreQualificationApplicationService.getAll();
  res.json(items);
});

router.get("/submissions/offer-to-purchase", async (req, res) => {
  const items = await OfferToPurchaseService.getAll();
  res.json(items);
});

router.get("/submissions/legal-advice-requests", async (req, res) => {
  const items = await LegalAdviceRequestService.getAll();
  res.json(items);
});

router.get("/submissions/contact-messages", async (req, res) => {
  const items = await ClientRequestService.findAll();
  res.json(items);
});

export default router;
