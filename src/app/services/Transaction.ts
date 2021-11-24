export interface TransactionType {
  id: number
  description: string
  amount: number
}

export interface InitialStateType {
  transactions: TransactionType[]
}
