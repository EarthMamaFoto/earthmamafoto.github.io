document.addEventListener("DOMContentLoaded", () => {
  // Reveal animations on scroll
  const revealElements = document.querySelectorAll("[data-reveal]")

  const revealOnScroll = () => {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementBottom = element.getBoundingClientRect().bottom
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
        const delay = element.getAttribute("data-reveal-delay") || 0
        setTimeout(() => {
          element.classList.add("revealed")
        }, delay * 1000)
      }
    })
  }

  // Parallax effect
  const parallaxElements = document.querySelectorAll("[data-parallax]")

  const handleParallax = () => {
    parallaxElements.forEach((element) => {
      const scrollPosition = window.scrollY
      const speed = Number.parseFloat(element.getAttribute("data-parallax")) || 0.1

      element.style.transform = `translateY(${scrollPosition * speed}px)`
    })
  }

  // Initial check
  revealOnScroll()
  handleParallax()

  // Add event listeners
  window.addEventListener("scroll", revealOnScroll)
  window.addEventListener("scroll", handleParallax)
  window.addEventListener("resize", revealOnScroll)
})
