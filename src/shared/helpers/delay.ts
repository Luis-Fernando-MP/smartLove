export const delay = async (time: number) =>
  await new Promise(resolve =>
    setTimeout(() => {
      return resolve(true)
    }, 0)
  )
