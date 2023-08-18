<script lang='ts'>
  import type { Section } from '../types/typegen/graphql'

  $: active = false
  const toggleActive = () => active = !active

  export let section: Section
  const { title, modules } = section
</script>

<div class='course-section'>
  <div
    class='flex items-center justify-between border-b border-b-gray-200 pb-5 cursor-pointer'
    on:click={toggleActive}
    on:keypress={toggleActive}
    role='button'
    tabindex="-1">

    <span class='font-light'>{title}</span>

    <img
      class={active ? 'w-4 rotate-180 transition-transform' : 'w-4 transition-transform'}
      src='/carrot-down-xs.svg'
      alt=''
      aria-hidden
    />
  </div>

  {#if active}
    <div class='pt-5'>
      {#each modules as module}
        <p class='mb-5 font-light text-gray-500 text-sm'>
          {module.title}
        </p>
      {/each}
    </div>
  {/if}
</div>