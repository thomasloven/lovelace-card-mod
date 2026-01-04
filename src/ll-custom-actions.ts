// Add a listener to allow to clear Frontend cache via Home Assistant action
window.addEventListener("card-mod-bootstrap", async (ev: CustomEvent) => {
  ev.stopPropagation();
  document.addEventListener("ll-custom", (event: CustomEvent) => {
    const detail = event.detail;
    if (!detail || typeof detail !== "object") {
      return;
    }
    const cardMod = (detail as any).card_mod;
    if (!cardMod || typeof cardMod !== "object") {
      return;
    }
    const actionName = (cardMod as any).action;
    if (actionName && typeof actionName === "string" && typeof actions[actionName] === "function") {
      try {
        const result = (actions as any)[actionName]();
        if (result && typeof (result as Promise<unknown>).catch === "function") {
          (result as Promise<unknown>).catch((error: unknown) => {
            console.error(`Error while executing action "${actionName}":`, error);
          });
        }
      } catch (error) {
        console.error(`Error while executing action "${actionName}":`, error);
      }
    }
  });
});

class actions {
  static async clear_cache() {
    if (window.caches) {
      try {
        const cacheNames = await window.caches.keys();
        const deletePromises: Promise<boolean>[] = [];
        cacheNames.forEach((cacheName) => {
          deletePromises.push(window.caches.delete(cacheName));
        });
        await Promise.all(deletePromises);
        window.location.reload();
      } catch (error) {
        console.error("Failed to clear caches:", error);
        // Fallback: force a full reload even if cache clearing fails
        window.location.reload();
      }
    } else {
      window.location.reload();
    }
  }
}