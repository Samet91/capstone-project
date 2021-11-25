const idGenerator = (): number => {
  return Math.round(Math.random() * 1000000)
}

export { idGenerator }
