// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

console.log('This prints to the console of the page (injected only if the page url matched)')

const wipeOut = () => {
  const ticks = document.querySelectorAll('svg[aria-label="Verified account"]')
  ticks.forEach((tick) => {
    tick.remove()
  })
}

wipeOut()

// create  mutation observer that watches for elements with aria-label = "Verified account" and remove them
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    const nodes = mutation.addedNodes
    for (const node of nodes) {
        const verified = node.querySelector('svg[aria-label="Verified account"]')
        if (verified) {
          verified.remove()
        }
    }
  })
})

// start observing the body of the page
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true

})
