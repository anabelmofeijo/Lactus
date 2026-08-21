import { describe, expect, it } from "vitest";
import { partnershipRequestInput } from "./routers";

const validRequest = {
  organizationName: "Associação Comunitária do Kwanza",
  contactName: "Maria João",
  email: "maria@example.org",
  phone: "+244 900 000 000",
  requestType: "parceria" as const,
  location: "Kwanza Sul",
  projectContext: "Pretendemos reforçar a sinalização e a orientação numa área comunitária.",
  objectives: "Testar uma solução de energia sustentável com a comunidade.",
  consentToContact: true as const,
};

describe("validação de pedidos de parceria", () => {
  it("aceita um pedido completo e autorizado", () => {
    expect(partnershipRequestInput.parse(validRequest)).toMatchObject(validRequest);
  });

  it("rejeita pedidos sem autorização de contacto", () => {
    expect(() => partnershipRequestInput.parse({ ...validRequest, consentToContact: false })).toThrow();
  });
});
