// A whole-cluster Blob is committed atomically. Two tabs can never overwrite
// each other's revision: a stale writer must reload and ask for a new attempt.
export class SnapshotConflict extends Error {
  constructor() { super('Another tab saved this workspace. This operation was not saved. Review the latest data before running it again.'); this.name = 'SnapshotConflict'; }
}
export function compatibleSnapshot(record, config) {
  return !record || (record.formatVersion === config.formatVersion && record.seedVersion === config.seedVersion && record.engineVersion === config.engineVersion);
}
export function nextSnapshotRecord(current, expectedRevision, value) {
  if ((current?.revision ?? 0) !== expectedRevision) throw new SnapshotConflict();
  return { ...value, revision: expectedRevision + 1, savedAt: new Date().toISOString() };
}
export function createSnapshotStore(factory = globalThis.indexedDB) {
  let connection;
  const open = () => connection ||= new Promise((resolve, reject) => {
    if (!factory) { reject(new Error('Browser storage is unavailable.')); return; }
    const request = factory.open('as9618-s8-workspaces', 1);
    request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains('workspaces')) request.result.createObjectStore('workspaces', { keyPath: 'id' }); };
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => { db.close(); connection = null; };
      resolve(db);
    };
    request.onerror = () => { connection = null; reject(request.error); };
    request.onblocked = () => { connection = null; reject(new Error('Another open course tab is blocking browser storage. Close it and retry.')); };
  });
  return {
    async read(id) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('workspaces', 'readonly');
        const request = transaction.objectStore('workspaces').get(id);
        let result;
        request.onsuccess = () => { result = request.result || null; };
        transaction.oncomplete = () => resolve(result);
        transaction.onabort = transaction.onerror = () => reject(transaction.error || request.error || new Error('Unable to read the saved workspace.'));
      });
    },
    async commit(id, expectedRevision, value) {
      const db = await open();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('workspaces', 'readwrite');
        const store = transaction.objectStore('workspaces');
        const request = store.get(id);
        let result, error;
        request.onsuccess = () => {
          try { result = nextSnapshotRecord(request.result, expectedRevision, { ...value, id }); store.put(result); }
          catch (caught) { error = caught; transaction.abort(); }
        };
        transaction.oncomplete = () => resolve(result);
        transaction.onabort = transaction.onerror = () => reject(error || transaction.error || new Error('The workspace could not be saved.'));
      });
    },
  };
}
