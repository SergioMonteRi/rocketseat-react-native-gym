export type ExerciseDTO = {
  id: number
  demo: string
  group: string
  name: string
  thumb: string
  series: number
  created_at: string
  updated_at: string
  repetitions: number
}

export type ExerciseHistoryItemDTO = {
  id: number
  hour: string
  name: string
  group: string
  user_id: number
  created_at: string
  exercise_id: number
}

export type ExerciseHistoryDTO = {
  data: ExerciseHistoryItemDTO[]
  title: string
}
