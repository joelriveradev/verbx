<script lang='ts'>
  import type { Section } from '../types/typegen/graphql'
  export let open = false
  export let activeModule: string

  $: expanded = open
  const toggleActive = () => expanded = !expanded

  export let padding = false
  export let section: Section
  export let handleModuleClick: (id: string) => void

  const { title } = section
</script>

<div class='course-section'>
  <div
    class='flex items-center justify-between border-b border-b-gray-100 py-5 pr-10 cursor-pointer hover:bg-gray-50'
    class:pl-10={padding}
    on:click={toggleActive}
    on:keypress={toggleActive}
    role='button'
    tabindex="-1">

    <span class='font-light'>{title}</span>

    <img
      class={expanded ? 'w-4 rotate-180 transition-transform' : 'w-4 transition-transform'}
      src='/carrot-down-xs.svg'
      alt=''
      aria-hidden
    />
  </div>

  {#if expanded}
    <div class='pt-5 pr-10' class:pl-10={padding}>
      {#each section.modules as { id, title } }
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class='flex items-center mb-5 cursor-pointer' on:click={() => handleModuleClick(id)}>
          <div class='w-3 h-3 rounded-full mr-3 border border-gray-400' />

          <p class={activeModule === id ? 'font-medium text-black text-sm' : 'font-light text-gray-500 text-sm'}>
            {title}
          </p>
        </div>
      {/each}
    </div>
  {/if}
</div>