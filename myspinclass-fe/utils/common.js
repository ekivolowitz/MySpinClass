export const mapZoneToSpeed = (zone) => {
  let speed = 0
  switch (zone) {
    case "BASE": {
      speed = 12.5
      break
    }
    case "PUSH": {
      speed = 13
      break
    }
    case "SPRINT": {
      speed = 13.5
      break
    }
  }
  return speed
}

export const formatSeconds = seconds => (
  `${Math.floor(seconds / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${(seconds % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`
)