import { firestore } from '../common/firestore'
import { ImageMeta, isMeta } from 'my-types'
import { FieldValue, WriteResult } from '@google-cloud/firestore'

const images = firestore()
  .collection('images')
  .withConverter<ImageMeta>({
    fromFirestore: (data) => {
      if (!isMeta(data))
        throw Error(`Image Data from firestore is not of type ImageMeta: ${ JSON.stringify(data) }`)

      return data
    },
    toFirestore: (model) => model
  })

export async function getAll (): Promise<ImageMeta[]> {
  const snap = await images.get()
  return snap.docs.map(x => x.data())
}

export function viewed (name: string): Promise<WriteResult> {
  const partialUpdate = { viewed: FieldValue.increment(1) } as unknown as ImageMeta
  return images.doc(name).set(partialUpdate, { merge: true })
}

export function writeMeta (meta: ImageMeta): Promise<WriteResult> {
  return images.doc(meta.name).set(meta, { merge: true })
}

export function deleteImageMeta (id: string): Promise<WriteResult> {
  return images.doc(id).delete()
}

