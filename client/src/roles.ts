export const RBAC_RULES = {
  admin: {
    view: ["home", "single", "cart", "admin"],
    actions: ["user:delete", "product:delete", "product:add"],
  },
  user: {
    view: ["home", "single", "cart"],
    actions: [],
  },
};
