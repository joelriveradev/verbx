<script lang='ts'>
  import { signIn } from '@auth/sveltekit/client'
  export let data
  $: loading = ''

  const handleProviderClick = (id: string, callbackUrl: string) => {
    signIn(id, { callbackUrl })
    loading = id
  }
</script>

<main class='flex items-start pt-24 min-h-screen'>
  {#if !data.session}
    <div class='max-w-2xl mx-auto flex flex-col border border-slate-200 rounded-xl p-10 pb-16'>
      <h1 class='font-bold text-center mb-1.5 text-xl'>Verbx</h1>

      <p class='text-slate-700 text-sm mb-8 text-center font-light'>
        Sign in to your Verbx account.
      </p>

      {#each data.providers as { id, label, callbackUrl } (id) }
        <button
          class='flex items-center justify-left border border-slate-200 p-2 px-10 rounded-md hover:bg-gray-50 hover:border-black mb-3 text-capitalize w-[290px]'
          on:click={() => handleProviderClick(id, callbackUrl)}>

          {#if loading && loading === id }
            <img class='w-4 mr-4 animate-spin' src='/spinner.svg' alt='Spinner icon rotating in place' />
            Authorizing with { label }
            {:else}
            <img class='w-4 mr-4' src='/{id}.svg' alt='The {label} logo' />
            Continue with { label }
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</main>