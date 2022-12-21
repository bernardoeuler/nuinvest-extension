export function handleStorageChange(changes, type) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in "${type}" storage changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
}