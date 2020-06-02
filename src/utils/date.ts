/**
 * Converts unix timestamp into a time ago string like 2 hours ago
 *
 * @param {string} date unix timestamp
 */
export const timeAgo = (unixTimestamp: string) => {
  const date = +new Date(parseInt(unixTimestamp))

  const seconds = ~~((+new Date() - date) / 1000)
  let interval = ~~(seconds / 31536000)

  if (interval >= 1) return interval + ' years'

  interval = ~~(seconds / 2592000)
  if (interval >= 1) return interval + ' months'

  interval = ~~(seconds / 86400)
  if (interval >= 1) return interval + ' days'

  interval = ~~(seconds / 3600)
  if (interval >= 1) return interval + ' hours'

  interval = ~~(seconds / 60)
  if (interval >= 1) return interval + ' mins'

  return ~~seconds + ' seconds'
}

/**
 * Converts unix timestamp to current date
 *
 * @param {string} date unix timestamp
 */
export const currentDate = (unixTimestamp) => {
  const date = new Date(parseInt(unixTimestamp))
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const month = months[date.getMonth() + 1]
  const day = date.getDay()
  const year = date.getFullYear()
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  return `${month} ${day}, ${year} ${time}`
}
