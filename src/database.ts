import lodashId from 'lodash-id'
import Lowdb, { LowdbSync } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import { Data, InnerData } from './types/entity'

export class Db {
  public db: LowdbSync<Data>

  constructor() {
    this.db = this.createConnection()
  }

  public createConnection() {
    const adapter = new FileSync<Data>(path.resolve(__dirname, 'data/db.json'))
    const db = Lowdb(adapter)
    db._.mixin(lodashId)
    return db
  }

  public getConnection() {
    return this.db
  }

  public all<T extends keyof Data>(key: T) {
    return this.getConnection().get(key).value()
  }

  public get<T extends keyof Data>(key: T, id: string) {
    return this.getConnection().get(key).getById(id).value()
  }

  public insert<T extends keyof Data, K extends InnerData<T>>(key: T, data: K) {
    this.getConnection()
      .get(key)
      .insert(data as any)
      .write()
    return data
  }

  public update<T extends keyof Data, K extends InnerData<T>>(
    key: T,
    id: string,
    partial: Partial<K>
  ) {
    this.getConnection().get(key).updateById(id, partial).write()
    return this.get(key, id)
  }

  public remove<T extends keyof Data>(key: T, id: string) {
    return this.getConnection().get(key).removeById(id).write()
  }
}
