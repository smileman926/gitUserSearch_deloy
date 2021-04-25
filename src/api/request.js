const request = async ({ searchTerm, perPage, page, sort }) => {
  let res = await fetch(
    `https://api.github.com/search/users?q=${searchTerm}&per_page=${perPage}&page=${page}&sort=${sort} in:login`,
  )
  const statusCode = res.status
  if (statusCode === 200) {
    res = await res.json()
    return res
  } else {
    res = await res.json()
    const error = new Error(res.message)
    error.code = statusCode
    throw error
  }
}

export default request
