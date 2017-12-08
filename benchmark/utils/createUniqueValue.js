const keywords = [
  'solid',
  'inherit',
  'flex-end',
  'flex-start',
  'align',
  'left',
  'opacity',
]

export default function createUniqueValue() {
  const randomIndex = Math.round(Math.random() * 100)

  const values = [
    keywords[randomIndex % 7],
    `${randomIndex * 10}px`,
    `rgba(${randomIndex * 2}, ${randomIndex * 4}, ${randomIndex *
      5}, 0.${randomIndex})`,
  ]

  return values.join(' ')
}
