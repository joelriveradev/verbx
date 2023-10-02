<script lang='ts'>
  import { signOut, signIn } from '@auth/sveltekit/client'
  export let authenticated: boolean = false
</script>

<header class='flex items-center justify-between h-16 px-10 border-b border-b-gray-100'>
  <a href='/'>
    <span class='font-bold'>Verbx</span>
  </a>

  <ul class='flex text-gray-800 text-sm font-light'>
    <li>About</li>
    <li class='mx-4'>Give</li>
    <li><a href='/'>Home</a></li>
  </ul>

  <button
    class='text-gray-800 text-sm font-light'
    on:click={() => authenticated ? signOut() : signIn()}>
    {#if authenticated}
      Sign Out
      {:else}
      Sign In
    {/if}
  </button>
</header>