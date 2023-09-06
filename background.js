chrome.runTime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ websites: [] });
});
