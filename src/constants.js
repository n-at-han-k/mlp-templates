export const NEGATABLE = '!'
export const SANITIZABLE = '%'
export const ITERABLE = '@'
export const BLANK = ""

// This matches 7 things:
//   1. Whole tag (modifier + name)
//   2. Modifier (@ or !)
//   3. Name
//   4. Entire content
//   5. True content
//   6. False block
//   7. False content
export const blockRegex = (() => {
  let openingTag  = /\{\{(([@!]?)(.+?))\}\}/
  let content = /(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)/
  let closingTag  = /\{\{\/\1\}\}/
  let flags = 'g'

  // This concatenation technique is documented on StackOverflow:
  // https://stackoverflow.com/questions/185510/how-can-i-concatenate-regex-literals-in-javascript
  return new RegExp(
    openingTag.source +
    content.source +
    closingTag.source,
    flags
  )
})()

// This matches 2 things:
//   1. Modifier (= or %)
//   2. Name
export const valueRegex = /\{\{([=%])(.+?)\}\}/g;
