export type Task = {
  id: number
  titulo: string
  concluida: boolean
}

export type TaskCreation = {
  titulo: string
}

export type TaskUpdate = {
  titulo?: string
  concluida?: boolean
}
