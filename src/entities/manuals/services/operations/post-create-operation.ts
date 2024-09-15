export const postCreateOperation = async (name: string) => {
  const URL = import.meta.env.VITE_PUBLIC_API_URL

  const response = await fetch(URL + '/v1/operations', {
    method: 'POST',
    body: name,
    headers: {
      'Content-type': 'applicataion/json',
    },
  })

  const json = await response.json()

  console.log(json)

  return response
}
