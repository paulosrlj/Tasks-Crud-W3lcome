export type Task = {
  id: number
  titulo: string
  concluida: boolean
}

export type TaskUpdate = {
  titulo?: string
  concluida?: boolean
}
