import lodashId from 'lodash-id'
import Lowdb, { LowdbSync } from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import { Data } from './types/entity'

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

  public all(key: keyof Data) {
    return this.getConnection().get(key).value()
  }

  public get(key: keyof Data, id: string) {
    return this.getConnection().get(key).getById(id).value()
  }

  public insert<T extends unknown>(key: keyof Data, data: T) {
    this.getConnection()
      .get(key)
      .insert(data as any)
      .write()
    return data
  }

  public update<T extends unknown>(key: keyof Data, id: string, partial: T) {
    this.getConnection()
      .get(key)
      .updateById(id, partial as any)
      .write()
    return this.get(key, id) as T
  }

  public remove(key: keyof Data, id: string) {
    return this.getConnection().get(`${key}.data`, []).removeById(id).write()
  }
}
