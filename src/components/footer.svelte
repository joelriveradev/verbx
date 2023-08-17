<script lang='ts'>
  export const year = new Date().getFullYear()
  const handleClick = () => window.scrollTo(0,0)
</script>

<footer class='flex items-center justify-between h-28 px-10 border-t border-t-gray-100'>
  <p class='font-light text-xs text-gray-700'>© Copyright {year} Verbx.</p>

  <button class='flex items-center font-light text-xs text-gray-700'on:click={handleClick} aria-label='Jump to top'>
    Scroll to top <img class='ml-1 h-3' src='/arrow-up-xs.svg' aria-hidden alt='' />
  </button>
</footer>