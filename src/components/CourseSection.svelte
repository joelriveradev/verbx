<script lang='ts'>
  import type { Section } from '../types/typegen/graphql'
  export let open = false
  export let activeModule: string
  export let complete: boolean = false

  $: expanded = open
  const toggleActive = () => expanded = !expanded

  export let padding = false
  export let section: Section
  export let showComplete = false
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
      {#each section.modules_v2 as { id, title }, index }
        {@const active = activeModule === id }
        {@const activeIndex = section.modules_v2.findIndex(m => m.id === activeModule)}
        {@const completed = index < activeIndex}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class='flex items-center mb-5 cursor-pointer' on:click={() => handleModuleClick(id)}>
          {#if showComplete && completed || showComplete && complete}
            <img class='w-2.5 mr-3' src='/check-xs.svg' alt='' />
            {:else if !completed && !active}
              <img class='w-2.5 mr-3 opacity-30' src='/lock.svg' alt='' />
            {:else}
              <div class='w-3 h-3 rounded-full mr-3 border border-gray-400' />
          {/if}

          <p
            class={active || complete ? 'text-black text-sm font-light' : 'font-light text-gray-500 text-sm'}
            class:font-medium={active && !complete}
          >
            {title}
          </p>
        </div>
      {/each}
    </div>
  {/if}
</div>