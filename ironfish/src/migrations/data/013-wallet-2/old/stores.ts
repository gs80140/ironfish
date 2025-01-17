/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {
  BUFFER_ENCODING,
  IDatabase,
  StringEncoding,
  StringHashEncoding,
  U32_ENCODING,
} from '../../../../storage'
import { AccountsStore, AccountsValueEncoding } from './accounts'
import { HeaderEncoding, HeadersStore } from './headers'
import { AccountsDBMeta, MetaStore, MetaValueEncoding } from './meta'
import { NoteToNullifierStore, NoteToNullifiersValueEncoding } from './noteToNullifier'
import { NullifierToNoteStore } from './nullifierToNote'
import { SequenceToHashStore } from './sequenceToHash'
import { TransactionsStore, TransactionsValueEncoding } from './transactions'

export type OldStores = {
  meta: MetaStore
  accounts: AccountsStore
  noteToNullifier: NoteToNullifierStore
  nullifierToNote: NullifierToNoteStore
  transactions: TransactionsStore
  headers: HeadersStore
  sequenceToHash: SequenceToHashStore
}

export function loadOldStores(db: IDatabase, chainDb: IDatabase): OldStores {
  const meta: MetaStore = db.addStore({
    name: 'meta',
    keyEncoding: new StringEncoding<keyof AccountsDBMeta>(),
    valueEncoding: new MetaValueEncoding(),
  })

  const accounts: AccountsStore = db.addStore({
    name: 'accounts',
    keyEncoding: new StringEncoding(),
    valueEncoding: new AccountsValueEncoding(),
  })

  const noteToNullifier: NoteToNullifierStore = db.addStore({
    name: 'noteToNullifier',
    keyEncoding: new StringHashEncoding(),
    valueEncoding: new NoteToNullifiersValueEncoding(),
  })

  const nullifierToNote: NullifierToNoteStore = db.addStore({
    name: 'nullifierToNote',
    keyEncoding: new StringHashEncoding(),
    valueEncoding: new StringEncoding(),
  })

  const transactions: TransactionsStore = db.addStore({
    name: 'transactions',
    keyEncoding: BUFFER_ENCODING,
    valueEncoding: new TransactionsValueEncoding(),
  })

  const headers: HeadersStore = chainDb.addStore({
    name: 'bh',
    keyEncoding: BUFFER_ENCODING,
    valueEncoding: new HeaderEncoding(),
  })

  const sequenceToHash: SequenceToHashStore = chainDb.addStore({
    name: 'bS',
    keyEncoding: U32_ENCODING,
    valueEncoding: BUFFER_ENCODING,
  })

  return {
    meta,
    accounts,
    noteToNullifier,
    nullifierToNote,
    transactions,
    headers,
    sequenceToHash,
  }
}
