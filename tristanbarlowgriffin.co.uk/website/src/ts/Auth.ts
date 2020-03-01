import { apiRequest } from './request'

export type AuthListner = ((isAuthed: boolean) => void)
export class Auth {
  private static _inst: Auth
  private key: string = ''
  private isAuthed: boolean = false
  private authStateListners: { [id: string]: AuthListner } = {}

  static get inst (): Auth {
    return Auth._inst ? Auth._inst : Auth._inst = new Auth()
  }

  static get key (): string {
    if (!Auth.inst) return ''
    return Auth.key
  }

  static get isAuthed (): boolean {
    return Auth.isAuthed || false
  }

  static validate (key: string): Promise<boolean> {
    return Auth.inst.validate(key)
  }

  static registerListner (id: string, cb: AuthListner) {
    Auth.inst.authStateListners[id] = cb
  }

  private notifyListners () {
    for (const key in this.authStateListners) {
      const listner = this.authStateListners[key]
      try {
        listner(this.isAuthed)
      } catch (e) {
        console.log('Removing listner: ', key)
        delete this.authStateListners[key]
      }
    }
  }

  private async validate (key: string): Promise<boolean> {
    this.key = ''
    this.isAuthed = false
    const response = await apiRequest('/api/validate', 'GET', 'text', undefined, key)
    if (response.status === 200) {
      this.key = key
      this.isAuthed = true
    }

    this.notifyListners()
    return this.isAuthed
  }

  private constructor () { }
}