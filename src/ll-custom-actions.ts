// Add a listener to allow to clear Frontend cache via Home Assistant action
window.addEventListener("card-mod-bootstrap", async (ev: CustomEvent) => {
  ev.stopPropagation();
  document.addEventListener("ll-custom", (event: CustomEvent) => {
    const actionName = event.detail?.card_mod?.action;
    if (actionName && typeof actionName === 'string' && typeof actions[actionName] === 'function') {
      actions[actionName]();
    }
  });
});

class actions {
  static clear_cache() {
    if (window.caches) {
      let cacheDeletePromises = [];
      window.caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          cacheDeletePromises.push(window.caches.delete(cacheName));
        });
        Promise.all(cacheDeletePromises).then(() => {
          window.location.reload();
        });
      });
    } else {
      window.location.href = window.location.href;
    }
  }
}