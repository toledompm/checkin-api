export type CacheRecord = {
  key: string;
  value: any;
};

export interface CacheService {
  store(record: CacheRecord): Promise<void>;
  delete(key: string): Promise<void>;
  find(key: string): Promise<CacheRecord>;
}
